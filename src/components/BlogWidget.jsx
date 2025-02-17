import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BlogWidget = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and build your first component. This comprehensive guide will walk you through everything you need to know to get started with React development.",
      author: "John Doe",
      date: "2024-02-14",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Modern CSS Techniques",
      excerpt: "Explore the latest CSS features and best practices. Discover how to create modern, responsive layouts using CSS Grid, Flexbox, and other cutting-edge techniques.",
      author: "Jane Smith",
      date: "2024-02-13",
      category: "Design",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "JavaScript Tips & Tricks",
      excerpt: "Improve your JavaScript skills with these pro tips. Learn advanced concepts and patterns that will make you a better JavaScript developer.",
      author: "Mike Johnson",
      date: "2024-02-12",
      category: "Development",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Web Performance Optimization",
      excerpt: "Make your website faster with these techniques. Learn how to optimize your web applications for better performance and user experience.",
      author: "Sarah Wilson",
      date: "2024-02-11",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [blogPosts.length]);

  const handleBlogClick = () => {
    navigate('/blog');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg">
      {blogPosts.length > 0 && (
        <div className="relative">
          <div className="relative h-[76vh] overflow-hidden rounded-lg">
            {/* View All Button */}
            <button
              onClick={handleBlogClick}
              className="text-white hover:text-blue-300 text-sm flex items-center gap-1 transition-colors duration-200 cursor-pointer absolute top-2 right-2 py-1 px-3 z-10 bg-black/40 hover:bg-black/70 rounded-sm"
            >
              View All <FaArrowRight className="text-xs" />
            </button>

            {/* Blog Image */}
            <img
              src={blogPosts[currentIndex].image}
              alt={blogPosts[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Blog Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-lg font-semibold mb-2">
                {blogPosts[currentIndex].title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-2">
                {blogPosts[currentIndex].excerpt}
              </p>
              <div className="flex justify-center gap-2 mt-3">
                {blogPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer 
                  ${index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
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

export default BlogWidget;