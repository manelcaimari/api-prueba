const { defineConfig } = require('vite')

export default defineConfig({
  base: '/front',
  server: {
    port: 5177
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      input: '/src/index.js'
    }
  }
})
