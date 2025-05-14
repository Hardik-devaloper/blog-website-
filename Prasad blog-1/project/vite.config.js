import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin/dashboard.html',
        login: 'login.html',
        signup: 'signup.html',
        post: 'post.html'
      }
    }
  }
})