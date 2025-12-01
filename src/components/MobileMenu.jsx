// src/components/MobileMenu.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector'; // <-- Importación correcta
import Button from './ui/button'; // <-- Importación correcta (solo una vez)
import { useTranslation } from 'react-i18next';

function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {user?.email}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <LanguageSelector className="w-full" />
                
                <button
                  onClick={toggleTheme}
                  className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{theme === 'light' ? '🌙' : '🌞'}</span>
                  <span>{t('header.toggle_theme', 'Cambiar Tema')}</span>
                </button>

                <Button onClick={handleLogout} className="w-full">
                  {t('header.logout', 'Cerrar Sesión')}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;