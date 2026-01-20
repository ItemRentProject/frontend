import { Bell, MapPin, Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = false; // Заменить на реальную проверку авторизации

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleMapClick = () => {
        navigate('/map');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/items?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e);
        }
    };

    const handleNotificationClick = () => {
        navigate('/notifications');
    };

    const handleMobileLinkClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Логотип */}
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        onClick={handleLogoClick}
                        aria-label="На главную страницу"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-lg">
                            <span className="font-bold text-lg">ДБ</span>
                        </div>
                        <span className="font-bold text-xl text-gray-800 hidden sm:block">
                            ДавайБери
                        </span>
                    </button>

                    {/* Поиск */}
                    <div className="flex-1 max-w-2xl mx-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                                placeholder="Искать вещи рядом..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                aria-label="Поиск вещей"
                            />
                        </form>
                    </div>

                    {/* Иконки действий */}
                    <div className="flex items-center space-x-4">
                        <button 
                            className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleMapClick}
                            aria-label="Карта"
                        >
                            <MapPin className="h-6 w-6 text-gray-600" />
                        </button>
                        
                        <button 
                            className="p-2 hover:bg-gray-100 rounded-full relative focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleNotificationClick}
                            aria-label="Уведомления"
                        >
                            <Bell className="h-6 w-6 text-gray-600" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {isLoggedIn ? (
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleProfileClick}
                                aria-label="Профиль"
                            >
                                <User className="h-6 w-6 text-gray-600" />
                            </button>
                        ) : (
                            <button
                                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={handleLoginClick}
                            >
                                Войти
                            </button>
                        )}

                        {/* Мобильное меню */}
                        <button 
                            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Мобильное меню */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t pt-4">
                        <nav className="flex flex-col space-y-2">
                            <button 
                                onClick={() => handleMobileLinkClick('/items')}
                                className="py-2 px-4 hover:bg-gray-100 rounded text-left focus:outline-none focus:bg-gray-100"
                            >
                                Все вещи
                            </button>
                            <button 
                                onClick={() => handleMobileLinkClick('/add-item')}
                                className="py-2 px-4 hover:bg-gray-100 rounded text-left focus:outline-none focus:bg-gray-100"
                            >
                                Добавить вещь
                            </button>
                            <button 
                                onClick={() => handleMobileLinkClick('/profile')}
                                className="py-2 px-4 hover:bg-gray-100 rounded text-left focus:outline-none focus:bg-gray-100"
                            >
                                Мой профиль
                            </button>
                            <button 
                                onClick={() => handleMobileLinkClick('/help')}
                                className="py-2 px-4 hover:bg-gray-100 rounded text-left focus:outline-none focus:bg-gray-100"
                            >
                                Помощь
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}