from flask import Blueprint, request, jsonify
import requests
from datetime import datetime
from config import Config

weather_bp = Blueprint('weather', __name__, url_prefix='/api')

def get_weather_data(lat, lon):
    """
    Fetch weather data from OpenWeatherMap API
    Returns current weather and 4-day forecast
    """
    try:
        # Using free tier endpoint (current weather + forecast)
        url = f"{Config.WEATHER_API_URL}/forecast"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': Config.WEATHER_API_KEY,
            'units': 'metric'
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

def get_current_weather(lat, lon):
    """Fetch current weather data"""
    try:
        url = f"{Config.WEATHER_API_URL}/weather"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': Config.WEATHER_API_KEY,
            'units': 'metric'
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

def process_forecast_data(forecast_data):
    """Process forecast data into daily weather"""
    if 'error' in forecast_data:
        return None

    forecasts = forecast_data.get('list', [])
    daily_forecasts = {}

    for item in forecasts:
        date = datetime.fromtimestamp(item['dt']).strftime('%Y-%m-%d')

        if date not in daily_forecasts:
            daily_forecasts[date] = {
                'date': date,
                'day': datetime.fromtimestamp(item['dt']).strftime('%A'),
                'temp_max': item['main']['temp_max'],
                'temp_min': item['main']['temp_min'],
                'description': item['weather'][0]['main'],
                'icon': item['weather'][0]['icon'],
                'humidity': item['main']['humidity'],
                'wind_speed': item['wind']['speed'],
                'pressure': item['main']['pressure']
            }
        else:
            # Keep max and min for the day
            daily_forecasts[date]['temp_max'] = max(daily_forecasts[date]['temp_max'], item['main']['temp_max'])
            daily_forecasts[date]['temp_min'] = min(daily_forecasts[date]['temp_min'], item['main']['temp_min'])

    return list(daily_forecasts.values())[:4]

@weather_bp.route('/weather', methods=['GET'])
def get_weather():
    """Get weather for given coordinates"""
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({'error': 'Latitude and Longitude required'}), 400

    try:
        lat, lon = float(lat), float(lon)
    except ValueError:
        return jsonify({'error': 'Invalid latitude or longitude'}), 400

    current = get_current_weather(lat, lon)
    forecast = get_weather_data(lat, lon)

    if 'error' in current or 'error' in forecast:
        return jsonify({'error': 'Unable to fetch weather data'}), 500

    processed_forecast = process_forecast_data(forecast)

    return jsonify({
        'current': {
            'city': current.get('name'),
            'temp': current['main']['temp'],
            'feels_like': current['main']['feels_like'],
            'description': current['weather'][0]['main'],
            'icon': current['weather'][0]['icon'],
            'humidity': current['main']['humidity'],
            'wind_speed': current['wind']['speed'],
            'pressure': current['main']['pressure'],
            'visibility': current.get('visibility', 'N/A')
        },
        'forecast': processed_forecast
    })

@weather_bp.route('/search', methods=['GET'])
def search_city():
    """Search for city coordinates"""
    city = request.args.get('city')

    if not city:
        return jsonify({'error': 'City name required'}), 400

    try:
        url = f"{Config.WEATHER_API_URL}/weather"
        params = {
            'q': city,
            'appid': Config.WEATHER_API_KEY,
            'units': 'metric'
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        return jsonify({
            'city': data['name'],
            'country': data['sys']['country'],
            'lat': data['coord']['lat'],
            'lon': data['coord']['lon']
        })

    except requests.exceptions.RequestException:
        return jsonify({'error': 'City not found'}), 404
