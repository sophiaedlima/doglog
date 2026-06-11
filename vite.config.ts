import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toda requisição que começar com /api será redirecionada
      // para o backend Spring Boot rodando na porta 8080.
      // Isso evita erros de CORS durante o desenvolvimento.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})