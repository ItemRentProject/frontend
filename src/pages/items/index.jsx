import { Grid, List, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ItemCard from '../../components/items/item-card';
import ItemFilter from '../../components/items/item-filter';
import Footer from '../../components/layout/footer';
import Header from '../../components/layout/header';

// Моковые данные
const mockItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: ['Дрель Makita', 'PlayStation 5', 'Велосипед', 'Книги по программированию'][i % 4],
  description: 'Отличное состояние, все работает идеально. Полный комплект.',
  price: [300, 500, 200, 50][i % 4],
  image: `https://picsum.photos/400/300?random=${i}`,
  isAvailable: i % 3 !== 0,
  category: ['tools', 'electronics', 'sports', 'books'][i % 4],
  distance: [500, 1200, 800, 1500][i % 4],
  deliveryTime: ['15 мин', '20 мин', '25 мин', '30 мин'][i % 4],
  owner: {
    name: ['Алексей', 'Мария', 'Иван', 'Анна'][i % 4],
    rating: 4.8 - (i * 0.1 % 0.5),
    isVerified: i % 2 === 0
  }
}));

const categories = [
  { id: 'all', label: 'Все', icon: '🎯' },
  { id: 'electronics', label: 'Электроника', icon: '📱' },
  { id: 'tools', label: 'Инструменты', icon: '🛠️' },
  { id: 'sports', label: 'Спорт', icon: '⚽' },
  { id: 'books', label: 'Книги', icon: '📚' },
  { id: 'household', label: 'Для дома', icon: '🏠' },
  { id: 'clothing', label: 'Одежда', icon: '👕' },
  { id: 'other', label: 'Другое', icon: '🎲' }
];

export default function ItemsPage() {
  const [viewMode, setViewMode] = useState('grid'); // grid или list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState(mockItems);

  // Фильтрация и поиск
  useEffect(() => {
    let filtered = [...mockItems];

    // Поиск по запросу
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Применение остальных фильтров
    if (filters.minPrice) {
      filtered = filtered.filter(item => item.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.price <= parseInt(filters.maxPrice));
    }
    if (filters.minRating) {
      filtered = filtered.filter(item => item.owner.rating >= filters.minRating);
    }
    if (filters.availability === 'available') {
      filtered = filtered.filter(item => item.isAvailable);
    }

    // Сортировка
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.owner.rating - a.owner.rating);
          break;
        case 'distance':
          filtered.sort((a, b) => a.distance - b.distance);
          break;
      }
    }

    setItems(filtered);
  }, [searchQuery, selectedCategory, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Заголовок и поиск */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Вещи в аренду рядом</h1>
          <p className="text-gray-600 mb-6">
            Находите нужные вещи в вашем районе
          </p>

          {/* Поисковая строка */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Искать вещи по названию или описанию..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Фильтры и контролы */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          {/* Категории */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Контролы */}
          <div className="flex items-center space-x-3">
            <ItemFilter 
              onFilterChange={handleFilterChange} 
              categories={categories.filter(c => c.id !== 'all')}
            />
            
            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Информация о фильтрах */}
        {(searchQuery || selectedCategory !== 'all' || Object.keys(filters).length > 0) && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Активные фильтры:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Поиск: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-2 text-blue-600">×</button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Категория: {categories.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2 text-blue-600">×</button>
                </span>
              )}
              
              {filters.minPrice && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Цена от: {filters.minPrice}₽
                </span>
              )}
              
              {filters.minRating > 0 && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Рейтинг от: {filters.minRating}+
                </span>
              )}
            </div>
          </div>
        )}

        {/* Результаты */}
        {items.length > 0 ? (
          <>
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'} gap-6 mb-8`}>
              {items.map(item => (
                <ItemCard key={item.id} item={item} viewMode={viewMode} />
              ))}
            </div>
            
            {/* Пагинация */}
            <div className="flex justify-center items-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                ← Назад
              </button>
              <span className="text-gray-600">Страница 1 из 3</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Далее →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить параметры поиска или сбросить фильтры
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilters({});
              }}
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}

        {/* Баннер с картой */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ищите на карте</h3>
                <p className="text-blue-100">
                  Смотрите вещи прямо на карте вашего района
                </p>
              </div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                <MapPin className="inline mr-2 h-5 w-5" />
                Открыть карту
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}