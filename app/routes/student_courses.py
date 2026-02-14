# from fastapi import APIRouter, Depends
# from app.core.supabase import supabase
# from app.core.auth import get_current_user

# router = APIRouter(prefix="/student/courses", tags=["Student Courses"])


# # ======================
# # GET ALL COURSES
# # ======================

# @router.get("/")
# def get_courses(user=Depends(get_current_user)):

#     # get enrolments
#     enrolled = supabase.table("enrollments")\
#         .select("course_id")\
#         .eq("student_id", user["id"])\
#         .execute()

#     ids = [e["course_id"] for e in enrolled.data]

#     if not ids:
#         return []

#     courses = supabase.table("courses")\
#         .select("*")\
#         .in_("course_id", ids)\
#         .execute()

#     return courses.data


# # ======================
# # GET COURSE DETAILS
# # ======================

# @router.get("/{course_id}")
# def get_course_details(course_id: str, user=Depends(get_current_user)):

#     attendance = supabase.table("attendance")\
#         .select("*")\
#         .eq("student_id", user["id"])\
#         .eq("course_id", course_id)\
#         .execute()

#     resources = supabase.table("academic_resources")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     events = supabase.table("academic_events")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     return {
#         "attendance": attendance.data,
#         "resources": resources.data,
#         "events": events.data
#     }

# from fastapi import APIRouter, Depends
# from app.services.supabase_client import supabase
# from app.core.auth import get_current_user

# router = APIRouter(prefix="/student/courses", tags=["Student Courses"])


# # ======================
# # GET ALL COURSES
# # ======================

# @router.get("/")
# def get_courses(user=Depends(get_current_user)):

#     # get enrolments
#     enrolled = supabase.table("enrollments")\
#         .select("course_id")\
#         .eq("student_id", user["id"])\
#         .execute()

#     ids = [e["course_id"] for e in enrolled.data]

#     if not ids:
#         return []

#     courses = supabase.table("courses")\
#         .select("*")\
#         .in_("course_id", ids)\
#         .execute()

#     return courses.data
# # @router.get("/")
# # def get_courses():
# # @router.get("/")
# # def get_courses(user=Depends(get_current_user)):

# #     enrolled = supabase.table("enrollments") \
# #         .select("course_id") \
# #         .eq("student_id", user["id"]) \
# #         .execute()

# #     if not enrolled.data:
# #         return []

# #     ids = [e["course_id"] for e in enrolled.data]

# #     courses = supabase.table("courses") \
# #         .select("*") \
# #         .in_("course_id", ids) \
# #         .execute()

# #     return courses.data or []

# # ======================
# # GET COURSE DETAILS
# # ======================

# @router.get("/{course_id}")
# def get_course_details(course_id: str, user=Depends(get_current_user)):

#     attendance = supabase.table("attendance")\
#         .select("*")\
#         .eq("student_id", user["id"])\
#         .eq("course_id", course_id)\
#         .execute()

#     resources = supabase.table("academic_resources")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     events = supabase.table("academic_events")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     return {
#         "attendance": attendance.data,
#         "resources": resources.data,
#         "events": events.data
#     }

# app/routes/student_courses.py
# from fastapi import APIRouter, Depends
# from app.services.supabase_client import supabase
# from app.core.auth import get_current_user

# router = APIRouter(prefix="/student/courses", tags=["Student Courses"])


# # ======================
# # GET ALL COURSES
# # ======================

# @router.get("/")
# def get_courses(user=Depends(get_current_user)):
    
#     enrolled = supabase.table("enrollments")\
#         .select("course_id")\
#         .eq("student_id", user["sub"])\
#         .execute()

#     if not enrolled.data:
#         return []

#     ids = [e["course_id"] for e in enrolled.data]

#     courses = supabase.table("courses")\
#         .select("*")\
#         .in_("course_id", ids)\
#         .execute()

#     return courses.data or []


# # ======================
# # GET COURSE DETAILS
# # ======================

# @router.get("/{course_id}")
# def get_course_details(course_id: str, user=Depends(get_current_user)):
    
#     attendance = supabase.table("attendance")\
#         .select("*")\
#         .eq("student_id", user["sub"])\
#         .eq("course_id", course_id)\
#         .execute()

#     resources = supabase.table("academic_resources")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     events = supabase.table("academic_events")\
#         .select("*")\
#         .eq("course_id", course_id)\
#         .execute()

#     return {
#         "attendance": attendance.data or [],
#         "resources": resources.data or [],
#         "events": events.data or []
#     }

# app/routes/student_courses.py
from fastapi import APIRouter, Depends, HTTPException
from app.services.supabase_client import supabase
from app.core.auth import get_current_user_profile
from typing import Dict, Any

router = APIRouter(
    prefix="/student/courses",
    tags=["Student Courses"],
    redirect_slashes=False 
    )


# ======================
# GET ALL COURSES
# ======================

@router.get("/")
def get_courses(profile: Dict[str, Any] = Depends(get_current_user_profile)):
    """
    Get all courses the student is enrolled in
    Uses get_current_user_profile which already validates the user
    """
    try:
        # Get user ID from profile (profile already has the user's data)
        user_id = profile.get("id")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found")
        
        print(f"✅ Getting courses for user: {user_id}")
        
        # Get enrollments
        enrolled = supabase.table("enrollments")\
            .select("course_id")\
            .eq("student_id", user_id)\
            .execute()
        
        print(f"📚 Found {len(enrolled.data) if enrolled.data else 0} enrollments")
        
        if not enrolled.data:
            return []

        # Get course IDs
        ids = [e["course_id"] for e in enrolled.data]
        
        # Get course details
        courses = supabase.table("courses")\
            .select("*")\
            .in_("course_id", ids)\
            .execute()
        
        print(f"📖 Returning {len(courses.data) if courses.data else 0} courses")
        
        return courses.data or []
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error in get_courses: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ======================
# GET COURSE DETAILS
# ======================

@router.get("/{course_id}")
def get_course_details(
    course_id: str,
    profile: Dict[str, Any] = Depends(get_current_user_profile)
):
    """
    Get detailed information about a specific course
    """
    try:
        user_id = profile.get("id")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found")
        
        print(f"🔍 Getting details for course {course_id}, user {user_id}")
        
        # Get attendance
        attendance = supabase.table("attendance")\
            .select("*")\
            .eq("student_id", user_id)\
            .eq("course_id", course_id)\
            .execute()

        # Get resources
        resources = supabase.table("academic_resources")\
            .select("*")\
            .eq("course_id", course_id)\
            .execute()

        # Get events
        events = supabase.table("academic_events")\
            .select("*")\
            .eq("course_id", course_id)\
            .execute()

        return {
            "attendance": attendance.data or [],
            "resources": resources.data or [],
            "events": events.data or []
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error in get_course_details: {e}")
        raise HTTPException(status_code=500, detail=str(e))