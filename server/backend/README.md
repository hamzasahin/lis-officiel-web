# LIS Officiel Backend

A Flask-based backend server for the LIS Officiel e-commerce platform.

## Tech Stack

- Python 3.8+
- Flask 3.0+
- SQLAlchemy (ORM)
- SQLite (Database)
- JWT (Authentication)
- Flask-CORS (Cross-Origin Resource Sharing)
- Flask-Limiter (Rate Limiting)
- Flask-Talisman (Security Headers)

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- virtualenv (recommended)

### Installation

1. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install flask flask-sqlalchemy flask-cors python-dotenv flask-limiter flask-talisman flask-migrate PyJWT flask-swagger-ui
```

3. Set up environment variables by creating a `.env` file:
```env
FLASK_APP=main.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URI=sqlite:///app.db
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

4. Initialize the database:
```bash
flask db init
flask db migrate
flask db upgrade
```

### Running the Server

```bash
flask run
```

The server will start at `http://127.0.0.1:5000`.

## API Documentation

### Authentication Endpoints

#### Register a New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
}
```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Protected Routes
All protected routes require a JWT token in the Authorization header:
```bash
Authorization: <token>
```

### Products Endpoints

#### List Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number
  - `per_page` (optional): Items per page
  - `category` (optional): Filter by category

#### Get Product Details
- **URL**: `/api/products/<id>`
- **Method**: `GET`

### Orders Endpoints

#### Create Order
- **URL**: `/api/orders`
- **Method**: `POST`
- **Auth**: Required
- **Body**:
```json
{
    "items": [
        {
            "product_id": 1,
            "variant_id": 1,
            "quantity": 2
        }
    ]
}
```

#### List User Orders
- **URL**: `/api/orders`
- **Method**: `GET`
- **Auth**: Required

## Project Structure

```
backend/
├── __init__.py
├── main.py              # Application entry point
├── models/             
│   ├── __init__.py
│   └── models.py        # Database models
├── routes/
│   ├── __init__.py
│   ├── auth.py         # Authentication routes
│   ├── products.py     # Product routes
│   ├── orders.py       # Order routes
│   └── ...
├── utils/              # Utility functions
└── tests/              # Test files
```

## Security Features

- JWT-based authentication
- Password hashing using Werkzeug
- Rate limiting with Flask-Limiter
- Security headers with Flask-Talisman
- CORS protection
- SQL injection protection through SQLAlchemy
- Input validation and sanitization

## Common Issues and Solutions

### Multiple SQLAlchemy Instances
If you encounter the error "The current Flask app is not registered with this SQLAlchemy instance", ensure:
1. You're importing the `db` instance from `main.py`
2. Not creating new SQLAlchemy instances in models
3. Using the correct application context

### Database Migrations
If you make changes to models:
1. Create a new migration:
```bash
flask db migrate -m "Description of changes"
```
2. Apply the migration:
```bash
flask db upgrade
```

## Development Guidelines

1. Always use virtual environment
2. Keep routes modular and organized
3. Write docstrings for functions
4. Follow PEP 8 style guide
5. Add appropriate error handling
6. Use environment variables for configuration

## Testing

Run tests using:
```bash
python -m pytest
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request 