import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'introduccion', labelKey: 'nav.intro', icon: '🏠' },
    { id: 'retos', labelKey: 'nav.retos', icon: '🎯' },
    { id: 'ia', labelKey: 'nav.ia', icon: '🤖' },
    { id: 'info', labelKey: 'nav.info', icon: '📝' },
    { id: 'logros', labelKey: 'nav.logros', icon: '🏆' },
    { id: 'historial', labelKey: 'nav.history', icon: '🕐' }, // <-- PESTAÑA AÑADIDA AQUÍ
    { id: 'comunidad', labelKey: 'nav.comunidad', icon: '👥' }, 
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 70 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg flex justify-around py-3 border-t border-gray-200 dark:border-gray-700 md:hidden"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          // CAMBIO CLAVE: Añadimos 'flex-1' y 'justify-center'
          className={`flex-1 flex flex-col items-center justify-center text-sm ${
            activeTab === tab.id
              ? 'text-blue-600'
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{t(tab.labelKey)}</span>
        </button>
      ))}
    </motion.nav>
  );
}

export default BottomNav;