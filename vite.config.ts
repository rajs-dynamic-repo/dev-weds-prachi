import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works at username.github.io/repo-name
// and at username.github.io without editing this file.
export default defineConfig({
  plugins: [react()],
  base: './',
})
