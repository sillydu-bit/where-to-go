import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapPin, Calendar, ExternalLink, Loader2, Filter, X, Moon, Sun, CreditCard, User, Phone, CheckCircle, ShieldCheck, Heart, LogIn, LogOut } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

interface Event {
  id: number;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string | null;
  lat: number | null;
  lng: number | null;
  address: string | null;
  category: string | null;
  price: string | null;
  source_url: string | null;
}

// Моковые данные для демонстрации
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Концерт рок-группы",
    description: "Живая музыка, каверы на известные хиты. Не пропустите!",
    start_at: new Date(Date.now() + 86400000).toISOString(),
    end_at: new Date(Date.now() + 97200000).toISOString(),
    lat: 55.7558,
    lng: 37.6173,
    address: "Москва, ул. Примерная, 10 (Центр)",
    category: "концерт",
    price: "500₽",
    source_url: "https://example.com"
  },
  {
    id: 2,
    title: "Выставка современного искусства",
    description: "Работы молодых художников. Уникальная возможность!",
    start_at: new Date().toISOString(),
    end_at: new Date(Date.now() + 36000000).toISOString(),
    lat: 55.7602,
    lng: 37.6186,
    address: "Москва, Красная площадь, 1 (Центр)",
    category: "выставка",
    price: "Бесплатно",
    source_url: "https://example.com"
  },
  {
    id: 3,
    title: "Кинопоказ: Новый фильм",
    description: "Премьера года. Блокбастер, который все ждали!",
    start_at: new Date(Date.now() + 172800000).toISOString(),
    end_at: new Date(Date.now() + 180000000).toISOString(),
    lat: 55.7512,
    lng: 37.6156,
    address: "Москва, кинотеатр Октябрь (Центр)",
    category: "кино",
    price: "350₽",
    source_url: "https://example.com"
  },
  {
    id: 4,
    title: "Джазовый вечер в Сокольниках",
    description: "Камерный концерт джазового квартета.",
    start_at: new Date(Date.now() + 259200000).toISOString(),
    end_at: new Date(Date.now() + 266400000).toISOString(),
    lat: 55.7827,
    lng: 37.6778,
    address: "Москва, Сокольнический вал, 1 (Сокольники)",
    category: "концерт",
    price: "800₽",
    source_url: "https://example.com"
  },
  {
    id: 5,
    title: "Фестиваль уличной еды",
    description: "Более 30 корнеров с едой со всего мира.",
    start_at: new Date(Date.now() + 432000000).toISOString(),
    end_at: new Date(Date.now() + 475200000).toISOString(),
    lat: 55.6447,
    lng: 37.5458,
    address: "Москва, парк 60-летия Октября (Южное Бутово)",
    category: "прогулка",
    price: "Бесплатно",
    source_url: "https://example.com"
  },
  {
    id: 6,
    title: "Стендап-шоу",
    description: "Выступление известных комиков. Смех гарантирован!",
    start_at: new Date(Date.now() + 345600000).toISOString(),
    end_at: new Date(Date.now() + 352800000).toISOString(),
    lat: 55.7961,
    lng: 37.3706,
    address: "Москва, Митинская ул., 32 (Митино)",
    category: "концерт",
    price: "1200₽",
    source_url: "https://example.com"
  },
  {
    id: 7,
    title: "Выставка ретро-автомобилей",
    description: "Коллекция автомобилей 60-80х годов.",
    start_at: new Date(Date.now() + 518400000).toISOString(),
    end_at: new Date(Date.now() + 554400000).toISOString(),
    lat: 55.8194,
    lng: 37.6247,
    address: "Москва, ВДНХ, павильон 75 (Останкино)",
    category: "выставка",
    price: "300₽",
    source_url: "https://example.com"
  },
  {
    id: 8,
    title: "Мастер-класс по гончарному делу",
    description: "Научитесь работать на гончарном круге.",
    start_at: new Date(Date.now() + 604800000).toISOString(),
    end_at: new Date(Date.now() + 615600000).toISOString(),
    lat: 55.7308,
    lng: 37.6669,
    address: "Москва, ул. Таганская, 45 (Таганка)",
    category: "мастер-класс",
    price: "2000₽",
    source_url: "https://example.com"
  },
  {
    id: 9,
    title: "Ночная велопрогулка",
    description: "Прокатимся по ночной Москве! Маршрут 15 км.",
    start_at: new Date(Date.now() + 172800000).toISOString(),
    end_at: new Date(Date.now() + 180000000).toISOString(),
    lat: 55.7031,
    lng: 37.6756,
    address: "Москва, парк Коломенское (ЮАО)",
    category: "прогулка",
    price: "600₽",
    source_url: "https://example.com"
  },
  {
    id: 10,
    title: "Арт-вечеринка в Хохловке",
    description: "Альтернативное искусство, перформансы, DJ-сеты. 18+",
    start_at: new Date(Date.now() + 691200000).toISOString(),
    end_at: new Date(Date.now() + 705600000).toISOString(),
    lat: 55.7527,
    lng: 37.6456,
    address: "Москва, Хохловский пер., 7-9 (Покровка)",
    category: "выставка",
    price: "500₽",
    source_url: "https://example.com"
  }
]

