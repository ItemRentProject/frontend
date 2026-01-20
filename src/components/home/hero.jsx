import { MapPin, Search, Shield, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const popularSearches = [
    'Дрель',
    'PlayStation',
    'Книги',
    'Велосипед',
    'Удочка',
    'Паяльник'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateToSearch();
  };

  const handleSearchClick = () => {
    navigateToSearch();
  };

  const navigateToSearch = () => {
    if (searchTerm.trim() || location.trim()) {
      navigate(`/items?q=${encodeURIComponent(searchTerm.trim())}&location=${encodeURIComponent(location.trim())}`);
    } else {
      navigate('/items');
    }
    // Очищаем поля после поиска
    setSearchTerm('');
    setLocation('');
  };

  const handlePopularSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // Автоматически переходим к поиску при клике на популярный запрос
    setTimeout(() => {
      navigate(`/items?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setLocation('');
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigateToSearch();
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-green-500/10" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Арендуй вещи у{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              соседей
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Бери напрокат инструменты, технику и другие вещи рядом с домом. 
            Экономь деньги и помогай соседям зарабатывать.
          </p>

          {/* Поисковая строка */}
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl shadow-xl p-2 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Что хотите арендовать?"
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
                    aria-label="Что хотите арендовать"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ваш район"
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
                    aria-label="Ваш район"
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSearchClick}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!searchTerm.trim() && !location.trim()}
                aria-label="Найти вещи для аренды"
              >
                Найти
              </button>
            </div>
          </form>

          {/* Популярные запросы */}
          <div className="mb-8">
            <p className="text-gray-600 mb-3">Популярные запросы:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePopularSearch(search)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition hover:scale-105 active:scale-95"
                  aria-label={`Поиск: ${search}`}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center group">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-1 text-gray-900">Безопасно</h3>
              <p className="text-sm text-gray-600">Проверенные пользователи</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-1 text-gray-900">Экономно</h3>
              <p className="text-sm text-gray-600">Выгоднее покупки</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-1 text-gray-900">Сообщество</h3>
              <p className="text-sm text-gray-600">Только соседи</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-1 text-gray-900">Рядом</h3>
              <p className="text-sm text-gray-600">В вашем районе</p>
            </div>
          </div>

          {/* Призыв к действию */}
          <div className="mt-12">
            <button
              type="button"
              onClick={() => navigate('/how-it-works')}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
            >
              Узнайте, как это работает
              <svg 
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-300/20 rounded-full blur-xl" />
    </div>
  );
}