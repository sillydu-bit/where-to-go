from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models import Event

Base.metadata.create_all(bind=engine)

def add_test_events():
    db = SessionLocal()
    
    # Очищаем старые данные
    db.query(Event).delete()
    
    events_data = [
        # СТАРЫЕ 10 СОБЫТИЙ (оставляем)
        {
            "title": "Концерт рок-группы",
            "description": "Живая музыка, каверы на известные хиты. Не пропустите!",
            "start_at": datetime.now() + timedelta(days=1, hours=19),
            "end_at": datetime.now() + timedelta(days=1, hours=22),
            "lat": 55.7558, "lng": 37.6173,
            "address": "Москва, ул. Примерная, 10 (Центр)",
            "category": "концерт", "price": "500₽",
            "source_url": "https://example.com/concert",
        },
        {
            "title": "Выставка современного искусства",
            "description": "Работы молодых художников. Уникальная возможность!",
            "start_at": datetime.now() + timedelta(hours=10),
            "end_at": datetime.now() + timedelta(hours=20),
            "lat": 55.7602, "lng": 37.6186,
            "address": "Москва, Красная площадь, 1 (Центр)",
            "category": "выставка", "price": "Бесплатно",
            "source_url": "https://example.com/exhibition",
        },
        {
            "title": "Кинопоказ: Новый фильм",
            "description": "Премьера года. Блокбастер, который все ждали!",
            "start_at": datetime.now() + timedelta(days=2, hours=18),
            "end_at": datetime.now() + timedelta(days=2, hours=20),
            "lat": 55.7512, "lng": 37.6156,
            "address": "Москва, кинотеатр Октябрь (Центр)",
            "category": "кино", "price": "350₽",
            "source_url": "https://example.com/movie",
        },
        {
            "title": "Джазовый вечер в Сокольниках",
            "description": "Камерный концерт джазового квартета. Атмосферная музыка.",
            "start_at": datetime.now() + timedelta(days=3, hours=19),
            "end_at": datetime.now() + timedelta(days=3, hours=21),
            "lat": 55.7827, "lng": 37.6778,
            "address": "Москва, Сокольнический вал, 1 (Сокольники)",
            "category": "концерт", "price": "800₽",
            "source_url": "https://example.com/jazz",
        },
        {
            "title": "Фестиваль уличной еды",
            "description": "Более 30 корнеров с едой со всего мира.",
            "start_at": datetime.now() + timedelta(days=5, hours=12),
            "end_at": datetime.now() + timedelta(days=5, hours=22),
            "lat": 55.6447, "lng": 37.5458,
            "address": "Москва, парк 60-летия Октября (Южное Бутово)",
            "category": "прогулка", "price": "Бесплатно",
            "source_url": "https://example.com/foodfest",
        },
        {
            "title": "Стендап-шоу",
            "description": "Выступление известных комиков. Смех гарантирован!",
            "start_at": datetime.now() + timedelta(days=4, hours=20),
            "end_at": datetime.now() + timedelta(days=4, hours=22),
            "lat": 55.7961, "lng": 37.3706,
            "address": "Москва, Митинская ул., 32 (Митино)",
            "category": "концерт", "price": "1200₽",
            "source_url": "https://example.com/standup",
        },
        {
            "title": "Выставка ретро-автомобилей",
            "description": "Коллекция автомобилей 60-80х годов.",
            "start_at": datetime.now() + timedelta(days=6, hours=11),
            "end_at": datetime.now() + timedelta(days=6, hours=18),
            "lat": 55.8194, "lng": 37.6247,
            "address": "Москва, ВДНХ, павильон 75 (Останкино)",
            "category": "выставка", "price": "300₽",
            "source_url": "https://example.com/retro",
        },
        {
            "title": "Мастер-класс по гончарному делу",
            "description": "Научитесь работать на гончарном круге.",
            "start_at": datetime.now() + timedelta(days=7, hours=15),
            "end_at": datetime.now() + timedelta(days=7, hours=18),
            "lat": 55.7308, "lng": 37.6669,
            "address": "Москва, ул. Таганская, 45 (Таганка)",
            "category": "мастер-класс", "price": "2000₽",
            "source_url": "https://example.com/pottery",
        },
        {
            "title": "Ночная велопрогулка",
            "description": "Прокатимся по ночной Москве! Маршрут 15 км.",
            "start_at": datetime.now() + timedelta(days=2, hours=21),
            "end_at": datetime.now() + timedelta(days=2, hours=23),
            "lat": 55.7031, "lng": 37.6756,
            "address": "Москва, парк Коломенское (ЮАО)",
            "category": "прогулка", "price": "600₽",
            "source_url": "https://example.com/bike",
        },
        {
            "title": "Арт-вечеринка в Хохловке",
            "description": "Альтернативное искусство, перформансы, DJ-сеты. 18+",
            "start_at": datetime.now() + timedelta(days=8, hours=19),
            "end_at": datetime.now() + timedelta(days=8, hours=23),
            "lat": 55.7527, "lng": 37.6456,
            "address": "Москва, Хохловский пер., 7-9 (Покровка)",
            "category": "выставка", "price": "500₽",
            "source_url": "https://example.com/artparty",
        },
        
        # 🆕 НОВЫЕ 10 СОБЫТИЙ
        {
            "title": "Йога на свежем воздухе",
            "description": "Утренняя йога в парке. Подходит для всех уровней подготовки. Коврики предоставляются.",
            "start_at": datetime.now() + timedelta(days=1, hours=8),
            "end_at": datetime.now() + timedelta(days=1, hours=10),
            "lat": 55.7312, "lng": 37.6008,
            "address": "Москва, парк Музеон (Центр)",
            "category": "прогулка", "price": "Бесплатно",
            "source_url": "https://example.com/yoga",
        },
        {
            "title": "Квиз-вечер в баре",
            "description": "Интеллектуальная игра для команд. Призы победителям! Темы: кино, музыка, наука.",
            "start_at": datetime.now() + timedelta(days=2, hours=19),
            "end_at": datetime.now() + timedelta(days=2, hours=22),
            "lat": 55.7689, "lng": 37.5894,
            "address": "Москва, ул. 1905 года, 7 (Пресня)",
            "category": "концерт", "price": "400₽",
            "source_url": "https://example.com/quiz",
        },
        {
            "title": "Мастер-класс по фотографии",
            "description": "Научитесь делать профессиональные снимки на смартфон. Разбор композиции и света.",
            "start_at": datetime.now() + timedelta(days=4, hours=14),
            "end_at": datetime.now() + timedelta(days=4, hours=17),
            "lat": 55.7914, "lng": 37.5394,
            "address": "Москва, ул. Авиаторов, 14 (Покровское-Стрешнево)",
            "category": "мастер-класс", "price": "1500₽",
            "source_url": "https://example.com/photo",
        },
        {
            "title": "Показ независимого кино",
            "description": "Фестиваль короткометражек от молодых режиссеров. Обсуждение с авторами после показа.",
            "start_at": datetime.now() + timedelta(days=3, hours=20),
            "end_at": datetime.now() + timedelta(days=3, hours=23),
            "lat": 55.7711, "lng": 37.5956,
            "address": "Москва, Красный Октябрь, стр. 2 (Центр)",
            "category": "кино", "price": "450₽",
            "source_url": "https://example.com/indie",
        },
        {
            "title": "Экскурсия по крышам Москвы",
            "description": "Незабываемый вид на город с высоты! Профессиональный гид, страховка включена.",
            "start_at": datetime.now() + timedelta(days=5, hours=18),
            "end_at": datetime.now() + timedelta(days=5, hours=21),
            "lat": 55.7495, "lng": 37.6153,
            "address": "Москва, центр (точка встречи уточняется)",
            "category": "прогулка", "price": "2500₽",
            "source_url": "https://example.com/rooftop",
        },
        {
            "title": "Лекция об искусстве XXI века",
            "description": "Известный искусствовед расскажет о современных тенденциях в живописи и скульптуре.",
            "start_at": datetime.now() + timedelta(days=6, hours=19),
            "end_at": datetime.now() + timedelta(days=6, hours=21),
            "lat": 55.7415, "lng": 37.6208,
            "address": "Москва, Крымский Вал, 10 (Третьяковка)",
            "category": "выставка", "price": "Бесплатно",
            "source_url": "https://example.com/lecture",
        },
        {
            "title": "Детский спектакль 'Колобок'",
            "description": "Интерактивный спектакль для детей 3-7 лет. Герои выходят в зал!",
            "start_at": datetime.now() + timedelta(days=7, hours=12),
            "end_at": datetime.now() + timedelta(days=7, hours=13),
            "lat": 55.7886, "lng": 37.6014,
            "address": "Москва, ул. Садовая-Самотечная, 5 (Тверской)",
            "category": "концерт", "price": "700₽",
            "source_url": "https://example.com/kids",
        },
        {
            "title": "Винная дегустация",
            "description": "Дегустация вин из разных регионов мира. Сомелье расскажет о каждом образце.",
            "start_at": datetime.now() + timedelta(days=8, hours=18),
            "end_at": datetime.now() + timedelta(days=8, hours=21),
            "lat": 55.7558, "lng": 37.6173,
            "address": "Москва, ул. Никольская, 10 (Центр)",
            "category": "мастер-класс", "price": "3500₽",
            "source_url": "https://example.com/wine",
        },
        {
            "title": "Уличный фестиваль музыки",
            "description": "Опен-эйр с участием местных групп. Фуд-траки, мастер-классы по танцам.",
            "start_at": datetime.now() + timedelta(days=9, hours=15),
            "end_at": datetime.now() + timedelta(days=9, hours=22),
            "lat": 55.7298, "lng": 37.6013,
            "address": "Москва, парк Горького (Центр)",
            "category": "концерт", "price": "Бесплатно",
            "source_url": "https://example.com/street",
        },
        {
            "title": "Выставка научных экспериментов",
            "description": "Интерактивная выставка для всей семьи. Физика, химия, биология в действии!",
            "start_at": datetime.now() + timedelta(days=10, hours=11),
            "end_at": datetime.now() + timedelta(days=10, hours=19),
            "lat": 55.7244, "lng": 37.5872,
            "address": "Москва, ул. Вавилова, 57 (Академический)",
            "category": "выставка", "price": "400₽",
            "source_url": "https://example.com/science",
        },
    ]
    
    for event_data in events_data:
        event = Event(**event_data)
        db.add(event)
    
    db.commit()
    print(f"✅ Добавлено {len(events_data)} событий по всей Москве!")
    db.close()

if __name__ == "__main__":
    add_test_events()