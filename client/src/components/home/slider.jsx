import React from 'react'
import { useEffect, useState } from 'react';
import { slideData } from '../../constants/sliderData';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center">
      {slideData.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out z-${index === currentSlide ? '20' : '10'}`}
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center"
            loading={index === 0 ? 'eager' : 'lazy'} 
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-30 px-5 max-w-[800px] w-full">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-4 text-shadow-lg font-serif">
              {slide.title}
            </h2>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] font-normal text-shadow-md font-sans tracking-wide">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all duration-300 hover:bg-white/70 hover:scale-110 shadow-sm ${
              index === currentSlide ? 'bg-white' : 'bg-transparent'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
