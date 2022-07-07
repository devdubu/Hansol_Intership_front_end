import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    overlay:false,
    port: 3000,
    contentBase:'.',
    proxy:{
      '/api': 'http://10.1.9.80:8080'
      }
    }
  })
