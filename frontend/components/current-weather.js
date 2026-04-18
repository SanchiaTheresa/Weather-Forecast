// Current Weather Component
function renderCurrentWeather(data) {
    if (!data || !data.current) {
        return;
    }

    const current = data.current;
    const weatherIcon = `https://openweathermap.org/img/wn/${current.icon}@4x.png`;

    const currentWeatherHTML = `
        <section class="current-weather">
            <div class="weather-main">
                <div class="weather-icon-section">
                    <img src="${weatherIcon}" alt="${current.description}" class="weather-icon-large">
                    <h2 class="city-name">${current.city}</h2>
                </div>

                <div class="weather-info-section">
                    <div class="temperature-display">
                        <span class="temperature">${Math.round(current.temp)}°C</span>
                        <span class="description">${current.description}</span>
                        <span class="feels-like">Feels like ${Math.round(current.feels_like)}°C</span>
                    </div>
                </div>
            </div>

            <div class="weather-details">
                <div class="detail-card">
                    <div class="detail-icon">
                        <i class="fas fa-droplets"></i>
                    </div>
                    <div class="detail-info">
                        <span class="detail-label">Humidity</span>
                        <span class="detail-value">${current.humidity}%</span>
                    </div>
                </div>

                <div class="detail-card">
                    <div class="detail-icon">
                        <i class="fas fa-wind"></i>
                    </div>
                    <div class="detail-info">
                        <span class="detail-label">Wind Speed</span>
                        <span class="detail-value">${current.wind_speed} m/s</span>
                    </div>
                </div>

                <div class="detail-card">
                    <div class="detail-icon">
                        <i class="fas fa-gauge"></i>
                    </div>
                    <div class="detail-info">
                        <span class="detail-label">Pressure</span>
                        <span class="detail-value">${current.pressure} mb</span>
                    </div>
                </div>

                <div class="detail-card">
                    <div class="detail-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="detail-info">
                        <span class="detail-label">Visibility</span>
                        <span class="detail-value">${(current.visibility / 1000).toFixed(1)} km</span>
                    </div>
                </div>
            </div>
        </section>
    `;

    const element = document.getElementById('currentWeather');
    if (element) {
        element.innerHTML = currentWeatherHTML;
    }
}
