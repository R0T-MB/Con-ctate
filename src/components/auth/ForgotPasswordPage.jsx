// src/components/auth/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabaseClient';
import Button from '../ui/button';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Redirige al usuario a esta página después de resetear la contraseña
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        throw error;
      }

      setMessage(t('forgotPassword.success', 'Revisa tu correo electrónico para restablecer tu contraseña.'));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {t('forgotPassword.title', 'Restablecer Contraseña')}
        </h3>
        <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              {t('forgotPassword.label', 'Introduce tu correo electrónico')}
            </label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              {t('forgotPassword.backToLogin', 'Volver al inicio de sesión')}
            </Link>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? t('general.loading', 'Enviando...') : t('forgotPassword.button', 'Enviar enlace')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;