import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY') or 'demo_key'
    WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
    DEBUG = os.environ.get('FLASK_DEBUG', False)
