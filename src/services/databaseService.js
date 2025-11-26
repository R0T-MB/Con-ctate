// src/services/databaseService.js
import { supabase } from '../lib/supabaseClient';

// --- NUEVA FUNCIÓN PARA ACTUALIZAR EL USO DE TOKENS ---
export const updateTokenUsage = async (userId, tokensToUse) => {
  if (!userId || tokensToUse <= 0) {
    console.error("updateTokenUsage: Datos de entrada inválidos.");
    return { success: false };
  }

  try {
    // Obtenemos el uso de tokens actual del usuario
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('token_usage')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    let currentUsage = profile?.token_usage || {};

    // Sumamos los tokens de la consulta de hoy al total
    currentUsage[today] = (currentUsage[today] || 0) + tokensToUse;

    // Actualizamos el uso de tokens en la base de datos
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        token_usage: currentUsage,
        updated_at: new Date().toISOString(),
      });

    if (updateError) {
      throw updateError;
    }

    console.log(`✅ Uso de tokens actualizado para el usuario ${userId}: +${tokensToUse} tokens hoy.`);
    return { success: true, newUsage: currentUsage };

  } catch (error) {
    console.error('❌ Error al actualizar el uso de tokens:', error);
    return { success: false, error: error.message };
  }
};


// Función para guardar el progreso del usuario en la tabla 'profiles'
export const saveUserProgress = async (userId, progressData) => {
  // --- IMPORTANTE: Separamos el uso de tokens del resto del progreso ---
  // El uso de tokens se actualiza al instante con updateTokenUsage, no con debounce.
  const { token_usage, ...dataToSave } = progressData;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        user_id: userId,
        ...dataToSave,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Error al guardar el progreso:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error inesperado en saveUserProgress:', err);
    return { success: false, error: err.message };
  }
};

// Función para cargar el progreso del usuario desde la tabla 'profiles'
export const loadUserProgress = async (userId) => {
  if (!userId) {
    console.error('loadUserProgress: No se proporcionó un userId.');
    return { success: false, error: 'Falta el ID de usuario.' };
  }

  
  const { data, error } = await supabase
    .from('profiles')
    // --- NUEVO: Añadimos token_usage a la consulta ---
    .select('retos_progress, info_data, log_entries, token_usage')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log('ℹ️ Perfil no encontrado para el usuario. Devolviendo datos vacíos.');
      return { 
        success: true, 
        data: { 
          retos_progress: [], 
          info_data: {}, 
          log_entries: [],
          token_usage: {} // <-- NUEVO: Devolvemos un objeto vacío
        } 
      };
    }
    console.error('Error al cargar el progreso:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};