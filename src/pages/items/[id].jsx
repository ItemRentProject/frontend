import {
    AlertCircle,
    Calendar,
    Check,
    CreditCard,
    Heart,
    MapPin,
    MessageSquare,
    Package,
    Phone,
    Share2,
    Shield,
    Star,
    User,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/layout/footer';
import Header from '../../components/layout/header';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLiked, setIsLiked] = useState(false);

  // Моковые данные
  const item = {
    id: 1,
    title: 'Дрель Makita 18V с набором свёрл',
    description: 'Мощная аккумуляторная дрель-шуруповёрт Makita в отличном состоянии. Полный комплект: 2 аккумулятора, зарядное устройство, кейс, набор бит и свёрл по дереву и металлу. Идеально подходит для домашнего ремонта, сборки мебели и других задач.',
    detailedDescription: `
      <h3>Характеристики:</h3>
      <ul>
        <li>Мощность: 18V</li>
        <li>Тип аккумулятора: Li-ion</li>
        <li>Крутящий момент: 50 Нм</li>
        <li>Скорость вращения: 0-1400 об/мин</li>
        <li>Вес: 1.3 кг</li>
        <li>Гарантия производителя: 3 года</li>
      </ul>
      
      <h3>Комплектация:</h3>
      <ul>
        <li>Дрель-шуруповёрт</li>
        <li>2 аккумулятора 2.0Ач</li>
        <li>Зарядное устройство</li>
        <li>Кейс для хранения</li>
        <li>Набор бит (10 шт)</li>
        <li>Набор свёрл (8 шт)</li>
        <li>Инструкция</li>
      </ul>
      
      <h3>Условия аренды:</h3>
      <ul>
        <li>Залог: 3000₽ (возвращается при возврате)</li>
        <li>Минимальный срок: 1 день</li>
        <li>Доставка: возможна за дополнительную плату</li>
        <li>Инструктаж: провожу бесплатный инструктаж по использованию</li>
      </ul>
    `,
    price: 300,
    priceType: 'day',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ],
    category: 'tools',
    condition: 'Отличное',
    isAvailable: true,
    rating: 4.8,
    totalRents: 24,
    distance: 500,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryPrice: 100
    },
    owner: {
      id: 1,
      name: 'Александр Петров',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      rating: 4.9,
      reviews: 42,
      memberSince: '2023',
      isVerified: true,
      responseRate: 95,
      responseTime: '15 минут'
    },
    reviews: [
      {
        id: 1,
        user: 'Иван Сидоров',
        rating: 5,
        date: '2024-01-15',
        text: 'Отличная дрель, всё работает идеально. Александр всё подробно объяснил. Рекомендую!'
      },
      {
        id: 2,
        user: 'Мария Иванова',
        rating: 4,
        date: '2024-01-10',
        text: 'Всё понравилось, дрель мощная. Небольшая царапина на корпусе, но на работу не влияет.'
      }
    ]
  };

  const calculateTotal = () => {
    if (!selectedDates.start || !selectedDates.end) return 0;
    const days = Math.ceil((new Date(selectedDates.end) - new Date(selectedDates.start)) / (1000 * 60 * 60 * 24)) || 1;
    return item.price * days * quantity;
  };

  const handleRent = () => {
    navigate(`/rent/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - галерея и описание */}
          <div className="lg:col-span-2 space-y-8">
            {/* Галерея */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="col-span-2">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {item.images.slice(1).map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`${item.title} ${index + 2}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {index === item.images.length - 2 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer">
                        <span className="text-white font-bold">+{item.images.length - 4} фото</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Информация */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-bold">{item.rating}</span>
                      <span className="text-gray-500 ml-1">({item.totalRents} аренд)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.distance} м от вас</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {item.condition}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {item.price}₽ <span className="text-lg text-gray-600">/ день</span>
                    </div>
                    <div className="text-gray-600">Минимальный срок: 1 день</div>
                  </div>
                  {item.isAvailable ? (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-1" />
                      <span className="font-bold">Доступно</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <X className="h-5 w-5 mr-1" />
                      <span className="font-bold">Занято</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Табы */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'description', label: 'Описание', icon: null },
                    { id: 'reviews', label: 'Отзывы', icon: null },
                    { id: 'delivery', label: 'Доставка', icon: null },
                    { id: 'questions', label: 'Вопросы', icon: null }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 font-medium border-b-2 transition ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Контент табов */}
              <div>
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.detailedDescription }}
                    />
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-6 w-6 text-yellow-500 fill-current" />
                          <span className="text-2xl font-bold ml-2">{item.rating}</span>
                          <span className="text-gray-600 ml-2">({item.reviews.length} отзывов)</span>
                        </div>
                        <div className="text-gray-600">
                          {item.owner.name} отвечает в среднем за {item.owner.responseTime}
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Написать отзыв
                      </button>
                    </div>
                    
                    {item.reviews.map(review => (
                      <div key={review.id} className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{review.user}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-gray-500 text-sm">{review.date}</div>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'delivery' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium">Самовывоз</div>
                          <div className="text-gray-600">Адрес покажется после бронирования</div>
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">Бесплатно</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium">Доставка курьером</div>
                          <div className="text-gray-600">В пределах 5 км от владельца</div>
                        </div>
                      </div>
                      <div className="font-medium">{item.deliveryOptions.deliveryPrice}₽</div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-800">Важно знать</div>
                          <ul className="text-blue-700 text-sm mt-1 space-y-1">
                            <li>• Точный адрес показывается только после подтверждения аренды</li>
                            <li>• Проверяйте вещь при получении</li>
                            <li>• Фотографируйте состояние перед арендой</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Владелец */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Владелец</h2>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img 
                    src={item.owner.avatar} 
                    alt={item.owner.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-lg">{item.owner.name}</h3>
                      {item.owner.isVerified && (
                        <Shield className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span>{item.owner.rating} ({item.owner.reviews} отзывов)</span>
                      </div>
                      <div>На сайте с {item.owner.memberSince}</div>
                    </div>
                    <div className="text-gray-600">
                      Ответ на сообщения за {item.owner.responseTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Написать
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Позвонить
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - бронирование */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Виджет бронирования */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Забронировать</h2>
                
                {/* Дата */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Даты аренды</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={selectedDates.start || ''}
                        onChange={(e) => setSelectedDates({...selectedDates, start: e.target.value})}
                      />
                      <div className="text-xs text-gray-500 mt-1">Начало</div>
                    </div>
                    <div>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={selectedDates.end || ''}
                        onChange={(e) => setSelectedDates({...selectedDates, end: e.target.value})}
                      />
                      <div className="text-xs text-gray-500 mt-1">Конец</div>
                    </div>
                  </div>
                </div>

                {/* Количество */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Количество</label>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Итог */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>{item.price}₽ × {quantity} шт.</span>
                      <span>{item.price * quantity}₽</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>3 дня</span>
                      <span>{calculateTotal()}₽</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Доставка</span>
                      <span>+100₽</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Итого</span>
                      <span>{calculateTotal() + 100}₽</span>
                    </div>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="space-y-3">
                  <button
                    onClick={handleRent}
                    disabled={!item.isAvailable || !selectedDates.start || !selectedDates.end}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!selectedDates.start || !selectedDates.end 
                      ? 'Выберите даты' 
                      : 'Продолжить бронирование'}
                  </button>
                  
                  <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50">
                    Добавить в избранное
                  </button>
                </div>

                {/* Гарантии */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-600">Защита от мошенничества</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-600">Безопасная оплата</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-gray-600">Бесплатная отмена за 24 часа</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Похожие вещи */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-4">Похожие вещи рядом</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <img 
                        src={`https://picsum.photos/80/80?random=${i + 10}`}
                        alt="Similar item"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">Дрель DeWalt</div>
                        <div className="text-blue-600 font-bold">350₽/день</div>
                        <div className="text-gray-500 text-sm">450 м</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}