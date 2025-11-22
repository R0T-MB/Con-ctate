// src/components/FinalCTASection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from './ui/button';

const FinalCTASection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('finalCTA.title', '¿Listo para Fortalecer tu Vínculo?')}
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t('finalCTA.subtitle', 'Únete a nuestra comunidad y empieza a construir recuerdos inolvidables hoy mismo. Tu viaje familiar espera.')}
          </p>
          <Button
            onClick={() => navigate('/register')}
            variant="secondary"
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
          >
            {t('finalCTA.button', 'Únete a Conéctate')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;