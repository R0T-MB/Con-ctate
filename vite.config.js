// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy' // <-- 1. IMPORTA EL PLUGIN

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({ // <-- 2. AÑADE ESTE OBJETO A LA LISTA DE PLUGINS
      targets: [
        {
          src: 'public/_redirects', // El archivo de origen
          dest: '' // El destino es la raíz de la carpeta 'dist'
        }
      ]
    })
  ],
})