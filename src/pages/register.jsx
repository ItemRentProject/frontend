import { ArrowLeft, Calendar, Eye, EyeOff, Home, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/header';

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1: Основная информация, 2: Дополнительная информация, 3: Подтверждение
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Шаг 1
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Шаг 2
    birthDate: '',
    gender: '',
    address: '',
    apartment: '',
    
    // Шаг 3
    agreeTerms: false,
    agreeNewsletter: false,
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      // Переход к следующему шагу
      setStep(step + 1);
      return;
    }
    
    // Финал: регистрация пользователя
    console.log('Регистрация:', formData);
    
    try {
      // Здесь будет API запрос для регистрации
      // const response = await api.register(formData);
      
      // После успешной регистрации
      navigate('/verify-email', {
        state: {
          email: formData.email,
          userId: '123' // будет из ответа API
        }
      });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      // Здесь можно добавить обработку ошибок
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialRegister = (provider) => {
    console.log(`Регистрация через ${provider}`);
    // Редирект на OAuth
    navigate('/dashboard');
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        return (
          formData.name.trim() &&
          formData.phone.trim() &&
          formData.email.trim() &&
          formData.password.trim() &&
          formData.confirmPassword.trim() &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return formData.birthDate.trim();
      case 3:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const validatePassword = () => {
    const password = formData.password;
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers,
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    };
  };

  const passwordValidation = validatePassword();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Создание аккаунта
                </h1>
                <p className="text-gray-600">
                  Присоединяйтесь к сообществу экономных соседей
                </p>
              </div>
              
              {/* Прогресс */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Шаг {step} из 3</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map(num => (
                    <div 
                      key={num}
                      className={`w-2 h-2 rounded-full ${num <= step ? 'bg-blue-600' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Социальные кнопки (только на первом шаге) */}
          {step === 1 && (
            <>
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleSocialRegister('vk')}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  <span className="font-bold">VK</span>
                  <span>Зарегистрироваться через ВКонтакте</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleSocialRegister('yandex')}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  <span className="font-bold">Я</span>
                  <span>Зарегистрироваться через Яндекс</span>
                </button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">или через почту и телефон</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Форма */}
          <form onSubmit={handleSubmit}>
            {/* Шаг 1: Основная информация */}
            {step === 1 && (
              <div className="space-y-4">
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
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Александр"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+7 (999) 999-99-99"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

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
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@mail.ru"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пароль *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Придумайте надежный пароль"
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
                  
                  {/* Валидация пароля */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-xs ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                        Минимум 8 символов
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-xs ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                        Заглавная буква
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowerCase ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-xs ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                        Строчная буква
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumbers ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-xs ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-gray-500'}`}>
                        Хотя бы одна цифра
                      </span>
                    </div>
                  </div>
                </div>

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
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Повторите пароль"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Пароли не совпадают</p>
                  )}
                </div>
              </div>
            )}

            {/* Шаг 2: Дополнительная информация */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата рождения *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Пол
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Не указано</option>
                      <option value="male">Мужской</option>
                      <option value="female">Женский</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Улица, дом"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    />
                  </div>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Квартира (опционально)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Адрес нужен для определения вашего района и показа ближайших предложений
                  </p>
                </div>
              </div>
            )}

            {/* Шаг 3: Подтверждение */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3">Проверьте ваши данные</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Имя:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Телефон:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    {formData.birthDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Дата рождения:</span>
                        <span className="font-medium">
                          {new Date(formData.birthDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                    {formData.address && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Адрес:</span>
                        <span className="font-medium">
                          {formData.address} {formData.apartment && `, кв. ${formData.apartment}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      Я соглашаюсь с{' '}
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
                      *
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeNewsletter}
                      onChange={(e) => handleInputChange('agreeNewsletter', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Я хочу получать информацию о новых предложениях, акциях и обновлениях сервиса
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Кнопки навигации */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isStepValid()}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition ${
                  isStepValid() 
                    ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {step < 3 ? 'Продолжить' : 'Зарегистрироваться'}
              </button>

              {step === 1 && (
                <p className="text-center mt-4 text-sm text-gray-600">
                  Уже есть аккаунт?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Войдите
                  </button>
                </p>
              )}

              {/* Индикатор прогресса */}
              <div className="mt-6 flex justify-center space-x-3">
                {[1, 2, 3].map(num => (
                  <div 
                    key={num}
                    className={`w-8 h-2 rounded-full ${num <= step ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}