import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookmark, FaSearch } from 'react-icons/fa';

const categories = [
  'general', 'business', 'technology', 'entertainment', 'health', 'science', 'sports'
];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarkedNews');
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category]);

  useEffect(() => {
    localStorage.setItem('bookmarkedNews', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.some(item => item.title === article.title);
      if (exists) {
        return prev.filter(item => item.title !== article.title);
      }
      return [...prev, article];
    });
  };

  const filteredNews = showBookmarks 
    ? bookmarks 
    : news.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="w-full min-h-screen bg-[#1b1b1c]">
      <div className="flex flex-col gap-2 mt-2 min-h-[90vh] bg-[#0c0c0c] rounded-lg my-2 mx-3 p-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-8 text-white">
            <h1 className="text-3xl font-bold text-white">News</h1>
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                showBookmarks ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <FaBookmark /> Bookmarks
            </button>
          </div>

          {!showBookmarks && (
            <>
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-white cursor-pointer ${
                      category === cat ? 'bg-blue-600' : 'bg-[#383838]'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="relative mb-8">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#383838] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, index) => (
              <div key={index} className="bg-[#1b1b1c] border rounded-lg overflow-hidden">
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold text-white flex-1">{article.title}</h2>
                    <button
                      onClick={() => handleBookmark(article)}
                      className="ml-2 text-gray-400 hover:text-blue-400"
                    >
                      <FaBookmark 
                        className={bookmarks.some(item => item.title === article.title) ? 'text-blue-400' : ''}
                      />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{article.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage