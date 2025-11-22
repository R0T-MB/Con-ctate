// src/components/QuotesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const QuotesSection = () => {
  const { t } = useTranslation();

  const quotes = [
    {
      textKey: 'quotes.lofas.text1',
      authorKey: 'quotes.lofas.author',
      bookKey: 'quotes.lofas.book1',
    },
    {
      textKey: 'quotes.lofas.text2',
      authorKey: 'quotes.lofas.author',
      bookKey: 'quotes.lofas.book2',
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t('quotes.title', 'Sabiduría de Expertos')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-purple-500"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
                "{t(quote.textKey, 'Cita inspiradora.')}"
              </p>
              <footer>
                <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
                  - {t(quote.authorKey, 'Autor')}
                </p>
                <p className="text-right text-sm text-gray-600 dark:text-gray-400">
                  {t(quote.bookKey, 'Libro')}
                </p>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;