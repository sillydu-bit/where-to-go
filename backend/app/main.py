from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import engine, Base
from app.models import Event, User
from app.routes.events import router as events_router
from app.routes.auth import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Куда пойти сегодня?", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok"}