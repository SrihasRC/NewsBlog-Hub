import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaNewspaper, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
        setNews(response.data.articles.slice(0, 4));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 7500);

    return () => clearInterval(timer);
  }, [news.length]);

  const handleNewsClick = () => {
    navigate('/news');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === news.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
      <div className="bg-[#1E1E1E] rounded-lg">
        {news.length > 0 && (
          <div className="relative">
            <div className="relative h-[76vh] overflow-hidden rounded-lg">
              <button
                onClick={handleNewsClick}
                className="text-white hover:text-blue-300 text-sm flex items-center gap-1 transition-colors duration-200 cursor-pointer absolute top-2 right-2 py-1 px-3 z-10 bg-black/40 hover:bg-black/70 rounded-sm"
              >
                View All <FaArrowRight className="text-xs" />
              </button>
              <img
                src={news[currentIndex].urlToImage || 'https://via.placeholder.com/600x400?text=News'}
                alt={news[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {news[currentIndex].title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {news[currentIndex].description}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  {news.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <FaChevronRight />
            </button>


          </div>
        )}
      </div>
    );
};

export default NewsWidget;