import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
        alias: {
            '@uiw/react-markdown-preview/dist/markdown.css': fileURLToPath(
                new URL('./node_modules/@uiw/react-markdown-preview/dist/markdown.css', import.meta.url)
            ),
        },
    },
})
