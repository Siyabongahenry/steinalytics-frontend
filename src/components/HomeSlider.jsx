// components/AboutSlider.jsx
import { useState } from "react";

const HomeSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {/* Slide Content */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">{slides[current].title}</h2>
        <p className="text-gray-300 mb-6">{slides[current].description}</p>
        <div className="flex justify-center">{slides[current].component}</div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full text-white"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full text-white"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
