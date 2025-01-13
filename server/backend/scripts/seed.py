from backend.main import app, db
from backend.models import User, Product, ProductVariant
from werkzeug.security import generate_password_hash

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Create admin user
        admin = User(
            email='admin@example.com',
            password=generate_password_hash('admin123'),
            name='Admin User',
            role='admin'
        )
        db.session.add(admin)

        # Create test user
        user = User(
            email='test@example.com',
            password=generate_password_hash('password'),
            name='Test User',
            role='customer'
        )
        db.session.add(user)

        # Create sample products
        products = [
            {
                'name': 'Carina Hoops',
                'description': 'Elegant gold hoop earrings',
                'price': 40.00,
                'stock': 100,
                'category': 'Earrings',
                'image_url': '/images/carina-hoops.jpg',
                'variants': [
                    {'size': 'Small', 'material': 'Gold', 'price_modifier': 0, 'stock': 50},
                    {'size': 'Medium', 'material': 'Gold', 'price_modifier': 10, 'stock': 30},
                    {'size': 'Large', 'material': 'Gold', 'price_modifier': 20, 'stock': 20}
                ]
            }
        ]

        for product_data in products:
            variants = product_data.pop('variants')
            product = Product(**product_data)
            db.session.add(product)
            db.session.flush()

            for variant_data in variants:
                variant = ProductVariant(product_id=product.id, **variant_data)
                db.session.add(variant)

        db.session.commit()

if __name__ == '__main__':
    seed_database() 