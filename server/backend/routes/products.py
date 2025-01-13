from flask import Blueprint, request, jsonify
from backend.main import db
from backend.models import Product, ProductVariant, Order
from backend.utils.validators import validate_product_data

product_routes = Blueprint('products', __name__)

@product_routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'category': p.category,
        'image_url': p.image_url
    } for p in products])

@product_routes.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'category': product.category,
        'image_url': product.image_url,
        'variants': [{
            'id': v.id,
            'size': v.size,
            'material': v.material,
            'price_modifier': v.price_modifier,
            'stock': v.stock
        } for v in product.variants]
    }) 