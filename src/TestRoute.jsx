import { Link } from 'react-router-dom';

const TestRoute = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Página de Prueba</h1>
      <p>Si ves esto, significa que las rutas funcionan.</p>
      <Link to="/test-destination" style={{ color: 'blue', textDecoration: 'underline' }}>
        Haz clic aquí para ir al destino de prueba.
      </Link>
    </div>
  );
};

export default TestRoute;