// src/components/auth/RecoverPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import Card from '../ui/card';
import Button from '../ui/button';

const RecoverPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    if (!accessToken || !refreshToken) {
      setError('El enlace de restablecimiento no es válido o ha expirado.');
    }
  }, [searchParams]);

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const accessToken = searchParams.get('access_token');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      setMessage('¡Tu contraseña ha sido restablecida con éxito!');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirige al login después de 2 segundos

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {t('recoverPassword.title', 'Restablecer Contraseña')}
        </h2>
        
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {!message && !error && (
          <form onSubmit={handleRecoverPassword} className="space-y-4">
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
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-indigo-600 hover:underline">
            {t('recoverPassword.backToLogin', 'Volver al inicio de sesión')}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RecoverPasswordPage;