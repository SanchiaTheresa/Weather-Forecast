// Footer Component
function renderFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2024 Weather Forecast. Powered by OpenWeatherMap API.</p>
                <div class="footer-links">
                    <a href="#" class="footer-link">About</a>
                    <a href="#" class="footer-link">Privacy</a>
                    <a href="#" class="footer-link">Contact</a>
                </div>
            </div>
        </footer>
    `;

    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
}

// Render on page load
document.addEventListener('DOMContentLoaded', renderFooter);
