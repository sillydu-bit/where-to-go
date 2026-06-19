from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, Text, func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)  # В реальном проекте хэшировать!
    created_at = Column(DateTime, server_default=func.now())

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    start_at = Column(DateTime, nullable=False)
    end_at = Column(DateTime, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    address = Column(String(255), nullable=True)
    category = Column(String(100), index=True)
    price = Column(String(100), nullable=True)
    source_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())