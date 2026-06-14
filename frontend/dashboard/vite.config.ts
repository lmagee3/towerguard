import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,        // HUDDLE owns 5173 — TowerGuard runs on 5174
    strictPort: true,  // Fail instead of silently picking another port
  },
})
