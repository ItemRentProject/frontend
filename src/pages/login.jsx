import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/header';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone'); // phone, email, social
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Логика входа
      console.log('Вход с:', loginMethod === 'phone' ? formData.phone : formData.email);
      // После успешного входа редирект
      navigate('/dashboard');
    } else {
      // Логика регистрации
      console.log('Регистрация:', formData);
      // После успешной регистрации редирект
      navigate('/dashboard');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Вход через ${provider}`);
    // Редирект на OAuth
    // После OAuth редирект обратно
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    // Проверяем, есть ли куда возвращаться
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Если нет истории, идем на главную
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Заголовок */}
          <div className="mb-8">
            <button 
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Назад
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Войдите, чтобы арендовать вещи у соседей' 
                : 'Присоединяйтесь к сообществу экономных соседей'}
            </p>
          </div>

          {/* Социальные кнопки */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('vk')}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              <span className="font-bold">VK</span>
              <span>Войти через ВКонтакте</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleSocialLogin('yandex')}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
            >
              <span className="font-bold">Я</span>
              <span>Войти через Яндекс</span>
            </button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">или через телефон/почту</span>
              </div>
            </div>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Александр"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Переключатель метода входа */}
            <div className="flex space-x-2 mb-4">
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-lg transition ${
                  loginMethod === 'phone' 
                    ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Phone className="h-4 w-4 inline mr-2" />
                Телефон
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg transition ${
                  loginMethod === 'email' 
                    ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Почта
              </button>
            </div>

            {/* Поле для телефона или почты */}
            {loginMethod === 'phone' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (999) 999-99-99"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Отправим SMS с кодом подтверждения
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Электронная почта *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@mail.ru"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Пароль */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль {!isLogin && '*'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required={!isLogin}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder={isLogin ? "Пароль (опционально)" : "Придумайте пароль"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Введите пароль, если установили его ранее
                </p>
              )}
            </div>

            {/* Подтверждение пароля для регистрации */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите пароль *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Повторите пароль"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Дополнительные опции для входа */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-600">Запомнить меня</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Забыли пароль?
                </button>
              </div>
            )}

            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition mt-6"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </button>

            {/* Переключатель между входом и регистрацией */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isLogin 
                  ? 'Нет аккаунта? Зарегистрируйтесь' 
                  : 'Уже есть аккаунт? Войдите'}
              </button>
            </div>

            {/* Соглашение */}
            {!isLogin && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая «Создать аккаунт», вы соглашаетесь с {' '}
                <button 
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-blue-600 hover:underline"
                >
                  Условиями использования
                </button>{' '}
                и{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-blue-600 hover:underline"
                >
                  Политикой конфиденциальности
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}