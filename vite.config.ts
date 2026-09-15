import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Must match the GitHub Pages sub-path, or built asset URLs 404.
  base: '/React-Charting/',
})
