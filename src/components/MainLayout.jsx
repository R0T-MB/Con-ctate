// src/components/MainLayout.jsx
import '../index.css';
import Header from './Header';
import Tabs from './Tabs';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/button';
import Card from './ui/card';
import { consultarIa } from '../services/iaService.js';
import { useTranslation } from 'react-i18next';
import { useSound } from '../hooks/useSound';
import successSound from '../assets/sounds/success.mp3';
import unlockSound from '../assets/sounds/unlock.mp3';
import LogrosPage from '../pages/LogrosPage';
import { useAuth } from '../context/AuthContext';
import { saveUserProgress, loadUserProgress, updateTokenUsage } from '../services/databaseService';
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import ChatHistoryPage from './ChatHistoryPage';
import { saveChatEntry } from '../lib/chatHistory';
import toast from 'react-hot-toast';

// Definimos el límite diario de tokens
const DAILY_TOKEN_LIMIT = 5000;

function MainLayout() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("retos");
  const [retos, setRetos] = useState([]);
  const [info, setInfo] = useState([]);
  const [iaQuery, setIaQuery] = useState('');
  const [iaResponse, setIaResponse] = useState('');
  const [isIaLoading, setIsIaLoading] = useState(false);
  const [expandedReto, setExpandedReto] = useState(null);
  const [introStep, setIntroStep] = useState(1);
  const [hasSeenIntro] = useState(() => {
    return localStorage.getItem('conectate-hasSeenIntro') === 'true';
  });
  const [logEntries, setLogEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenUsage, setTokenUsage] = useState({ today: 0, limit: DAILY_TOKEN_LIMIT });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  // Si hay un usuario pero aún no ha visto la intro, llévalo a la intro.
  if (user && !hasSeenIntro) {
    setActiveTab("introduccion");
  }
}, [user, hasSeenIntro]);

  const [showHistory, setShowHistory] = useState(false); // <-- NUEVO ESTADO

  const { play: playSuccess } = useSound(successSound);
  const { play: playUnlock } = useSound(unlockSound);

  // ... (el resto de tus funciones y useEffects como debounce, loadProgress, etc. permanecen igual)
  const debouncedSaveProgress = useCallback(
    debounce((userId, progressData) => {
      if (!userId) return;
      saveUserProgress(userId, progressData).catch(err => {
        console.error('Error al guardar el progreso:', err);
      });
    }, 1000),
    []
  );

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    const progressData = {
      retos_progress: retos,
      info_data: info,
      log_entries: logEntries,
    };

    debouncedSaveProgress(user.id, progressData);
  }, [retos, info, logEntries, user?.id, debouncedSaveProgress]);

  const loadProgress = async () => {
    if (!user || !user.id) {
      console.error("loadProgress: No hay usuario o user.id es inválido.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await loadUserProgress(user.id);
      
      const mockDataRetos = Array.isArray(t('data.retos', { returnObjects: true })) 
        ? t('data.retos', { returnObjects: true }) 
        : [];
      const mockDataInfo = Array.isArray(t('data.info', { returnObjects: true }))
        ? t('data.info', { returnObjects: true })
        : [];

      if (result.success && result.data) {
        const { retos_progress, info_data, log_entries, token_usage } = result.data;
        
        let nuevosRetos;
        if (retos_progress && retos_progress.length > 0) {
          nuevosRetos = mockDataRetos.map(mockReto => {
            const savedReto = retos_progress.find(r => r.id === mockReto.id);
            if (savedReto) {
              return {
                ...mockReto,
                completado: savedReto.completado,
                locked: savedReto.locked,
                pasos: mockReto.pasos.map(mockPaso => {
                  const savedPaso = savedReto.pasos?.find(p => p.id === mockPaso.id);
                  return savedPaso ? { ...mockPaso, completado: savedPaso.completado } : mockPaso;
                })
              };
            }
            return mockReto;
          });
        } else {
          nuevosRetos = mockDataRetos;
        }

        let nuevaInfo;
        if (info_data && Object.keys(info_data).length > 0) {
          nuevaInfo = mockDataInfo.map(mockItem => {
            const savedItem = info_data.find(i => i.id === mockItem.id);
            return savedItem ? { ...mockItem, respuesta: savedItem.respuesta } : mockItem;
          });
        } else {
          nuevaInfo = mockDataInfo;
        }
        
        const nuevosLogEntries = log_entries || [];
        
        setRetos(nuevosRetos);
        setInfo(nuevaInfo);
        setLogEntries(nuevosLogEntries);

        const today = new Date().toISOString().split('T')[0];
        const todayUsage = token_usage?.[today] || 0;
        setTokenUsage({ today: todayUsage, limit: DAILY_TOKEN_LIMIT });

      } else {
        console.error("No se pudo cargar el progreso del usuario:", result.error);
        
        setRetos(mockDataRetos);
        setInfo(mockDataInfo);
        setLogEntries([]);
      }
    } catch (err) {
      console.error('ERROR INESPERADO en loadProgress:', err);
      
      setRetos([]);
      setInfo([]);
      setLogEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      const timer = setTimeout(() => {
        loadProgress();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [user?.id, i18n.language]);

  const handleInfoChange = (id, nuevaRespuesta) => {
    setInfo(infoActual =>
      infoActual.map(item =>
        item.id === id ? { ...item, respuesta: nuevaRespuesta } : item
      )
    );
  };

  const handleCompletarPaso = (retoId, pasoId) => {
    setRetos(retosActuales => {
      let nuevosRetos = retosActuales.map(reto => {
        if (reto.id === retoId) {
          const nuevosPasos = reto.pasos.map(paso =>
            paso.id === pasoId ? { ...paso, completado: !paso.completado } : paso
          );
          const todosPasosCompletados = nuevosPasos.every(paso => paso.completado);

          if (todosPasosCompletados && !reto.completado) {
            playSuccess();
            return { ...reto, pasos: nuevosPasos, completado: true };
          } else {
            playSuccess();
            return { ...reto, pasos: nuevosPasos };
          }
        }
        return reto;
      });

      const retoRecienModificado = nuevosRetos.find(r => r.id === retoId);

      if (retoRecienModificado && retoRecienModificado.completado) {
        const siguienteReto = nuevosRetos.find(r => r.id === retoId + 1);
        if (siguienteReto && siguienteReto.locked) {
          playUnlock();
          nuevosRetos = nuevosRetos.map(r =>
            r.id === retoId + 1 ? { ...r, locked: false } : r
          );
        }
      }

      return nuevosRetos;
    });
  };

  const handleConsultarIa = async () => {
    if (!iaQuery.trim()) {
      return;
    }

    if (tokenUsage.today >= tokenUsage.limit) {
      setIaResponse(t('ia.limit_reached', `Has alcanzado tu límite de ${tokenUsage.limit} tokens por hoy. Por favor, vuelve mañana para seguir aprendiendo.`));
      return;
    }

    if (!user || !user.id) {
      setIaResponse(t('ia.auth_error', 'Debes iniciar sesión para usar esta función.'));
      return;
    }

    setIsIaLoading(true);
    setIaResponse('');

    try {
      const resultado = await consultarIa(iaQuery, info, i18n.language);

      if (resultado.success) {
        setIaResponse(resultado.data);

        try {
          const { error } = await saveChatEntry(iaQuery, resultado.data);
          if (error) {
            console.error("Error al guardar en el historial:", error);
            toast.error('La respuesta se generó, pero no se pudo guardar en el historial.');
          }
        } catch (historyError) {
          console.error("Error inesperado al guardar en el historial:", historyError);
          toast.error('Ocurrió un error inesperado al guardar la conversación.');
        }

        const tokensUsed = resultado.tokenUsage?.total || 0;
        if (tokensUsed > 0) {
          try {
            await updateTokenUsage(user.id, tokensUsed);
            setTokenUsage(prev => ({ ...prev, today: prev.today + tokensUsed }));
          } catch (err) {
            console.error('Error al actualizar el uso de tokens:', err);
          }
        }

      } else {
        let errorMessage = resultado.error;
        
        if (errorMessage.includes('overloaded') || errorMessage.includes('503')) {
          errorMessage = t('ia.error_overloaded', 'El servicio de IA está temporalmente saturado. Por favor, espera un momento e inténtalo de nuevo.');
        } else {
          errorMessage = `Error: ${errorMessage}`;
        }
        
        setIaResponse(errorMessage);
      }
    } catch (error) {
      console.error('Error inesperado en la IA:', error);
      setIaResponse(`Error inesperado: ${error.message}`);
    } finally {
      setIsIaLoading(false);
    }
  };

  const handleAddLogEntry = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get('text');
    const imageFile = formData.get('image');

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      text: text,
      image: null,
      icon: '🎉',
    };

    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newEntry.image = reader.result;
        setLogEntries(prevEntries => [newEntry, ...prevEntries]);
      };
      reader.onerror = () => {
        console.error('Error al leer la imagen');
        setLogEntries(prevEntries => [newEntry, ...prevEntries]);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setLogEntries(prevEntries => [newEntry, ...prevEntries]);
    }

    setIsModalOpen(false);
    playSuccess();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      // ... (los casos "introduccion", "retos" permanecen igual)
      case "introduccion":
        // ... (código de introducción)
        if (hasSeenIntro) {
          return null;
        }
        return (
          <div className="flex justify-center">
            <Card className="max-w-2xl mx-auto text-center">
              <motion.div key={introStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                {introStep === 1 && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('intro.welcome_title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t('intro.welcome_text')}</p>
                    <div className="text-6xl mb-4">🙏</div>
                  </>
                )}
                {introStep === 2 && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('intro.guide_title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t('intro.guide_text')}</p>
                    <div className="text-6xl mb-4">🧭</div>
                  </>
                )}
                {introStep === 3 && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('intro.how_works_title')}</h2>
                    <div className="text-left space-y-4 max-w-md mx-auto">
                      <div className="flex items-center space-x-3"><span className="text-2xl">🎯</span><p><strong>{t('retos.title')}</strong></p></div>
                      <div className="flex items-center space-x-3"><span className="text-2xl">🤖</span><p><strong>{t('ia.title')}</strong></p></div>
                      <div className="flex items-center space-x-3"><span className="text-2xl">📝</span><p><strong>{t('info.title')}</strong></p></div>
                    </div>
                  </>
                )}
                {introStep === 4 && (
                  <>
                    <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">{t('intro.ready_title')}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t('intro.ready_text')}</p>
                    <div className="text-6xl mb-4">🚀</div>
                  </>
                )}
                <div className="flex justify-between items-center mt-8">
                  {introStep > 1 && <Button variant="secondary" onClick={() => setIntroStep(introStep - 1)}>{t('intro.previous')}</Button>}
                  <div></div>
                  {introStep < 4 ? <Button onClick={() => setIntroStep(introStep + 1)}>{t('intro.next')}</Button> : <Button variant="success" onClick={() => { localStorage.setItem('conectate-hasSeenIntro', 'true'); setActiveTab("retos"); }}>{t('intro.start')}</Button>}
                </div>
              </motion.div>
            </Card>
          </div>
        );
      case "retos":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {retos.map((reto) => (
              <Card
                key={reto.id}
                className={`${reto.color} ${reto.locked ? 'opacity-40 grayscale' : ''} ${reto.completado ? 'ring-2 ring-green-500' : ''} transition-all duration-300`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{reto.titulo}</h3>
                  <div className="flex items-center space-x-2">
                    {reto.completado && <span className="text-green-600 text-2xl">✅</span>}
                    {reto.locked && <span className="text-gray-500 text-2xl">🔒</span>}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{reto.desc}</p>
                {expandedReto === reto.id && !reto.locked && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} className="mt-4 space-y-2">
                    {reto.pasos.map((paso) => (
                      <div key={paso.id} onClick={() => handleCompletarPaso(reto.id, paso.id)} className="flex items-center space-x-3 p-2 rounded-lg bg-white dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                        <span className={`text-2xl ${paso.completado ? 'text-green-500' : 'text-gray-400'}`}>{paso.completado ? '✓' : '○'}</span>
                        <p className={`${paso.completado ? 'line-through text-gray-500' : ''}`}>{paso.texto}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
                <div className="mt-4 flex justify-end">
                  {reto.locked ? (
                    <Button disabled className="w-full sm:w-auto">{t('retos.button_locked')}</Button>
                  ) : reto.completado ? (
                    <Button variant="secondary" className="w-full sm:w-auto">{t('retos.button_completed')}</Button>
                  ) : (
                    <Button onClick={() => setExpandedReto(expandedReto === reto.id ? null : reto.id)} className="w-full sm:w-auto">
                      {expandedReto === reto.id ? t('retos.button_hide') : t('retos.button_start')}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        );
      
      // <-- MODIFICACIÓN PRINCIPAL AQUÍ
      case "ia":
        return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto lg:max-w-6xl xl:max-w-7xl">
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  {/* Header con título, botón de historial e indicador de tokens */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('ia.title')}
                      </h2>
                      {/* <-- NUEVO BOTÓN PARA VER HISTORIAL */}
                      <Button
                        variant="secondary"
                        onClick={() => setShowHistory(!showHistory)}
                        className="text-sm"
                      >
                        {showHistory ? '💬 Volver al Chat' : '🕐 Ver Historial'}
                      </Button>
                    </div>
                    
                    {/* Indicador de uso de tokens mejorado */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          {t('ia.usage_display', { today: tokenUsage.today, limit: tokenUsage.limit })}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((tokenUsage.today / tokenUsage.limit) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        {tokenUsage.today / tokenUsage.limit > 0.8 
                          ? t('ia.near_limit')
                          : t('ia.remaining_tokens', { remaining: tokenUsage.limit - tokenUsage.today })}
                      </p>
                    </div>
                  </div>

                  {/* <-- RENDERIZADO CONDICIONAL */}
                  {showHistory ? (
                    <ChatHistoryPage />
                  ) : (
                    <>
                      {/* Texto introductorio mejorado */}
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                          {t("ia.some_text")}
                        </p>
                      </div>

                      {/* Área de texto con botones de acción */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="ia-query" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('ia.query_label')}
                          </label>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setIaQuery('')}
                              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              {t('ia.clear')}
                            </button>
                          </div>
                        </div>
                        <textarea
                          id="ia-query"
                          value={iaQuery}
                          onChange={(e) => setIaQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              e.preventDefault();
                              handleConsultarIa();
                            }
                          }}
                          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                          placeholder={t('ia.placeholder')}
                          rows={window.innerWidth < 768 ? 6 : 10}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('ia.press_ctrl_enter')}
                        </p>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {iaQuery.length} {t('ia.characters')}
                        </div>
                        <Button
                          onClick={handleConsultarIa}
                          variant="success"
                          className="px-6 py-2"
                          disabled={isIaLoading || !iaQuery.trim()}
                        >
                          {isIaLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {t("ia.thinking")}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                              {t("ia.button")}
                            </span>
                          )}
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Respuesta de IA mejorada (solo se muestra si no se muestra el historial) */}
                  {iaResponse && !showHistory && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="border-l-4 border-blue-500 bg-white dark:bg-gray-800 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                            {t("ia.response_title")}
                          </h4>
                          <button
                            onClick={() => navigator.clipboard.writeText(iaResponse)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title={t('ia.copy_response')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                            {iaResponse}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => setIaQuery('')}
                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {t('ia.ask_another')}
                          </button>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        );

      case "info":
        // ... (código de info)
        return (
          <div className="max-w-2xl mx-auto">
            <Card>
              <h3 className="text-3xl font-bold text-center mb-2 text-blue-600 dark:text-blue-400">{t('info.title')}</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">{t('info.description')}</p>
              <div className="space-y-4">
                {info.map((item) => (
                  <div key={item.id}>
                    <label htmlFor={`question-${item.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.pregunta}</label>
                    <input type="text" id={`question-${item.id}`} value={item.respuesta} onChange={(e) => handleInfoChange(item.id, e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={t('info.placeholder')} />
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-green-600 dark:text-green-400">✅ Tus respuestas se guardan automáticamente y se usan para personalizar tu experiencia.</p>
              </div>
            </Card>
          </div>
        );

      case "comunidad":
        // ... (código de comunidad)
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('comunidad.title')}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{t('comunidad.description')}</p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('comunidad.ready_title')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">(La notificación por email llegará en una futura actualización)</p>
              </div>
            </Card>
          </div>
        );

      case "logros":
        return (
          <LogrosPage logEntries={logEntries} setLogEntries={setLogEntries} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleAddLogEntry={handleAddLogEntry} playSuccess={playSuccess} t={t} />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (hasSeenIntro && activeTab === "introduccion") {
      setActiveTab("retos");
    }
  }, [hasSeenIntro, activeTab]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pb-20">
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 p-6"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">© 2025 Conéctate – Desarrollado con ❤️ por RM</footer>
    </div>
  );
}

export default MainLayout;