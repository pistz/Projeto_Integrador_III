import os
from flask import Flask
from src.application.handlers.error_handler import register_error_handlers
from src.application.routes.user_routes import user_route_bp
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')

load_dotenv(dotenv_path)

app = Flask(__name__)

#Database
app.config['SQL_ALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

#Rotas
app.register_blueprint(user_route_bp)

#Handlers de erro
register_error_handlers(app)