interface UserData {
  id: number;
  username: string;
}

const CATEGORIES = ['все', 'концерт', 'выставка', 'кино', 'мастер-класс', 'прогулка']

// Простая модалка входа/регистрации
function AuthModal({ onClose, onAuth }: { onClose: () => void; onAuth: (user: UserData) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/register'
      const res = await fetch(`http://localhost:8000${endpoint}?username=${username}&password=${password}`, {
        method: 'POST',
      })
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.detail || 'Ошибка')
        return
      }

      onAuth(data)
    } catch (err) {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              required
              minLength={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            onClick={() => { setIsLogin(!isLogin); setError('') }}
            className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {isLogin ? 'Создать' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
  const [selectedCategory, setSelectedCategory] = useState('все')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'tomorrow' | 'week'>('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  useEffect(() => {
    if (isDark) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark') }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light') }
  }, [isDark])

  // Авторизация
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  // Избранное
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (eventId: number) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentEvent, setPaymentEvent] = useState<Event | null>(null)
  const [paymentForm, setPaymentForm] = useState({ fullName: '', phone: '', card: '' })
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const cardRefs = useRef<Record<number, HTMLDivElement>>({})

useEffect(() => {
  // Пробуем загрузить с бэкенда
  fetch('http://localhost:8000/api/v1/events')
    .then(res => res.json())
    .then(data => {
      setEvents(data)
      setLoading(false)
    })
    .catch(() => {
      // Если бэкенд недоступен — используем моковые данные
      console.log('Backend unavailable, using mock data')
      setEvents(MOCK_EVENTS)
      setLoading(false)
    })
}, [])

  const filteredEvents = events.filter(event => {
    if (selectedCategory !== 'все' && event.category !== selectedCategory) return false
    if (showFavoritesOnly && !favorites.includes(event.id)) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!event.title.toLowerCase().includes(q) && !event.description?.toLowerCase().includes(q)) return false
    }
    if (dateFilter !== 'all') {
      const eventDate = new Date(event.start_at)
      const today = new Date(); today.setHours(0,0,0,0)
      const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1)
      const weekLater = new Date(today); weekLater.setDate(weekLater.getDate()+7)
      if (dateFilter === 'today' && new Date(eventDate.setHours(0,0,0,0)).getTime() !== today.getTime()) return false
      if (dateFilter === 'tomorrow' && new Date(eventDate.setHours(0,0,0,0)).getTime() !== tomorrow.getTime()) return false
      if (dateFilter === 'week' && (eventDate < today || eventDate > weekLater)) return false
    }
    return true
  })

  const clearFilters = () => { setSelectedCategory('все'); setSearchQuery(''); setDateFilter('all'); setShowFavoritesOnly(false) }

  const scrollToCard = (id: number) => {
    const card = cardRefs.current[id]
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const center = selectedEvent ? [selectedEvent.lat || 55.7558, selectedEvent.lng || 37.6173] : [55.7558, 37.6173]
  const hasActiveFilters = selectedCategory !== 'все' || searchQuery !== '' || dateFilter !== 'all' || showFavoritesOnly

  const openPaymentModal = (event: Event) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    setPaymentEvent(event)
    setShowPaymentModal(true)
    setPaymentStatus('idle')
    setPaymentForm({ fullName: user.username, phone: '', card: '' })
    setFormErrors({})
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}
    if (paymentForm.fullName.trim().length < 3) errors.fullName = 'Введите ФИО полностью'
    if (!/^\+?[0-9\s\-()]{10,}$/.test(paymentForm.phone)) errors.phone = 'Некорректный номер телефона'
    if (!/^[0-9\s]{16,19}$/.test(paymentForm.card.replace(/\s/g, ''))) errors.card = 'Введите 16 цифр карты'

    if (Object.keys(errors).length > 0) { setFormErrors(errors); return }

    setPaymentStatus('processing')
    setTimeout(() => {
      setPaymentStatus('success')
      setTimeout(() => setShowPaymentModal(false), 2500)
    }, 1500)
  }

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900"><Loader2 className="animate-spin w-10 h-10 text-indigo-600" /></div>

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-20 flex-shrink-0">
        <div className="p-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 Куда пойти сегодня?</h1>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.username}</span>
                  </div>
                  <button
                    onClick={() => setUser(null)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <LogIn className="w-5 h-5" />
                  Войти
                </button>
              )}
              {hasActiveFilters && <button onClick={clearFilters} className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"><X className="w-4 h-4" /> Сбросить</button>}
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <input type="text" placeholder="🔍 Поиск событий..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Filter className="w-4 h-4 inline mr-1" /> Категория</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-sm rounded-lg capitalize transition ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Calendar className="w-4 h-4 inline mr-1" /> Когда</label>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">Все даты</option><option value="today">Сегодня</option><option value="tomorrow">Завтра</option><option value="week">Эта неделя</option>
              </select>
            </div>
            <div className="sm:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"><Heart className="w-4 h-4 inline mr-1" /> Избранное</label>
              <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`w-full px-3 py-2 border rounded-lg transition ${showFavoritesOnly ? 'bg-pink-600 text-white border-pink-600' : 'bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}
              >
                {showFavoritesOnly ? `❤️ Избранное (${favorites.length})` : 'Показать избранное'}
              </button>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">Найдено: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{filteredEvents.length}</span> событий</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-3/5 h-[40vh] md:h-full relative border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <MapContainer center={center as [number, number]} zoom={12} style={{ height: "100%", width: "100%" }} className="z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
            {filteredEvents.map((event) => event.lat && event.lng && (
              <Marker key={event.id} position={[event.lat, event.lng]} eventHandlers={{ click: () => { setSelectedEvent(event); scrollToCard(event.id) } }}>
                <Popup>
                  <div className="p-1 max-w-[200px]">
                    <h3 className="font-bold text-sm mb-1 text-gray-900">{event.title}</h3>
                    <p className="text-xs text-gray-600">{event.price}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-full md:w-2/5 h-[50vh] md:h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20"><div className="text-6xl mb-4">😕</div><p className="text-gray-500 dark:text-gray-400">Ничего не найдено</p></div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} ref={(el) => { if (el) cardRefs.current[event.id] = el }}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-5 border transition-all cursor-pointer hover:shadow-md ${selectedEvent?.id === event.id ? 'ring-2 ring-indigo-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full uppercase">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{event.price}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(event.id) }}
                        className={`p-2 rounded-full transition ${favorites.includes(event.id) ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-pink-600'}`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {new Date(event.start_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {event.address}
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); openPaymentModal(event) }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98]"
                  >
                    Купить билет <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* МОДАЛКА АВТОРИЗАЦИИ */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuth={(userData) => {
            setUser(userData)
            setShowAuthModal(false)
          }}
        />
      )}

      {/* МОДАЛКА ОПЛАТЫ */}
      {showPaymentModal && paymentEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !paymentStatus.includes('success') && setShowPaymentModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Оформление билета</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{paymentEvent.title}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">{paymentEvent.price}</p>
              </div>
              {!paymentStatus.includes('success') && (
                <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
              )}
            </div>

            {paymentStatus === 'idle' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ФИО</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input type="text" value={paymentForm.fullName} onChange={(e) => setPaymentForm({...paymentForm, fullName: e.target.value})} className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white ${formErrors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  </div>
                  {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input type="tel" value={paymentForm.phone} onChange={(e) => setPaymentForm({...paymentForm, phone: e.target.value})} className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white ${formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Номер карты</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input type="text" value={paymentForm.card} onChange={(e) => setPaymentForm({...paymentForm, card: e.target.value.replace(/[^0-9\s]/g, '')})} className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white ${formErrors.card ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  </div>
                  {formErrors.card && <p className="text-xs text-red-500 mt-1">{formErrors.card}</p>}
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">
                  Оплатить {paymentEvent.price}
                </button>
              </form>
            )}

            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center py-8">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-700 dark:text-gray-300">Обработка платежа...</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Оплата прошла успешно!</h3>
                <p className="text-gray-600 dark:text-gray-300">Билет отправлен на ваш телефон.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App