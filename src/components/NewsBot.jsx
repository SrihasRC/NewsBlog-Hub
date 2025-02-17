import { useState } from "react";
import { OpenAI } from "openai";
import { FaRobot, FaPaperPlane } from 'react-icons/fa';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const NewsBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    if (!query) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setResponse(data.summary);
      } else {
        setError(data.error || "Failed to get news summary.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      fetchSummary();
    }
  };

  return (
    <div className="bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 h-[75.1vh] flex flex-col w-[28vw]">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FaRobot className="text-blue-400" />
          NewsBot
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {error ? (
          <div className="bg-red-900/50 border border-red-700 p-3 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        ) : response && (
          <div className="bg-[#252525] p-3 rounded-lg text-gray-300 text-sm leading-relaxed">
            {response}
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          className="w-full p-3 pr-12 bg-[#252525] border border-gray-700 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-colors duration-200"
          placeholder="Ask about today's news..."
          rows="2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={fetchSummary}
          disabled={isLoading || !query}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
            isLoading || !query
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-blue-400 hover:text-blue-300'
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>

      {isLoading && (
        <div className="text-center text-sm text-gray-500 mt-2">
          Thinking...
        </div>
      )}
    </div>
  );
};

export default NewsBot;