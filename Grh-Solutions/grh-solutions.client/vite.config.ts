import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:3000', // backend
        secure: false,
        ws: true,
      },
    },
    port: 5200, 
    host: '0.0.0.0',
  },
  define: {
    global: {},
  },
})
