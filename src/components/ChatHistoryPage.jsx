// src/components/ChatHistoryPage.jsx
import { useState, useEffect } from 'react';
import { fetchChatHistory } from '../lib/chatHistory';
import toast from 'react-hot-toast';

function ChatHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      const { data, error } = await fetchChatHistory();

      if (error) {
        toast.error('No se pudo cargar el historial.');
        console.error(error);
      } else {
        setHistory(data || []);
      }
      setLoading(false);
    };

    getHistory();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-600">Cargando historial...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tu Historial de Conversaciones</h1>
      {history.length === 0 ? (
        <p className="text-gray-500 bg-white p-4 rounded-lg shadow">Aún no tienes conversaciones guardadas. ¡Empieza a chatear para verlas aquí!</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <p className="text-xs text-gray-400 mb-3">{formatDate(entry.created_at)}</p>
              <div className="mb-3">
                <strong className="text-blue-600">Tú:</strong>
                <p className="text-gray-700 mt-1">{entry.question}</p>
              </div>
              <div>
                <strong className="text-green-600">IA:</strong>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">{entry.answer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatHistoryPage;