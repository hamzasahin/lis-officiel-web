from flask import Blueprint, request, jsonify
from backend.main import db
from backend.models import Product

search_routes = Blueprint('search', __name__)

@search_routes.route('/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')
    category = request.args.get('category')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')

    products = Product.query
    if query:
        products = products.filter(Product.name.ilike(f'%{query}%'))
    if category:
        products = products.filter_by(category=category)
    if min_price:
        products = products.filter(Product.price >= float(min_price))
    if max_price:
        products = products.filter(Product.price <= float(max_price))

    results = products.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'price': p.price,
        'category': p.category,
        'image_url': p.image_url
    } for p in results]) 