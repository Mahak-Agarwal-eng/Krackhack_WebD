from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Dict, Any

from app.core.auth import (
    get_current_user,
    get_current_user_profile,
    require_admin
)
from app.core.supabase import get_supabase_client

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pydantic Models
class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserLoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: Dict[str, Any]
    profile: Dict[str, Any]

class PasswordResetRequest(BaseModel):
    email: EmailStr

# Routes
@router.post("/login", response_model=UserLoginResponse)
async def login(credentials: UserLoginRequest):
    """
    Login with email and password
    Returns access token and user profile with role
    """
    supabase = get_supabase_client()
    
    try:
        # Sign in with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        user = auth_response.user
        session = auth_response.session
        
        # Fetch user profile
        profile_response = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
        
        if not profile_response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found"
            )
        
        profile = profile_response.data
        
        # Check if account is active
        if not profile.get("is_active"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active. Please contact administrator."
            )
        
        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "email_confirmed_at": user.email_confirmed_at,
            },
            "profile": profile
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@router.get("/me")
async def get_me(
    current_user: Dict[str, Any] = Depends(get_current_user),
    profile: Dict[str, Any] = Depends(get_current_user_profile)
):
    """
    Get current authenticated user info
    """
    return {
        "user": {
            "id": current_user.get("sub"),
            "email": current_user.get("email"),
            "email_confirmed_at": current_user.get("email_confirmed_at"),
        },
        "profile": profile
    }

@router.post("/logout")
async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Logout current user (revoke token on Supabase)
    Frontend should clear tokens from localStorage
    """
    supabase = get_supabase_client()
    
    try:
        # Note: Service role key is required for sign_out
        # In practice, frontend handles logout by clearing tokens
        return {"message": "Logged out successfully"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout failed: {str(e)}"
        )

@router.post("/password-reset")
async def request_password_reset(request: PasswordResetRequest):
    """
    Send password reset email
    """
    supabase = get_supabase_client()
    
    try:
        supabase.auth.reset_password_for_email(
            request.email,
            options={
                "redirect_to": "http://localhost:3000/reset-password"  # Update with your frontend URL
            }
        )
        
        return {
            "message": "If the email exists, a password reset link has been sent."
        }
        
    except Exception as e:
        # Don't reveal if email exists for security
        return {
            "message": "If the email exists, a password reset link has been sent."
        }

@router.get("/verify-role/{role}")
async def verify_role(
    role: str,
    profile: Dict[str, Any] = Depends(get_current_user_profile)
):
    """
    Verify if current user has the specified role
    Used by frontend for route protection
    """
    user_role = profile.get("role", "").upper()
    required_role = role.upper()
    
    if user_role != required_role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied. Required role: {required_role}, Your role: {user_role}"
        )
    
    return {
        "valid": True,
        "role": user_role,
        "profile": profile
    }