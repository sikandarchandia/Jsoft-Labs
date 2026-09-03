import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';

function Navbar({ darkMode, setDarkMode, wallet }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Notes', href: '/notes' },
    { name: 'Chat', href: '/chat' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const WalletButton = ({ size = 'md' }) => {
    if (wallet.account) {
      return (
        <div className="flex items-center gap-2">
          <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} text-secondary-500 dark:text-secondary-400 hidden lg:inline`}>
            {parseFloat(wallet.balance || 0).toFixed(3)} ETH
          </span>
          <button
            onClick={wallet.disconnect}
            className={`inline-flex items-center gap-1.5 ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} font-medium rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {wallet.shortAddress}
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-end gap-1">
        <button
          onClick={wallet.connect}
          disabled={wallet.connecting}
          className={`btn flex items-center gap-2 ${wallet.connecting ? 'opacity-60 cursor-wait' : ''}`}
          title={wallet.hasWallet ? 'Connect your wallet' : 'Install MetaMask to connect'}
        >
          <FaWallet size={size === 'sm' ? 12 : 14} />
          {wallet.connecting ? 'Connecting...' : wallet.hasWallet ? 'Connect Wallet' : 'Install MetaMask'}
        </button>
        {wallet.error && (
          <span className="text-xs text-red-500 max-w-[200px] text-right">{wallet.error}</span>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white dark:bg-secondary-800 shadow-sm transition-colors duration-300">
      <div className="container">
        <div className="flex justify-between h-16">

          <div className="flex">
            <Link to="/" className="flex items-center">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
                <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
              </svg>
              <span className="text-2xl font-bold text-primary-600 mt-1.5">RoyalCity</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} />}
            </button>
            <WalletButton />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={18} className="text-yellow-400" /> : <FiMoon size={18} />}
            </button>
            <button
              type="button"
              className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-secondary-800 transition-colors duration-300">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {wallet.error && (
                <p className="px-3 py-1 text-xs text-red-500">{wallet.error}</p>
              )}
              <div className="px-3 py-2">
                <WalletButton size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
