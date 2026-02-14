
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# EXISTING ROUTES
from app.routes.auth import router as auth_router
# 1. IMPORT your new grievance router
from app.routes.grievances import router as grievance_router 

# NEW USER MANAGEMENT ROUTE
from app.routes.users import router as users_router
from app.routes.student_courses import router as student_courses_router

app = FastAPI(
    title="AEGIS API",
    description="IIT Mandi Campus Management Platform API",
    version="1.0.0"
)

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# ROUTES
# -------------------------
app.include_router(auth_router, prefix=settings.API_PREFIX)

# 2. INCLUDE the grievance router
app.include_router(grievance_router, prefix=settings.API_PREFIX)

# ADD THIS LINE
app.include_router(users_router, prefix=settings.API_PREFIX)
app.include_router(student_courses_router, prefix=settings.API_PREFIX)

# -------------------------
# HEALTH
# -------------------------
@app.get("/")
def root():
    return {
        "message": "AEGIS API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}