import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import logoImage from './components/logo.png';
import Overview from './components/overview.tsx';
import './index.css';

function MainApplication() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const toggleDarkMode = () => {

    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      <div className='flex items-center justify-between p-4 gap-4'>
        <img
          src={logoImage}
          alt="Logo"
          className="w-50 h-50 object-contain bg-gray-600 rounded-4xl flex-shrink-0"
        />

        {/* Search*/}
        <div className='flex items-center gap-4 flex-grow justify-center'>
          <input
            type="text"
            value={searchTerm}
            onChange={(el) => setSearchTerm(el.target.value)}
            placeholder="Search by name"
            className={`border h-15 px-2 rounded-md w-58 text-2xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-300 border-gray-300 text-black'}`}
          />

          {searchTerm.length > 0 && (
            <input
              type="text"
              value={searchYear}
              onChange={(el) => setSearchYear(el.target.value)}
              placeholder="Search by year"
              className={`border h-15 px-2 rounded-md w-58 text-2xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-300 border-gray-300 text-black'}`}
            />
          )}
        </div>

        {/* Dark mode switch */}
        <button
          onClick={toggleDarkMode}
          className={`hover:cursor-pointer p-2 rounded transition-colors flex h-15 pt-4 ${darkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
        >
          Toggle Dark Mode ({darkMode ? 'On' : 'Off'})
        </button>
      </div>

      <Overview
        darkmode={darkMode}
        searchTerm={searchTerm}
        searchYear={searchYear}
        setSearchTerm={setSearchTerm}
        setSearchYear={setSearchYear}
      />
      <App />
    </div>
  );
}

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <MainApplication />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element. Ensure an element with ID 'root' exists in your HTML.");
}
