import { fileURLToPath, URL } from 'url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({mode}:any) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    server: {
      origin: process.env.VITE_APP_URL,
      host: '0.0.0.0',
      port: process.env.VITE_APP_PORT?parseInt(process.env.VITE_APP_PORT):80
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
