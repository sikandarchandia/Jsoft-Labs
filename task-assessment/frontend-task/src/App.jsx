import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Property3D from './pages/Property3D';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Notes from './pages/Notes';
import { useWallet } from './hooks/useWallet';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import { applyTheme, getStoredTheme } from './utils/theme';

function App() {
  const wallet = useWallet();
  const [darkMode, setDarkMode] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const handleThemeChange = (value) => {
    const next = typeof value === 'function' ? value(darkMode) : value;
    applyTheme(next);
    setDarkMode(next);
  };

  return (
    <Router>
      <AppShell darkMode={darkMode} setDarkMode={handleThemeChange} wallet={wallet} />
    </Router>
  );
}

function AppShell({ darkMode, setDarkMode, wallet }) {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  const isDashboard = location.pathname === '/dashboard';
  const isAppView = isChat || isDashboard;

  return (
    <div className={`${isAppView ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300`}>
      {!isDashboard && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} wallet={wallet} />}
      <main className={`flex-grow min-h-0 ${isAppView ? 'overflow-hidden flex flex-col' : ''}`}>
        <Routes>
          <Route path="/" element={<Home wallet={wallet} />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/property-3d" element={<Property3D />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/chat" element={<div className="h-full min-h-0 flex flex-col"><Chatbot /></div>} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path = '*' element={<NotFound/>} />
        </Routes>
      </main>
      {!isAppView && <Footer />}
    </div>
  );
}

export default App;