// src/components/Header.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './ui/button';
import LanguageSelector from './LanguageSelector';

function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
      <div>
        {user ? (
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {t('header.welcome', { email: user.email })}
          </span>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-blue-600 mb-1 tracking-tight">
              {t('header.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('header.subtitle')}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">

        {/* Eliminado el menú basura que aparecía en escritorio */}
        {/*  
        <nav className="hidden md:flex space-x-6">
          <Link to="/app">{t('nav.retos')}</Link>
          <Link to="/app">{t('nav.ia')}</Link>
          <Link to="/app">{t('nav.logros')}</Link>
        </nav>
        */}

        {user && (
          <Button onClick={handleLogout} variant="secondary" size="sm">
            {t('header.logout')}
          </Button>
        )}

        {/* Selector de idioma */}
        <LanguageSelector />

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
      </div>
    </header>
  );
}

export default Header;
