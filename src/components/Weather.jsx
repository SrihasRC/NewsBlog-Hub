import React, { useState, useEffect } from 'react';

const API_KEY = '822a51dd821d79a80f82f67ebb28afd2'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (searchLocation) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `${BASE_URL}/weather?q=${searchLocation}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Location not found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          if (!response.ok) throw new Error('Could not fetch weather data');
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          setError('Failed to get weather data');
        }
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    if (!weatherCode) return '☁️';
    if (weatherCode >= 200 && weatherCode < 600) return '🌧️';
    return '☀️';
  };

  return (
    <div className="text-white rounded-xl shadow-lg p-6 w-80 border-[0.5px] border-white/40">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-[#2a2a2b]/30 text-white 
                       focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin text-blue-500 text-2xl">⌛</div>
        </div>
      )}

      {error && <div className="text-red-400 text-center">{error}</div>}

      {weather && !loading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <div className="flex items-center text-gray-400">
                <span className="mr-1">📍</span>
                <span>{weather.sys.country}</span>
              </div>
            </div>
            <div className="text-4xl">{getWeatherIcon(weather.weather[0]?.id)}</div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</div>
              <div className="capitalize text-gray-400">{weather.weather[0]?.description}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400">H: {Math.round(weather.main.temp_max)}°C</div>
              <div className="text-gray-400">L: {Math.round(weather.main.temp_min)}°C</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
