// Функция для объединения классов
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Форматирование цены
export function formatPrice(amount, type = 'day') {
  const suffixes = {
    hour: 'час',
    day: 'день',
    week: 'неделя',
    month: 'месяц'
  };
  
  return `${amount}₽/${suffixes[type] || 'день'}`;
}

// Форматирование расстояния
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${meters} м`;
  }
  return `${(meters / 1000).toFixed(1)} км`;
}

// Форматирование даты
export function formatDate(date, options = {}) {
  const now = new Date();
  const target = new Date(date);
  const diff = now - target;
  const diffHours = diff / (1000 * 60 * 60);
  const diffDays = diff / (1000 * 60 * 60 * 24);

  if (options.relative) {
    if (diffHours < 1) {
      return 'только что';
    }
    if (diffHours < 24) {
      return `${Math.floor(diffHours)} ч назад`;
    }
    if (diffDays < 7) {
      return `${Math.floor(diffDays)} д назад`;
    }
  }

  return target.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  });
}

// Генерация рейтинга в звёздах
export function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return {
    fullStars,
    hasHalfStar,
    emptyStars
  };
}

// Валидация телефона
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('7');
}

// Валидация email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Расчет доставки
export function calculateDelivery(distanceMeters, options = {}) {
  const basePrice = 100;
  const pricePerKm = 50;
  const distanceKm = distanceMeters / 1000;
  
  let price = basePrice + (distanceKm * pricePerKm);
  
  if (options.urgent) {
    price *= 1.5;
  }
  
  return {
    price: Math.round(price),
    time: Math.round(distanceKm * 10) + 15, // минут
    available: distanceKm <= 20 // максимум 20 км
  };
}

// Генерация аватара
export function generateAvatar(name, size = 64) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=${size}`;
}

// Проверка доступности вещи
export function isItemAvailable(item, requestedDates) {
  if (!item.isAvailable) return false;
  
  // Проверка пересечения дат
  const hasOverlap = item.rentedDates?.some(rentedDate => {
    return requestedDates.some(requestedDate => 
      requestedDate.start <= rentedDate.end && 
      requestedDate.end >= rentedDate.start
    );
  });
  
  return !hasOverlap;
}

// Расчет рейтинга
export function calculateRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}