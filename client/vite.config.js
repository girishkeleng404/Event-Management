import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/auth': {
        target: 'http://localhost:4000', // Your backend server
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:4000', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  
})
