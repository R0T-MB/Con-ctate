import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

// Hook personalizado para reproducir sonidos fácilmente
export const useSound = (soundSrc, { volume = 1, loop = false } = {}) => {
  const soundRef = useRef(null);

  useEffect(() => {
    // Cargamos el sonido cuando el componente se monta
    soundRef.current = new Howl({
      src: [soundSrc],
      volume: volume,
      loop: loop,
      preload: true,
    });

    // Limpiamos el sonido cuando el componente se desmonta
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [soundSrc, volume, loop]);

  // Función para reproducir el sonido
  const play = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  return { play };
};