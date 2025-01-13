from flask import Blueprint
from flask_swagger_ui import get_swaggerui_blueprint
from backend.models import Product

SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "Jewelry Store API"}
)

docs_routes = Blueprint('docs', __name__)
docs_routes.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL) 