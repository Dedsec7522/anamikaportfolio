import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from https://dedsec7522.github.io/anamikaportfolio/
  // Change this to '/' if it moves to its own domain.
  base: '/anamikaportfolio/',
  plugins: [react()],
})
