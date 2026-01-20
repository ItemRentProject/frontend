import {
    Award,
    Calendar,
    LogOut,
    MessageSquare,
    Package,
    Settings,
    Shield,
    Star
} from 'lucide-react';
import Header from '../components/layout/header';

export default function ProfilePage() {
    const user = {
    name: "Александр Петров",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 4.8,
    reviews: 42,
    memberSince: "2023",
    isVerified: true,
    achievements: [
        { id: 1, title: "Хороший сосед", icon: "🏆", earned: true },
        { id: 2, title: "Активный арендатор", icon: "⭐", earned: true },
        { id: 3, title: "Надёжный хозяин", icon: "🛡️", earned: true },
        { id: 4, title: "Суперхозяин", icon: "👑", earned: false },
    ],
    stats: {
        itemsRented: 15,
        itemsListed: 8,
        totalTransactions: 23,
        responseRate: 95
    }
};

    const userItems = [
    { id: 1, title: "Дрель Makita", price: "300/день", image: "https://picsum.photos/200/150?random=1", status: "available" },
    { id: 2, title: "PlayStation 5", price: "500/день", image: "https://picsum.photos/200/150?random=2", status: "rented" },
    { id: 3, title: "Книги по программированию", price: "50/день", image: "https://picsum.photos/200/150?random=3", status: "available" },
];

    return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Левая колонка - профиль */}
            <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Аватар и имя */}
                <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                    <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                    {user.isVerified && (
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                        <Shield className="h-5 w-5" />
                    </div>
                    )}
                </div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <div className="flex items-center mt-2 space-x-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{user.rating}</span>
                    <span className="text-gray-500">({user.reviews} отзывов)</span>
                </div>
                </div>

              {/* Статистика */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-2xl text-blue-600">{user.stats.itemsListed}</div>
                    <div className="text-sm text-gray-600">Вещей сдаю</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-bold text-2xl text-green-600">{user.stats.itemsRented}</div>
                    <div className="text-sm text-gray-600">Вещей арендовал</div>
                </div>
                </div>

              {/* Действия */}
                <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition">
                    <MessageSquare className="h-5 w-5" />
                    <span>Сообщения</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition">
                    <Calendar className="h-5 w-5" />
                    <span>Мои аренды</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition">
                    <Settings className="h-5 w-5" />
                    <span>Настройки</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <LogOut className="h-5 w-5" />
                    <span>Выйти</span>
                </button>
                </div>
            </div>

            {/* Ачивки */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Ачивки
                </h2>
                <div className="space-y-3">
                {user.achievements.map(ach => (
                    <div 
                    key={ach.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${ach.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-100'}`}
                    >
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">{ach.icon}</span>
                        <div>
                        <div className="font-medium">{ach.title}</div>
                        <div className="text-sm text-gray-500">
                            {ach.earned ? 'Получено' : 'Ещё не получено'}
                        </div>
                        </div>
                    </div>
                    {ach.earned ? (
                        <div className="text-green-500">✓</div>
                    ) : (
                        <div className="text-gray-400">🔒</div>
                    )}
                    </div>
                ))}
                </div>
            </div>
            </div>

          {/* Правая колонка - мои вещи и активность */}
            <div className="md:col-span-2 space-y-6">
            {/* Мои вещи */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                    <Package className="h-6 w-6 mr-2" />
                    Мои вещи в аренде
                </h2>
                <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    + Добавить вещь
                </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                {userItems.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div className="relative h-40">
                        <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${
                        item.status === 'available' ? 'bg-green-500' : 'bg-orange-500'
                        }`}>
                        {item.status === 'available' ? 'Свободно' : 'В аренде'}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold">{item.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-blue-600">{item.price}</span>
                        <button className="text-sm text-gray-600 hover:text-blue-600">
                            Редактировать
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Активность */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Недавняя активность</h2>
                <div className="space-y-4">
                {[
                    { id: 1, action: "Арендовал PlayStation 5", user: "Иван С.", date: "Сегодня", type: "rent" },
                    { id: 2, action: "Получил 5⭐ от Марии К.", date: "Вчера", type: "review" },
                    { id: 3, action: "Добавил дрель в аренду", date: "2 дня назад", type: "add" },
                ].map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                        activity.type === 'rent' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                        {activity.type === 'rent' ? '📦' : 
                        activity.type === 'review' ? '⭐' : '➕'}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.user} • {activity.date}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}