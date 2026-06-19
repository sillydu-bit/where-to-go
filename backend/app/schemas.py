from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_at: datetime
    end_at: Optional[datetime] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    address: Optional[str] = None
    category: Optional[str] = None
    price: Optional[str] = None
    source_url: Optional[str] = None
    # image_url — УБРАЛИ

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    is_active: bool
    created_at: datetime
    model_config = {"from_attributes": True}