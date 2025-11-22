// src/components/PurposeSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PurposeSection = () => {
  const { t } = useTranslation();

  const quotes = [
    {
      textKey: 'purpose.quote1.text',
      authorKey: 'purpose.quote1.author',
    },
    {
      textKey: 'purpose.quote2.text',
      authorKey: 'purpose.quote2.author',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('purpose.title', 'Más que una App, un Puente Hacia la Conexión')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('purpose.subtitle', 'Creemos que cada familia reconstituida tiene un potencial único para crecer y florecer. Nuestro propósito es darte las herramientas para construir una base de confianza, respeto y amor duradero.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-blue-500"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
                "{t(quote.textKey, 'Frase inspiradora sobre la familia.')}"
              </p>
              <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
                - {t(quote.authorKey, 'Autor')}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {t('purpose.resources.title', 'Recursos para tu Viaje')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              📖 Guías Prácticas
            </span>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              🤖 Asistente de IA Personalizado
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
              🏆 Muro de Logros Compartidos
            </span>
            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
              💬 Comunidad de Apoyo
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PurposeSection;