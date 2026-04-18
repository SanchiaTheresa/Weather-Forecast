// Header Component
function renderHeader() {
    const headerHTML = `
        <header class="header">
            <div class="header-content">
                <div class="header-title">
                    <i class="fas fa-cloud-sun"></i>
                    <h1>Weather Forecast</h1>
                </div>
                <p class="header-subtitle">Get accurate weather predictions for the next 4 days</p>
            </div>
        </header>
    `;

    const headerElement = document.getElementById('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }
}

// Render on page load
document.addEventListener('DOMContentLoaded', renderHeader);
