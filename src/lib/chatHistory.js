// src/lib/chatHistory.js
import { supabase } from './supabaseClient';

/**
 * Guarda una nueva entrada en el historial de chat del usuario actual.
 * @param {string} question - La pregunta del usuario.
 * @param {string} answer - La respuesta de la IA.
 * @returns {object} - Un objeto con los datos guardados o un error.
 */
export const saveChatEntry = async (question, answer) => {
  try {
    // La columna user_id se llenará automáticamente gracias al valor por defecto `auth.uid()`
    const { data, error } = await supabase
      .from('chat_history')
      .insert([
        { question, answer }
      ]);

    if (error) {
      console.error('Error saving chat entry:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Unexpected error in saveChatEntry:', error);
    return { error };
  }
};

/**
 * Obtiene todo el historial de chat del usuario autenticado.
 * @returns {object} - Un objeto con el array del historial o un error.
 */
export const fetchChatHistory = async () => {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .order('created_at', { ascending: false }); // Ordena del más nuevo al más antiguo

    if (error) {
      console.error('Error fetching chat history:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Unexpected error in fetchChatHistory:', error);
    return { error };
  }
};