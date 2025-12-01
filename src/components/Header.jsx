// src/components/Header.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './ui/button';
import MobileMenu from './MobileMenu'; // <-- IMPORTAR EL NUEVO MENÚ

function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- NUEVO ESTADO

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
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
          {/* Botones de escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Button onClick={handleLogout} variant="secondary" size="sm">
                {t('header.logout')}
              </Button>
            )}
            <LanguageSelector />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? '🌙' : '🌞'}
            </button>
          </div>

          {/* Botón de hamburguesa para móviles */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Menú móvil */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

export default Header;