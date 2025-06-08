import './App.css';
import { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Item from "./components/Item";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 bg-indigo-600 text-white dark:bg-indigo-400 dark:text-black rounded shadow hover:opacity-90"
          >
             {isDark ? "🌙 Dark" : "🌤️ Light"} 
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Item />} />
                    <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
