// src/components/auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient'; // <-- IMPORTA SUPABASE AQUÍ
import Card from '../ui/card';
import Button from '../ui/button';
import LanguageSelector from '../LanguageSelector';
import { useTheme } from '../../context/ThemeContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [message, setMessage] = useState(''); // Mensaje de éxito o error
  const [loading, setLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false); // Estado para controlar qué mostrar

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Efecto para comprobar si estamos en modo recuperación al cargar el componente
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type === 'recovery') {
      setIsRecoveryMode(true);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/app');
    } else {
      setMessage(result.error);
    }
  };

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (!accessToken) {
      setMessage('El enlace de restablecimiento no es válido o ha expirado.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw error;
      }

      setMessage('¡Tu contraseña ha sido restablecida con éxito!');
      setTimeout(() => {
        navigate('/login'); // Redirige a una página de login limpia
      }, 2000);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isRecoveryMode ? t('recoverPassword.title', 'Restablecer Contraseña') : t('login.title', 'Iniciar Sesión')}
        </h2>

        {message && <p className={`text-center text-sm mb-4 ${message.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

        {isRecoveryMode ? (
          // FORMULARIO DE RESTABLECIMIENTO
          <form onSubmit={handleRecoverySubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('recoverPassword.newPasswordLabel', 'Introduce tu nueva contraseña')}
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('general.loading', 'Guardando...') : t('recoverPassword.button', 'Restablecer Contraseña')}
            </Button>
          </form>
        ) : (
          // FORMULARIO DE LOGIN NORMAL
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full">
              {t('login.button', 'Entrar')}
            </Button>
          </form>
        )}

        {/* Enlace de "Olvidé mi contraseña" (solo se muestra en el modo de login) */}
        {!isRecoveryMode && (
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              {t('login.forgot_password', '¿Olvidaste tu contraseña?')}
            </Link>
          </div>
        )}

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