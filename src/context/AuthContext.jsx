// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Crear el Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect que escucha los cambios de estado de autenticación de Supabase
  useEffect(() => {
    // Obtiene la sesión actual al cargar la aplicación
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Escucha los cambios de auth (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔐 onAuthStateChange disparado:', _event, session?.user?.id);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => subscription.unsubscribe();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Función de inicio de sesión con Supabase
  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }

    // No llamamos a setUser aquí. Confiamos en que onAuthStateChange lo hará.
    return { success: true, user: data.user };
  };

  // Función de registro con Supabase
  const register = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  };

  // Función para cerrar sesión con Supabase
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error al cerrar sesión:', error.message);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Crear un hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};