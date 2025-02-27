import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'pf7prh',
  component: {    
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
  e2e: { 
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173'
    
  }
})
