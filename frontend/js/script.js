// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
let currentLocation = { lat: 40.7128, lon: -74.0060 }; // Default: New York

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(currentLocation.lat, currentLocation.lon);
    attachEventListeners();
});

function attachEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    locationBtn.addEventListener('click', getCurrentLocation);
}

async function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) return;

    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/search?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (!response.ok) {
            showError('City not found. Please try again.');
            hideLoading();
            return;
        }

        currentLocation = { lat: data.lat, lon: data.lon };
        searchInput.value = '';
        await fetchWeather(data.lat, data.lon);
    } catch (error) {
        showError('Error searching for city. Please try again.');
        console.error('Search error:', error);
    }
    hideLoading();
}

async function fetchWeather(lat, lon) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if (!response.ok) {
            showError('Unable to fetch weather data. Please try again.');
            hideLoading();
            return;
        }

        renderCurrentWeather(data);
        renderForecast(data.forecast);
        hideError();
    } catch (error) {
        showError('Error fetching weather data. Please check your connection.');
        console.error('Fetch error:', error);
    }
    hideLoading();
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            currentLocation = { lat: latitude, lon: longitude };
            fetchWeather(latitude, longitude);
        },
        (error) => {
            showError('Unable to get your location. Please try searching for a city.');
            hideLoading();
            console.error('Geolocation error:', error);
        }
    );
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(hideError, 5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}
