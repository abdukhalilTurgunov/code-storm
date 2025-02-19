import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173, // Или любой другой порт, на котором работает Vite
    strictPort: true,
    open: false,
    cors: true,
    allowedHosts: ['.ngrok-free.app'] // Разрешаем ngrok-домены
  }
});