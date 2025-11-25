// src/components/LanguageSelector.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const LanguageSelector = ({ className = "" }) => {
  const { i18n: i18nextInstance } = useTranslation();

  const [lang, setLang] = useState(i18nextInstance.language);

  const handleChange = (e) => {
    const newLang = e.target.value;

    setLang(newLang);               // ESTA LÍNEA ERA LA QUE FALTABA EN TU HEAD
    i18n.changeLanguage(newLang);   // ESTA ESTÁ BIEN
    localStorage.setItem("i18nextLng", newLang);
  };

  useEffect(() => {
    setLang(i18nextInstance.language);
  }, [i18nextInstance.language]);

  return (
    <select
      value={lang}
      onChange={handleChange}
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
