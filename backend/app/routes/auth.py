from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    # Проверяем, есть ли уже такой пользователь
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    
    # Создаем нового
    user = User(username=username, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username}

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username, User.password == password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Неверное имя или пароль")
    return {"id": user.id, "username": user.username}