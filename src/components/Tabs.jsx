import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- NUEVO

function Tabs({ activeTab, setActiveTab }) {
  const { t } = useTranslation(); // <-- NUEVO

  // <-- CAMBIO: Ahora usamos 'labelKey' en lugar de 'label'
  const tabs = [
    { id: 'introduccion', labelKey: 'nav.intro' },
    { id: 'retos', labelKey: 'nav.retos' },
    { id: 'ia', labelKey: 'nav.ia' },
    { id: 'info', labelKey: 'nav.info' },
    { id: 'logros', labelKey: 'nav.logros' },
    { id: 'comunidad', labelKey: 'nav.comunidad' }, 
  ];

  return (
    <nav className="mb-8 flex justify-center gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow transition-all ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {/* <-- CAMBIO: Usamos la función t() para traducir */}
          {t(tab.labelKey)}
        </button>
      ))}
    </nav>
  );
}

export default Tabs;