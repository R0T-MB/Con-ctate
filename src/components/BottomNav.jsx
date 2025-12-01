// src/components/BottomNav.jsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

// Importar CSS de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';

function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  const swiperRef = useRef(null);

  const tabs = [
    { id: 'introduccion', labelKey: 'nav.intro', icon: '🏠' },
    { id: 'retos', labelKey: 'nav.retos', icon: '🎯' },
    { id: 'ia', labelKey: 'nav.ia', icon: '🤖' },
    { id: 'info', labelKey: 'nav.info', icon: '📝' },
    { id: 'logros', labelKey: 'nav.logros', icon: '🏆' },
    { id: 'comunidad', labelKey: 'nav.comunidad', icon: '👥' },
  ];

  // Efecto para sincronizar el swiper con el estado activeTab
  React.useEffect(() => {
    if (swiperRef.current) {
      const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (activeIndex !== -1) {
        swiperRef.current.swiper.slideTo(activeIndex);
      }
    }
  }, [activeTab, tabs]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-t border-gray-200 dark:border-gray-700 md:hidden">
      <Swiper
        ref={swiperRef}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        onSlideChange={(swiper) => setActiveTab(tabs[swiper.activeIndex].id)}
        className="w-full h-full"
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.id} className="w-fit">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center text-sm py-3 px-4 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs mt-1">{t(tab.labelKey)}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  );
}

export default BottomNav;