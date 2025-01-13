from flask import Blueprint, jsonify, request
from backend.main import db
from backend.models import User, Product, Order

admin_routes = Blueprint('admin', __name__)

@admin_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@admin_routes.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@admin_routes.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders]) 