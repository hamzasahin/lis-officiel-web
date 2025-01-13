from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.main import db, app
from backend.models import User
import jwt
from datetime import datetime, timedelta
from functools import wraps

auth_routes = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        email=data['email'],
        password=hashed_password,
        name=data.get('name', '')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

# Temporary in-memory user data
TEST_USERS = {
    "admin@example.com": {
        "id": 1,
        "email": "admin@example.com",
        "password": generate_password_hash("admin123"),
        "name": "Admin User",
        "role": "admin"
    },
    "test@example.com": {
        "id": 2,
        "email": "test@example.com",
        "password": generate_password_hash("password"),
        "name": "Test User",
        "role": "customer"
    }
}

@auth_routes.route('/login', methods=['POST'])
def login():
    print("\n=== Request Headers ===")
    for header, value in request.headers.items():
        print(f"{header}: {value}")
    
    print("\n=== Request Body ===")
    print(request.get_json())
    
    print("\n=== App Config ===")
    print(f"SECRET_KEY: {app.config.get('SECRET_KEY')}")
    print(f"CORS Config: {app.extensions.get('cors').resources}")
    
    data = request.get_json()
    if not data:
        print("No data provided")
        return jsonify({'error': 'No data provided'}), 400

    user = TEST_USERS.get(data['email'])
    if not user:
        print(f"User not found: {data['email']}")
        return jsonify({'error': 'User not found'}), 404

    if not check_password_hash(user['password'], data['password']):
        print("Invalid password")
        return jsonify({'error': 'Invalid password'}), 401

    token = jwt.encode({
        'user_id': user['id'],
        'exp': datetime.utcnow() + timedelta(days=1)
    }, app.config['SECRET_KEY'])

    print("Login successful")
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        }
    }), 200 

@auth_routes.route('/login', methods=['OPTIONS'])
def login_options():
    return '', 200 

@auth_routes.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    user = User.query.filter_by(email=data.get('email')).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    if not check_password_hash(user.password, data.get('password', '')):
        return jsonify({'error': 'Invalid password'}), 401
        
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role
        }
    }) 