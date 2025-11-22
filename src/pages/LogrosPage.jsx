import React from 'react';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import { motion } from 'framer-motion';

const LogrosPage = ({
  logEntries,
  setLogEntries,
  isModalOpen,
  setIsModalOpen,
  handleAddLogEntry,
  playSuccess,
  t
}) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        {t('logros.title')}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        {t('logros.description')}
      </p>
      <div className="flex justify-center mb-8">
        <Button onClick={() => setIsModalOpen(true)} variant="success">
          {t('logros.add_button')}
        </Button>
      </div>
      {logEntries.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {t('logros.empty_state')}
          </p>
        </Card>
      ) : (
        // ESTA ES LA LÍNEA CLAVE. ¡YA ES PERFECTA!
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {logEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden relative group">
              <button
                onClick={() => {
                  if (window.confirm(t('logros.confirm_delete'))) {
                    setLogEntries(prevEntries => prevEntries.filter(e => e.id !== entry.id));
                    playSuccess();
                  }
                }}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                title={t('logros.delete_button')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-2 border-4 border-double border-gray-300 dark:border-gray-600">
                {entry.image ? (
                  <img src={entry.image} alt="Logro" className="h-full w-full object-cover rounded" />
                ) : (
                  <span className="text-6xl">{entry.icon || '🏆'}</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {entry.text}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg"
          >
            <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('logros.modal_title')}</h4>
            <form onSubmit={handleAddLogEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('logros.form_label')}</label>
                <textarea
                  name="text"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder={t('logros.form_placeholder')}
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('logros.image_label')}</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>{t('logros.cancel_button')}</Button>
                <Button type="submit">{t('logros.save_button')}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LogrosPage;