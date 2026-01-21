import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Use relative paths
    build: {
        outDir: 'docs', // Output to docs/ for GitHub Pages
        emptyOutDir: true
    }
});
