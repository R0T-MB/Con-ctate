// src/components/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // <-- CAMBIO AQUÍ: AÑADE useSearchParams A LA IMPORTACIÓN
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Card from '../ui/card';
import Button from '../ui/button';
import LanguageSelector from '../LanguageSelector';
import RecoverPasswordPage from './RecoverPasswordPage'; // <-- ASEGÚRATE DE QUE ESTE NOMBRE COINCIDA CON EL NOMBRE DE TU ARCHIVO

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // <-- LA LÓGICA AQUÍ ES CORRECTA
  const [searchParams] = useSearchParams();
  const recoveryType = searchParams.get('type');

  if (recoveryType === 'recovery') {
    return <RecoverPasswordPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/app');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
       {/* <div className="absolute top-4 right-4">  <-- COMENTA ESTA LÍNEA
        <LanguageSelector />                     <-- Y ESTA OTRA
      </div> */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {t('login.title', 'Iniciar Sesión')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('login.email_label', 'Email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder={t('login.email_placeholder', 'Introduce tu email')}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('login.password_label', 'Contraseña')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder={t('login.password_placeholder', 'Introduce tu contraseña')}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            {t('login.button', 'Entrar')}
          </Button>
        </form>

        {/* <-- ENLACE AÑADIDO AQUÍ */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            {t('login.forgot_password', '¿Olvidaste tu contraseña?')}
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('login.no_account', '¿Aún no tienes una cuenta?')}{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            {t('login.register_link', 'Regístrate aquí')}
          </Link>
        </p>
      </Card>
    </div>
  
);
};

export default LoginPage;