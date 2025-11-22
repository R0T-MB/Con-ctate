// src/components/LanguageSelector.jsx (versión ultra-simplificada para prueba)
import React from 'react';

const LanguageSelector = ({ className = "" }) => {
  return (
    <select
      className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer ${className}`}
    >
      <option value="es">🇪🇸 Español</option>
      <option value="en">🇬🇧 English</option>
      <option value="fr">🇫🇷 Français</option>
    </select>
  );
};

export default LanguageSelector;