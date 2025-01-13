from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Supabase URL and key from environment
database_url = os.getenv('DATABASE_URI')
supabase_url = "https://awmzovcsanxnggobccmd.supabase.co"
supabase_key = os.getenv('SUPABASE_KEY', 'your-supabase-key')

try:
    # Initialize Supabase client
    supabase = create_client(supabase_url, supabase_key)
    
    # Test a simple query
    response = supabase.table('users').select("*").execute()
    print("Supabase connection successful!")
    print("Response:", response)

except Exception as e:
    print("Error connecting to Supabase:")
    print(e) 