import { Heart, HelpCircle, Mail, MapPin, Phone, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* О компании */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-lg">
                <span className="font-bold text-lg">ДБ</span>
              </div>
              <span className="font-bold text-xl">ДавайБери</span>
            </div>
            <p className="text-gray-400 mb-4">
              Сообщество для аренды вещей у соседей. Экономим вместе.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">VK</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Telegram</a>
              <a href="#" className="text-gray-400 hover:text-white transition">YouTube</a>
            </div>
          </div>

          {/* Ссылки */}
          <div>
            <h3 className="font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><a href="/items" className="text-gray-400 hover:text-white transition">Все вещи</a></li>
              <li><a href="/map" className="text-gray-400 hover:text-white transition">Карта</a></li>
              <li><a href="/add-item" className="text-gray-400 hover:text-white transition">Добавить вещь</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition">Мой профиль</a></li>
              <li><a href="/help" className="text-gray-400 hover:text-white transition">Помощь</a></li>
            </ul>
          </div>

          {/* Помощь */}
          <div>
            <h3 className="font-bold text-lg mb-4">Помощь</h3>
            <ul className="space-y-2">
              <li><a href="/safety" className="text-gray-400 hover:text-white transition flex items-center"><Shield className="h-4 w-4 mr-2" /> Безопасность</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition flex items-center"><HelpCircle className="h-4 w-4 mr-2" /> FAQ</a></li>
              <li><a href="/rules" className="text-gray-400 hover:text-white transition">Правила сервиса</a></li>
              <li><a href="/insurance" className="text-gray-400 hover:text-white transition">Страхование</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">Контакты</a></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-bold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                support@davayberi.ru
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                +7 (800) 123-45-67
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                Москва, ул. Студенческая, 33
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 ДавайБери. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition">Конфиденциальность</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition">Условия</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">
            Сделано с <Heart className="h-4 w-4 inline text-red-500" /> для студентов и молодых семей
          </div>
        </div>
      </div>
    </footer>
  );
}