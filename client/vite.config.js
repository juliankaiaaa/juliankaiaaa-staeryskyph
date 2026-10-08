import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Only the production build needs a sub-path, for GitHub Pages. The deploy
// workflow sets VITE_BASE_PATH to the repository name; dev always serves from /.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? (process.env.VITE_BASE_PATH ?? '/juliankaiaaa-staeryskyph/') : '/',
}))
