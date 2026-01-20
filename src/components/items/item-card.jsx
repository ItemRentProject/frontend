import { Clock, MapPin, Shield, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    const categories = {
        electronics: '📱 Электроника',
        tools: '🛠️ Инструменты',
        sports: '⚽ Спорт',
        books: '📚 Книги',
        household: '🏠 Для дома',
        clothing: '👕 Одежда',
        other: '🎲 Другое'
    };

    const handleCardClick = () => {
        navigate(`/items/${item.id}`, {
            state: {
                itemData: item, // Можно передать данные о товаре через state
                from: window.location.pathname // Откуда пришли
            }
        });
    };

    const handleOwnerClick = (e) => {
        e.stopPropagation(); // Предотвращаем всплытие клика на карточку
        navigate(`/profile/${item.owner.id}`);
    };

    const handleCategoryClick = (e) => {
        e.stopPropagation();
        navigate(`/items?category=${item.category}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    return (
        <article 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Карточка товара: ${item.title}. Цена: ${item.price} рублей в день`}
        >
            {/* Изображение */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {item.isAvailable ? (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Доступно
                    </span>
                ) : (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Занято
                    </span>
                )}
                <button 
                    onClick={handleCategoryClick}
                    className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                    aria-label={`Категория: ${categories[item.category] || categories.other}`}
                >
                    {categories[item.category] || categories.other}
                </button>
            </div>

            {/* Контент */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{item.title}</h3>
                    <span className="font-bold text-lg text-blue-600 whitespace-nowrap">
                        {formatPrice(item.price)} ₽/день
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                {/* Инфо о владельце */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={handleOwnerClick}
                        className="flex items-center space-x-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-lg"
                        aria-label={`Профиль владельца: ${item.owner.name}`}
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium">{item.owner.name}</p>
                            <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-600">{item.owner.rating}</span>
                                {item.owner.isVerified && (
                                    <Shield className="h-3 w-3 text-green-500" aria-label="Проверенный пользователь" />
                                )}
                            </div>
                        </div>
                    </button>
                </div>

                {/* Локация и расстояние */}
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                    <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.distance} м</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Доставка {item.deliveryTime}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ItemCard;