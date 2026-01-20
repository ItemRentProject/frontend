import { Calendar, DollarSign, Filter, MapPin, Sliders, Star, X } from 'lucide-react';
import { useState } from 'react';

export default function ItemFilter({ onFilterChange, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    distance: 5,
    sortBy: 'distance',
    availability: 'all'
  });

  const sortOptions = [
    { value: 'distance', label: 'Ближайшие' },
    { value: 'price_low', label: 'Цена (низкая)' },
    { value: 'price_high', label: 'Цена (высокая)' },
    { value: 'rating', label: 'Рейтинг' },
    { value: 'newest', label: 'Новые' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Все' },
    { value: 'available', label: 'Только доступные' },
    { value: 'verified', label: 'Только проверенные' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      distance: 5,
      sortBy: 'distance',
      availability: 'all'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    val => val !== '' && val !== 0 && val !== 'all' && val !== 'distance'
  ).length;

  return (
    <div className="relative">
      {/* Кнопка фильтров */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        <Filter className="h-5 w-5" />
        <span>Фильтры</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Модальное окно фильтров */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            {/* Заголовок */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sliders className="h-6 w-6" />
                <h2 className="text-xl font-bold">Фильтры</h2>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Контент фильтров */}
            <div className="p-4 space-y-6">
              {/* Категория */}
              <div>
                <label className="block font-medium mb-2">Категория</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Все категории</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Цена */}
              <div>
                <label className="block font-medium mb-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Цена за день
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="От"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="До"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Рейтинг */}
              <div>
                <label className="block font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Минимальный рейтинг: {filters.minRating}+
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0</span>
                  <span>2.5</span>
                  <span>5</span>
                </div>
              </div>

              {/* Расстояние */}
              <div>
                <label className="block font-medium mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Расстояние: до {filters.distance} км
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={filters.distance}
                  onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 км</span>
                  <span>10 км</span>
                  <span>20 км</span>
                </div>
              </div>

              {/* Доступность */}
              <div>
                <label className="block font-medium mb-2">Доступность</label>
                <div className="space-y-2">
                  {availabilityOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Сортировка */}
              <div>
                <label className="block font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Сортировка
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex space-x-3">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Сбросить
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:opacity-90"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}