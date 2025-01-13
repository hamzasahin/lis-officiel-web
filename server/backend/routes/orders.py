from flask import Blueprint, request, jsonify
from backend.main import db
from backend.models import Order, OrderItem, Product
from backend.routes.auth import token_required

order_routes = Blueprint('orders', __name__)

@order_routes.route('/orders', methods=['POST'])
@token_required
def create_order(current_user):
    data = request.get_json()
    items = data.get('items', [])

    # Validate items and calculate total
    total = 0
    order_items = []
    for item in items:
        product = Product.query.get(item['product_id'])
        if not product:
            return jsonify({'error': f'Product {item["product_id"]} not found'}), 404
        total += product.price * item['quantity']
        order_items.append(OrderItem(
            product_id=item['product_id'],
            quantity=item['quantity'],
            price=product.price
        ))

    # Create order
    order = Order(
        user_id=current_user.id,
        total=total,
        items=order_items
    )
    db.session.add(order)
    db.session.commit()

    return jsonify({
        'message': 'Order created successfully',
        'order_id': order.id
    }), 201 