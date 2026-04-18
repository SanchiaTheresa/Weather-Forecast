# Weather Forecast Application

A modern, responsive weather application built with Flask (backend) and vanilla JavaScript (frontend) that provides accurate weather predictions for the next 4 days.

## Features

-  **Current Weather Display** - Shows real-time weather data including temperature, humidity, wind speed, and pressure
-  **4-Day Forecast** - Detailed weather predictions for the next 4 days
-  **City Search** - Search for any city worldwide
-  **Geolocation** - Get weather for your current location
-  **Modern UI** - Beautiful, responsive design with glassmorphism effects
-  **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile devices
-  **Component-Based** - Clean, modular code structure

## Project Structure

```
weather/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables (get your API key here)
│   └── routes/
│       └── weather.py     # Weather API routes
│
└── frontend/
    ├── index.html                # Main HTML file
    ├── css/
    │   └── style.css            # Modern styling with glassmorphism
    ├── js/
    │   └── script.js            # Main functionality and API calls
    └── components/
        ├── header.js            # Header component
        ├── current-weather.js   # Current weather display component
        ├── forecast.js         # 4-day forecast component
        └── footer.js           # Footer component
```

## API Endpoints

### GET `/api/weather`
Get weather data for specific coordinates.

**Parameters:**
- `lat` (float) - Latitude
- `lon` (float) - Longitude

**Response:**
```json
{
  "current": {
    "city": "New York",
    "temp": 22.5,
    "feels_like": 21.8,
    "description": "Partly cloudy",
    "humidity": 65,
    "wind_speed": 4.5,
    "pressure": 1013,
    "visibility": 10000,
    "icon": "02d"
  },
  "forecast": [
    {
      "date": "2024-01-15",
      "day": "Monday",
      "temp_max": 25.5,
      "temp_min": 18.2,
      "description": "Sunny",
      "humidity": 60,
      "wind_speed": 3.2,
      "icon": "01d"
    }
  ]
}
```

### GET `/api/search`
Search for a city and get its coordinates.

**Parameters:**
- `city` (string) - City name

**Response:**
```json
{
  "city": "New York",
  "country": "US",
  "lat": 40.7128,
  "lon": -74.0060
}
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Node.js (optional, for running a local server)
- OpenWeatherMap API key (free tier)

### Step 1: Get OpenWeatherMap API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Keep it safe - we'll need it in the next step

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update .env file with your API key
# Edit .env and replace 'your_openweathermap_api_key_here' with your actual API key
```

### Step 3: Run Backend

```bash
# Make sure you're in the backend folder with venv activated
python app.py
```

The backend should run on `http://localhost:5000`

### Step 4: Run Frontend

You can run the frontend in two ways:

**Option A: Using Python's Built-in Server**
```bash
# Navigate to frontend folder
cd frontend

# Run Python HTTP server
python -m http.server 8000
```

**Option B: Using Node.js http-server**
```bash
# Install http-server globally (optional)
npm install -g http-server

# Navigate to frontend folder
cd frontend

# Start server
http-server
```

Then open your browser and go to:
- `http://localhost:8000` (Python server)
- `http://localhost:8080` (http-server)

## Usage

1. **Search for a City:**
   - Type city name in the search box
   - Click the search button or press Enter
   - Weather data will load automatically

2. **Use Current Location:**
   - Click the location icon (📍) button
   - Grant location permission when prompted
   - Your local weather will display

3. **View Weather Details:**
   - Current temperature and conditions
   - Humidity, wind speed, pressure, and visibility
   - 4-day forecast with daily highs and lows

## Component Details

### Header Component (`components/header.js`)
- Displays application title and description
- Creates consistent branding across the page

### Current Weather Component (`components/current-weather.js`)
- Shows current temperature and weather condition
- Displays weather icon from OpenWeatherMap
- Shows detailed metrics: humidity, wind speed, pressure, visibility
- Responsive grid layout

### Forecast Component (`components/forecast.js`)
- Displays 4-day weather forecast
- Shows daily high/low temperatures
- Weather icons and conditions
- Additional info: humidity and wind speed per day
- Responsive grid that adapts to screen size

### Footer Component (`components/footer.js`)
- Attribution to OpenWeatherMap API
- Links to additional resources

## Styling Features

- **Glassmorphism Design** - Modern, frosted glass effect
- **Gradient Background** - Beautiful purple gradient backdrop
- **Animations** - Smooth transitions and hover effects
- **Responsive Grid** - Adapts from 4 columns on desktop to 1 column on mobile
- **Color Scheme** - Professional purple theme with white accents

## Troubleshooting

### "City not found" error
- Check spelling of city name
- Try using city name with country code (e.g., "New York, US")

### Weather data not loading
- Ensure backend is running on `http://localhost:5000`
- Check if CORS is enabled (should be in app.py)
- Verify API key in .env file is valid

### Location not working
- Enable location services on your browser
- Check browser permissions for this website
- Some browsers require HTTPS for geolocation

### Port already in use
- Backend: Change port in `app.py` from 5000 to another port
- Frontend: Change port when starting the server

## Technologies Used

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Requests** - HTTP library for API calls
- **OpenWeatherMap API** - Weather data provider

### Frontend
- **Vanilla JavaScript** - No frameworks needed
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Font Awesome** - Icon library

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Add humidity and UV index alerts
- Weather history and trends
- Multiple saved locations
- Dark/Light theme toggle
- Hourly weather forecast
- Weather alerts and notifications

## License

This project is open source and available for educational and personal use.

## Support

For issues or questions, please check the error messages in your browser console and backend terminal for debugging information.

---

Enjoy your weather forecast application! 🌤️
