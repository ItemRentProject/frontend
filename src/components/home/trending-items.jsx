import { TrendingUp } from 'lucide-react';
import ItemCard from '../items/item-card';

const TrendingItems = () => {
  const trendingItems = [
    {
      id: 1,
      title: 'PlayStation 5 + 2 геймпада',
      description: 'Новая консоль, все работает отлично. Игры в комплекте.',
      price: 500,
      image: 'https://picsum.photos/400/300?random=10',
      isAvailable: true,
      category: 'electronics',
      distance: 800,
      deliveryTime: '20 мин',
      owner: {
        name: 'Иван С.',
        rating: 4.9,
        isVerified: true
      }
    },
    {
      id: 2,
      title: 'Электросамокат Xiaomi',
      description: 'Заряда хватает на 30 км. Максимальная скорость 25 км/ч.',
      price: 400,
      image: 'https://picsum.photos/400/300?random=11',
      isAvailable: true,
      category: 'sports',
      distance: 1200,
      deliveryTime: '25 мин',
      owner: {
        name: 'Анна М.',
        rating: 4.7,
        isVerified: true
      }
    },
    {
      id: 3,
      title: 'Камера GoPro Hero 10',
      description: 'Идеальна для путешествий. Все аксессуары в комплекте.',
      price: 350,
      image: 'https://picsum.photos/400/300?random=12',
      isAvailable: true,
      category: 'electronics',
      distance: 600,
      deliveryTime: '15 мин',
      owner: {
        name: 'Дмитрий К.',
        rating: 4.8,
        isVerified: false
      }
    },
    {
      id: 4,
      title: 'Паяльная станция',
      description: 'Профессиональная станция для радиолюбителей.',
      price: 200,
      image: 'https://picsum.photos/400/300?random=13',
      isAvailable: true,
      category: 'tools',
      distance: 900,
      deliveryTime: '20 мин',
      owner: {
        name: 'Сергей В.',
        rating: 5.0,
        isVerified: true
      }
    }
  ];

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-orange-500" />
          Популярно сейчас
        </h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Смотреть все →
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TrendingItems;