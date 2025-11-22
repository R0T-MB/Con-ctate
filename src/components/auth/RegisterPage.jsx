// src/components/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Card from '../ui/card';
import Button from '../ui/button';
import LanguageSelector from '../LanguageSelector';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // <-- NUEVO ESTADO
  const [showPassword, setShowPassword] = useState(false); // <-- NUEVO ESTADO
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // <-- NUEVA VALIDACIÓN
    if (password !== passwordConfirm) {
      setError(t('register.password_mismatch'));
      return; // Detenemos la función si las contraseñas no coinciden
    }
    
    const result = await register(email, password);
    
    if (result.success) {
      // Puedes redirigir a una página de "por favor, verifica tu email"
      // o directamente al login. Por ahora, vamos al login.
      navigate('/registration-success');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {t('register.title', 'Crear Cuenta')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.email_label', 'Email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder={t('register.email_placeholder', 'Introduce tu email')}
            />
          </div>
          
          {/* <-- CAMPO DE CONTRASEÑA MODIFICADO */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.password_label', 'Contraseña')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // <-- TIPO DINÁMICO
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder={t('register.password_placeholder', 'Crea una contraseña segura')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // <-- FUNCIÓN TOGGLE
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {/* Ícono del ojo */}
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* <-- NUEVO CAMPO DE CONFIRMACIÓN */}
          <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('register.password_confirm_label', 'Confirmar Contraseña')}
            </label>
            <input
              type="password"
              id="password-confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder={t('register.password_placeholder', 'Crea una contraseña segura')}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            {t('register.button', 'Registrarse')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('register.have_account', '¿Ya tienes una cuenta?')}{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            {t('register.login_link', 'Inicia sesión aquí')}
          </Link>
        </p>
      </Card>
    </div>
  
);
};

export default RegisterPage;