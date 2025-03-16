from flask import Flask
from src.application.handlers.error_handler import register_error_handlers

from src.api.routes.user_routes import user_route_bp
from src.api.routes.login_routes import login_route_bp
from src.api.routes.category_routes import category_route_bp
from src.api.routes.brand_routes import brand_route_bp
from src.api.routes.product_routes import product_route_bp

from src.model.configs.env import load_db_env

app = Flask(__name__)

#Database
app.config['SQL_ALCHEMY_DATABASE_URI'] = load_db_env()

#Rotas
app.register_blueprint(user_route_bp)
app.register_blueprint(login_route_bp)
app.register_blueprint(category_route_bp)
app.register_blueprint(brand_route_bp)
app.register_blueprint(product_route_bp)

#Handlers de erro
register_error_handlers(app)
