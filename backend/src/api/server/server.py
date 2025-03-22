from flask import Flask
from flask_cors import CORS
from src.application.handlers.error_handler import register_error_handlers

from src.api.routes.user_routes import user_route_bp
from src.api.routes.login_routes import login_route_bp
from src.api.routes.category_routes import category_route_bp
from src.api.routes.brand_routes import brand_route_bp
from src.api.routes.product_routes import product_route_bp
from src.api.routes.stock_movement_routes import stock_movement_route_bp
from src.api.routes.current_stock_routes import current_stock_route_bp

from src.model.configs.env import load_db_env, load_frontend_origin

app = Flask(__name__)

front_end = load_frontend_origin()
CORS(app=app, origins=[front_end])

#Database
app.config['SQL_ALCHEMY_DATABASE_URI'] = load_db_env()

#Rotas
app.register_blueprint(user_route_bp)
app.register_blueprint(login_route_bp)
app.register_blueprint(category_route_bp)
app.register_blueprint(brand_route_bp)
app.register_blueprint(product_route_bp)
app.register_blueprint(stock_movement_route_bp)
app.register_blueprint(current_stock_route_bp)

#Handlers de erro
register_error_handlers(app)
