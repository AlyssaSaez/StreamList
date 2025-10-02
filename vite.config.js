import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'StreamList',
        short_name: 'StreamList',
        description: 'A movie stream list PWA',
        theme_color: '#0e1025',
        icons: [
          {
            src: '/stream-favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/stream-favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/stream-favicon/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/stream-favicon/favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ],
})
