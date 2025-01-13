from .auth import auth_routes
from .products import product_routes
from .admin import admin_routes
from .orders import order_routes
from .search import search_routes
from .docs import docs_routes
from .payments import payment_routes

__all__ = [
    'auth_routes',
    'product_routes',
    'admin_routes',
    'order_routes',
    'search_routes',
    'docs_routes',
    'payment_routes'
]
