from flask import Blueprint, request, jsonify
import stripe
from backend.main import app
from backend.models import Order

payment_routes = Blueprint('payments', __name__)
stripe.api_key = app.config.get('STRIPE_SECRET_KEY')

@payment_routes.route('/payments/create', methods=['POST'])
def create_payment():
    data = request.get_json()
    try:
        intent = stripe.PaymentIntent.create(
            amount=data['amount'],
            currency=data['currency'],
            metadata=data.get('metadata', {})
        )
        return jsonify({'client_secret': intent.client_secret})
    except Exception as e:
        return jsonify({'error': str(e)}), 500 