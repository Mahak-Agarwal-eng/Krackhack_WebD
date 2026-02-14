from app.core.supabase import get_supabase_client
from app.core.config import settings

def test_connection():
    print("=" * 50)
    print("Testing Supabase Connection")
    print("=" * 50)
    
    # Test 1: Print config
    print(f"\n1. Supabase URL: {settings.SUPABASE_URL}")
    print(f"2. Service Role Key exists: {bool(settings.SUPABASE_SERVICE_ROLE_KEY)}")
    print(f"3. Anon Key exists: {bool(settings.SUPABASE_ANON_KEY)}")
    
    # Test 2: Get client
    try:
        supabase = get_supabase_client()
        print("\n✅ Supabase client created successfully")
    except Exception as e:
        print(f"\n❌ Failed to create Supabase client: {e}")
        return
    
    # Test 3: Check profiles table
    try:
        response = supabase.table("profiles").select("*").limit(5).execute()
        print(f"\n✅ Profiles table accessible")
        print(f"   Found {len(response.data)} profiles")
        if response.data:
            print(f"   Sample profile: {response.data[0].get('email')}")
    except Exception as e:
        print(f"\n❌ Cannot access profiles table: {e}")
    
    # Test 4: Check auth users
    try:
        # Note: This requires service_role key
        response = supabase.auth.admin.list_users()
        print(f"\n✅ Auth users accessible")
        print(f"   Found {len(response)} users")
        if response:
            print(f"   Sample user: {response[0].email}")
    except Exception as e:
        print(f"\n❌ Cannot access auth users: {e}")

if __name__ == "__main__":
    test_connection()