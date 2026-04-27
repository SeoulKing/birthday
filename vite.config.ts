import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 VITE_BASE_PATH=/repo-name/ 형태로 지정해 사용할 수 있습니다.
  base: process.env.VITE_BASE_PATH ?? '/',
})
