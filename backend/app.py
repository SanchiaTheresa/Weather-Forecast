from flask import Flask
from flask_cors import CORS
from config import Config

def create_app():
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Register blueprints
    from routes.weather import weather_bp
    app.register_blueprint(weather_bp)

    @app.route('/', methods=['GET'])
    def home():
        return {'message': 'Weather API is running', 'status': 'ok'}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
