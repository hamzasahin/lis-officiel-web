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

# Security Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///jewelry_store.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['RATE_LIMIT'] = "200 per day;50 per hour"
app.config['TRUSTED_PROXIES'] = ['127.0.0.1']

# Initialize extensions
db = SQLAlchemy(app)
#limiter = Limiter(app=app, key_func=get_remote_address)
# talisman = Talisman(app)  # Temporarily disabled for debugging
migrate = Migrate(app, db)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Import models and routes
from backend.models import (
    User,
    Product,
    ProductVariant,
    Order,
    OrderItem,
    WishlistItem
)

# Register blueprints
from backend.routes import (
    auth_routes,
    product_routes,
    order_routes,
    payment_routes,
    search_routes,
    admin_routes,
    docs_routes
)

app.register_blueprint(auth_routes, url_prefix='/api')
app.register_blueprint(product_routes, url_prefix='/api')
app.register_blueprint(order_routes, url_prefix='/api')
app.register_blueprint(payment_routes, url_prefix='/api')
app.register_blueprint(search_routes, url_prefix='/api')
app.register_blueprint(admin_routes, url_prefix='/api/admin')
app.register_blueprint(docs_routes)

# In-memory data storage for testing
users = [
    {
        'id': 1,
        'email': 'admin@example.com',
        'password': generate_password_hash('admin123'),
        'name': 'Admin User',
        'role': 'admin'
    },
    {
        'id': 2,
        'email': 'user@example.com',
        'password': generate_password_hash('user123'),
        'name': 'Test User',
        'role': 'customer'
    }
]

products = [
    {
        'id': 1,
        'name': 'Gold Ring',
        'description': 'Elegant gold ring',
        'price': 199.99,
        'image_url': '/images/gold-ring.jpg',
        'category': 'rings',
        'stock': 10
    },
    {
        'id': 2,
        'name': 'Silver Necklace',
        'description': 'Beautiful silver necklace',
        'price': 149.99,
        'image_url': '/images/silver-necklace.jpg',
        'category': 'necklaces',
        'stock': 5
    }
]

# Test routes
@app.route('/api/test/products', methods=['GET'])
def test_get_products():
    return jsonify(products)

@app.route('/api/test/login', methods=['POST'])
def test_login():
    logger.debug("\n=== Request Headers ===")
    for header, value in request.headers.items():
        logger.debug(f"{header}: {value}")
    
    logger.debug("\n=== Request Body ===")
    data = request.get_json()
    logger.debug(data)
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    user = next((u for u in users if u['email'] == data.get('email')), None)
    
    if not user:
        logger.debug("User not found")
        return jsonify({'error': 'User not found'}), 404
        
    if not check_password_hash(user['password'], data.get('password', '')):
        logger.debug("Invalid password")
        return jsonify({'error': 'Invalid password'}), 401
        
    token = jwt.encode({
        'user_id': user['id'],
        'role': user['role'],
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, app.config['SECRET_KEY'])
    
    logger.debug("Login successful")
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        }
    })

print(f"\n=== App Config ===\nSECRET_KEY: {app.config.get('SECRET_KEY')}")

if __name__ == '__main__':
    app.run(debug=True) 