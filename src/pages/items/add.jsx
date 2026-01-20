import { MapPin, Upload, X } from 'lucide-react';
import { useState } from 'react';
import Header from '../../components/layout/header';

export default function AddItemPage() {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    address: '',
    priceType: 'day', // day/hour
    deliveryOptions: {
        pickup: true,
        delivery: false
    }
});

    const categories = [
    { id: 'electronics', label: '📱 Электроника' },
    { id: 'tools', label: '🛠️ Инструменты' },
    { id: 'sports', label: '⚽ Спорт' },
    { id: 'books', label: '📚 Книги' },
    { id: 'household', label: '🏠 Для дома' },
    { id: 'clothing', label: '👕 Одежда' },
    { id: 'other', label: '🎲 Другое' }
];

    const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        file
    }));
    setImages([...images, ...newImages].slice(0, 5)); // Максимум 5 фото
};

    const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
};

    const handleSubmit = async (e) => {
    e.preventDefault();
    // Здесь будет логика отправки на сервер
    console.log('Данные для отправки:', { ...formData, images });
};

    return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Добавить вещь в аренду</h1>
            <p className="text-gray-600 mb-6">Заполните информацию о вашей вещи</p>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Загрузка фото */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Фотографии (до 5 штук)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {images.map((img, index) => (
                    <div key={index} className="relative">
                    <img
                        src={img.url}
                        alt={`Upload ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    </div>
                ))}
                
                {images.length < 5 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Добавить фото</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    </label>
                )}
                </div>
            </div>

            {/* Название */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Название вещи *
                </label>
                <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Например: Дрель Makita 18V"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Описание */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание *
                </label>
                <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                placeholder="Опишите состояние, особенности, комплектацию..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Категория и цена */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена аренды *
                </label>
                <div className="flex space-x-4">
                    <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="100"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({...formData, priceType: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <option value="hour">₽/час</option>
                    <option value="day">₽/день</option>
                    <option value="week">₽/неделя</option>
                    </select>
                </div>
                </div>
            </div>

            {/* Локация */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес (район/улица) *
                </label>
                <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Введите район или улицу"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                Точный адрес будет показан только после подтверждения аренды
                </p>
            </div>

            {/* Способ получения */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Способ получения
                </label>
                <div className="space-y-2">
                <label className="flex items-center space-x-3">
                    <input
                    type="checkbox"
                    checked={formData.deliveryOptions.pickup}
                    onChange={(e) => setFormData({
                        ...formData,
                        deliveryOptions: {...formData.deliveryOptions, pickup: e.target.checked}
                    })}
                    className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span>Самовывоз</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                    type="checkbox"
                    checked={formData.deliveryOptions.delivery}
                    onChange={(e) => setFormData({
                        ...formData,
                        deliveryOptions: {...formData.deliveryOptions, delivery: e.target.checked}
                    })}
                    className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span>Возможна доставка (+100₽)</span>
                </label>
                </div>
            </div>

            {/* Кнопка отправки */}
            <div className="pt-4">
                <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition"
                >
                Опубликовать объявление
                </button>
                <p className="text-center text-gray-500 text-sm mt-2">
                После публикации ваша вещь появится в ленте у соседей
                </p>
            </div>
            </form>
        </div>
        </div>
    </div>
    );
}