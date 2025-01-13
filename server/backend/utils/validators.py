from flask import jsonify
from backend.main import app

def validate_product_data(data):
    required_fields = ['name', 'price', 'category']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    return None 