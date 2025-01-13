import os
from dotenv import load_dotenv
import psycopg2
from urllib.parse import urlparse

# Load environment variables
load_dotenv()

# Get database URI from environment
database_url = os.getenv('DATABASE_URI')

try:
    # Parse the database URL
    result = urlparse(database_url)
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    port = result.port

    # Try to establish a connection
    conn = psycopg2.connect(
        database=database,
        user=username,
        password=password,
        host=hostname,
        port=port
    )

    print("Database connection successful!")
    print(f"Connected to {hostname} as {username}")
    
    # Test a simple query
    cur = conn.cursor()
    cur.execute('SELECT version();')
    version = cur.fetchone()
    print(f"PostgreSQL version: {version[0]}")

    # Close the connection
    cur.close()
    conn.close()

except Exception as e:
    print("Error connecting to the database:")
    print(e) 