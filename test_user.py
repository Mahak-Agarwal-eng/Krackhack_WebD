from app.core.supabase import get_supabase_client

def check_user(email):
    supabase = get_supabase_client()
    
    print("=" * 50)
    print(f"Checking user: {email}")
    print("=" * 50)
    
    # Check in auth.users
    try:
        users = supabase.auth.admin.list_users()
        auth_user = next((u for u in users if u.email == email), None)
        
        if auth_user:
            print(f"\n✅ User exists in auth.users")
            print(f"   ID: {auth_user.id}")
            print(f"   Email: {auth_user.email}")
            print(f"   Email confirmed: {auth_user.email_confirmed_at is not None}")
            print(f"   Created: {auth_user.created_at}")
        else:
            print(f"\n❌ User NOT found in auth.users")
            return
    except Exception as e:
        print(f"\n❌ Error checking auth.users: {e}")
        return
    
    # Check in profiles table
    try:
        response = supabase.table("profiles").select("*").eq("email", email).execute()
        
        if response.data:
            profile = response.data[0]
            print(f"\n✅ Profile exists in profiles table")
            print(f"   ID: {profile.get('id')}")
            print(f"   Name: {profile.get('full_name')}")
            print(f"   Role: {profile.get('role')}")
            print(f"   Active: {profile.get('is_active')}")
            print(f"   Department: {profile.get('department')}")
            
            if not profile.get('is_active'):
                print(f"\n⚠️  WARNING: User is NOT ACTIVE!")
                print(f"   Activate with: UPDATE profiles SET is_active = true WHERE email = '{email}';")
        else:
            print(f"\n❌ Profile NOT found in profiles table")
            print(f"   This means the trigger didn't work!")
    except Exception as e:
        print(f"\n❌ Error checking profiles: {e}")

if __name__ == "__main__":
    email = input("Enter email to check: ")
    check_user(email)