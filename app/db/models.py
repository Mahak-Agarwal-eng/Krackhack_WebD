from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class Profile(Base):
    __tablename__ = "profiles"

    # id should match the Supabase Auth UUID
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, default="STUDENT") # STUDENT, FACULTY, AUTHORITY, ADMIN
    department = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Pillar I: Identification Columns
    roll_number = Column(String, unique=True, nullable=True) # For Students
    employee_id = Column(String, unique=True, nullable=True) # For Faculty
    is_active = Column(Boolean, default=False) # For Admin Approval system

    def __repr__(self):
        return f"<Profile(email={self.email}, role={self.role})>"