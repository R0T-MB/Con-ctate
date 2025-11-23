// src/components/LandingPage.jsx
import QuotesSection from './QuotesSection';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next'; // <-- IMPORTACIÓN CORRECTA
import Button from './ui/button';
import LanguageSelector from './LanguageSelector';
import HowItWorksSection from './HowItWorksSection';
import PurposeSection from './PurposeSection';
import FinalCTASection from './FinalCTASection';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation(); // <-- USO CORRECTO

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>

    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </button>

      <section 
        className={`relative flex items-center justify-center min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-4">
          <LanguageSelector className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30" />
          <Button
            onClick={() => navigate('/login')}
            variant="secondary"
            size="sm"
            className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
          >
            {t('landing.hero.login', 'Iniciar Sesión')}
          </Button>
        </div>

        <motion.div
          className="text-center max-w-4xl mx-auto px-6 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {user && (
            <button
              onClick={logout}
              className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cerrar Sesión Actual (Depuración)
            </button>
          )}

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
            variants={itemVariants}
          >
            {t('landing.hero.title', 'Fortalece tu Vínculo Familiar,')}
            <br />
            <span className="text-yellow-300">{t('landing.hero.titleHighlight', 'un Reto a la Vez.')}</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-4 opacity-90 max-w-2xl mx-auto drop-shadow-md"
            variants={itemVariants}
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          {/* <-- NUEVO MENSAJE AQUÍ */}
          <motion.p
            className="text-base md:text-lg mb-8 opacity-80 max-w-2xl mx-auto drop-shadow-md"
            variants={itemVariants}
          >
            {t('landing.hero.inclusiveMessage')}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              onClick={() => navigate('/register')}
              variant="secondary"
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
            >
              {t('landing.hero.cta', 'Comienza tu Viaje')}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* SECCIONES EXISTENTES Y NUEVA */}
      <HowItWorksSection />
      <QuotesSection /> {/* Asumiendo que creaste este archivo */}
      <PurposeSection />
      <FinalCTASection />
    </>
  );
};

export default LandingPage;