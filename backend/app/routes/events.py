from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models import Event
from app.schemas import EventOut

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/", response_model=List[EventOut])
def read_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    q = db.query(Event).filter(Event.is_active == True)
    if category:
        q = q.filter(Event.category.ilike(f"%{category}%"))
    if date_from:
        q = q.filter(Event.start_at >= date_from)
    if date_to:
        q = q.filter(Event.start_at <= date_to)
    return q.offset(skip).limit(limit).all()