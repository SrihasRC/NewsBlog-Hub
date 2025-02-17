import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
    return (
        <div className="bg-[#0c0c0c] border rounded-lg p-8 text-center h-[90vh] flex justify-center items-center">
            <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome to NewsBlog Hub
                </h2>
                <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
                    Your one-stop destination for staying informed and engaged. Explore our{' '}
                    <Link to="/news" className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200">
                        latest news
                    </Link>{' '}
                    coverage and dive into insightful{' '}
                    <Link to="/blog" className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200">
                        blog posts
                    </Link>{' '}
                    from our community. Need a quick summary? Our{' '}
                    <span className="text-blue-400">AI-powered NewsBot</span>{' '}
                    is here to help!
                </p>
                <p className="text-gray-300 mt-6 animate-bounce">
                    Scroll down to explore ↓
                </p>
            </div>
        </div>
    );
};

export default AboutSection;