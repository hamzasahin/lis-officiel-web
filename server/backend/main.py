from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from flask_migrate import Migrate
from dotenv import load_dotenv
import logging
import urllib.parse

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Security headers
Talisman(app, force_https=False)

# Rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Database configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
# Parse and encode special characters in password
db_uri = os.getenv('DATABASE_URI')
if db_uri:
    parsed = urllib.parse.urlparse(db_uri)
    if parsed.password:
        # Encode special characters in password
        encoded_password = urllib.parse.quote(parsed.password)
        # Reconstruct the URL with encoded password
        db_uri = db_uri.replace(parsed.password, encoded_password)
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 5,
    'pool_timeout': 30,
    'pool_recycle': 1800,
}

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models after db initialization
from backend.models import (
    User,
    Product,
    ProductVariant,
    Order,
    OrderItem,
    WishlistItem
)

# Import routes
from backend.routes import (
    auth_routes,
    product_routes,
    admin_routes,
    order_routes,
    search_routes,
    docs_routes,
    payment_routes
)

# Register blueprints
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(admin_routes, url_prefix='/api/admin')
app.register_blueprint(order_routes, url_prefix='/api/orders')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(docs_routes, url_prefix='/api/docs')
app.register_blueprint(payment_routes, url_prefix='/api/payments')

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True) 