import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Creamos el contexto (el "megáfono")
const ThemeContext = createContext();

// 2. Creamos el "Proveedor" del tema. Es el componente que sostiene el megáfono.
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Al cargar, buscamos si el usuario ya tenía una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // 3. Efecto para aplicar la clase al <html> y guardar en localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Guardamos la preferencia del usuario para la próxima vez
    localStorage.setItem('theme', theme);
  }, [theme]);

  // La función que los componentes usarán para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Creamos un custom hook para que sea fácil usar el contexto en otros componentes
export const useTheme = () => {
  return useContext(ThemeContext);
};