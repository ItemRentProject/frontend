import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

const ItemGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Основное изображение */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
        <img
          src={images[currentIndex]}
          alt={`${title} - фото ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => setIsZoomed(true)}
        />
        
        {/* Навигация */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        {/* Кнопка зума */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        
        {/* Индикатор */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                index === currentIndex
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Миниатюра ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Модальное окно с увеличенным изображением */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={images[currentIndex]}
              alt="Увеличенное фото"
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemGallery;