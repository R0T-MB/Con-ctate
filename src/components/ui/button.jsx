import React from 'react';
import { useSound } from '../../hooks/useSound'; // <-- Importamos el hook
import clickSound from '../../assets/sounds/click.mp3'; // <-- Importamos el sonido

// Definimos variantes de estilo para nuestro botón (antes del componente)
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  success: 'bg-green-500 hover:bg-green-600 text-white',
};

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const { play: playClick } = useSound(clickSound); // <-- Usamos el hook

  const handleClick = () => {
    playClick(); // <-- Reproducimos el sonido
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick} // <-- Usamos nuestra nueva función
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;