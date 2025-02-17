import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Calendar } from "./components/Calender";
import { WeatherWidget } from "./components/Weather";
import NewsWidget from "./components/NewsWidget";
import NewsPage from "./components/NewsPage";
import BlogWidget from "./components/BlogWidget";
import BlogPage from "./components/BlogPage";
import NewsBot from "./components/NewsBot";
import AboutSection from "./components/AboutSection";
import homebg from "./assets/home-bg.jpg";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-[#1b1b1c] pt-13">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <div className="mx-3 my-2 overflow-hidden relative">
                  <img src={homebg} alt="" className="absolute inset-0 w-full h-full opacity-15 z-0 pointer-events-none" />
                  <div className="z-10">
                    <AboutSection />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 h-[90vh] bg-[#0c0c0c] rounded-lg mx-3 mt-2">
                  <div className="w-[70%] text-white h-[94%] overflow-hidden ml-4 rounded-lg mt-3">
                    <h2 className="text-3xl text-center pb-8 font-semibold bg-gradient-to-r from-blue-700 to-purple-100 text-transparent bg-clip-text">Latest News</h2>
                    <NewsWidget />
                  </div>
                  <div className="flex flex-col gap-2 w-[30%] items-center h-full justify-center mr-2 mt-20">
                    <NewsBot />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 h-[93vh] bg-[#0c0c0c] rounded-lg mx-3 my-2">
                  <div className="w-[70%] text-white overflow-hidden m-4 rounded-lg">
                    <BlogWidget />
                  </div>
                </div>
              </>
            }
          />

          {/* Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;