// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import LandingPage from './components/LandingPage'; // <-- 1. IMPORTA LA LANDING PAGE
import MainLayout from './components/MainLayout';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import TestRoute from './TestRoute'; // <-- AÑADE ESTA IMPORTACIÓN
import TestDestination from './TestDestination';
import RegistrationSuccessPage from './components/auth/RegistrationSuccessPage'; 

// Componente para proteger rutas. Si no hay usuario, redirige a la landing page.
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (!user) {
    // <-- 2. REDIRIGE A LA LANDING PAGE EN VEZ DE /LOGIN
    return <Navigate to="/" />; 
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} /> {/* <-- 3. NUEVA RUTA PRINCIPAL */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/test-route" element={<TestRoute />} />
        <Route path="/test-destination" element={<TestDestination />} />
        <Route path="/registration-success" element={<RegistrationSuccessPage />} />
        {/* Ruta Protegida para el resto de la aplicación */}
        <Route
          path="/app/*" // <-- 4. CAMBIA EL PATH A /app/*
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto para cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;