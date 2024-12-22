import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 8080,
        https: {
            cert: fs.readFileSync(path.join(__dirname, 'keys/cert.crt')),
            key: fs.readFileSync(path.join(__dirname, 'keys/cert.key'))
        },
        cors: true,
        open: true,
    },
    build: {
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
    }
})