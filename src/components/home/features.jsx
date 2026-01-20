import { Award, Clock, DollarSign, Heart, Home, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Экономьте деньги',
      description: 'Не покупайте дорогие вещи для одноразового использования. Арендуйте у соседей за небольшую плату.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: 'Освобождайте пространство',
      description: 'Зарабатывайте на вещах, которые пылятся дома. Превратите хлам в пассивный доход.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Экономьте время',
      description: 'Нужен инструмент прямо сейчас? Найдите его в соседнем доме за 15 минут.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Помогайте экологии',
      description: 'Совместное использование вещей уменьшает производство и потребление ресурсов.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Быстрая доставка',
      description: 'Забирайте вещи у соседей или заказывайте доставку в пределах района.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Зарабатывайте репутацию',
      description: 'Получайте хорошие отзывы и повышайте рейтинг. Вещи надёжных пользователей видят первыми.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Почему выбирают{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              ДавайБери
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создали сервис, который решает проблемы студентов и молодых семей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-blue-100">Соседей в сообществе</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-blue-100">Успешных сделок</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-blue-100">Средний рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Безопасных сделок</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}