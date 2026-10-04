import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the project from a subfolder instead of the root.
// Using the repository name here makes sure the built assets load correctly
// from https://juliankiaaaa.github.io/juliankiaaaa-staeryskyph/
export default defineConfig({
  plugins: [react()],
  base: '/juliankiaaaa-staeryskyph/',
  server: {
    // Only used by `npm run dev`. It is NOT part of the production build,
    // which is why the deployed site needs CORS and this does not.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})