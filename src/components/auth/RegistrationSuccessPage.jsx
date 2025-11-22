// src/components/auth/RegistrationSuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../ui/card';

const RegistrationSuccessPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {t('registrationSuccess.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('registrationSuccess.message')}
        </p>
        <Link
          to="/login"
          className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {t('registrationSuccess.goToLogin')}
        </Link>
      </Card>
    </div>
  );
};

export default RegistrationSuccessPage;