// src/components/LanguageSelector.jsx
import React from 'react';
import i18n from '../i18n';

const LanguageSelector = ({ className = "" }) => {
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue={i18n.language}
      className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer ${className}`}
    >
      <option value="es">🇪🇸 Español</option>
      <option value="en">🇬🇧 English</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="pt">🇵🇹 Português</option>
      <option value="it">🇮🇹 Italiano</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  );
};

export default LanguageSelector;
