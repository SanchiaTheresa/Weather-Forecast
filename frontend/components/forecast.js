// Forecast Component
function renderForecast(forecastData) {
    if (!forecastData || forecastData.length === 0) {
        return;
    }

    const forecastHTML = `
        <section class="forecast-section">
            <h3 class="forecast-title">4-Day Forecast</h3>
            <div class="forecast-grid">
                ${forecastData.map((day, index) => {
                    const weatherIcon = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
                    return `
                        <div class="forecast-card ${index === 0 ? 'active' : ''}">
                            <div class="forecast-header">
                                <span class="forecast-day">${day.day}</span>
                                <span class="forecast-date">${new Date(day.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                            </div>

                            <div class="forecast-icon">
                                <img src="${weatherIcon}" alt="${day.description}">
                            </div>

                            <div class="forecast-temp">
                                <span class="temp-max">${Math.round(day.temp_max)}°</span>
                                <span class="temp-min">${Math.round(day.temp_min)}°</span>
                            </div>

                            <p class="forecast-description">${day.description}</p>

                            <div class="forecast-extra">
                                <div class="extra-item">
                                    <i class="fas fa-droplets"></i>
                                    <span>${day.humidity}%</span>
                                </div>
                                <div class="extra-item">
                                    <i class="fas fa-wind"></i>
                                    <span>${day.wind_speed}m/s</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>
    `;

    const element = document.getElementById('forecast');
    if (element) {
        element.innerHTML = forecastHTML;
    }
}
