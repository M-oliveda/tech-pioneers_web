import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
      output: {
        // Asset file naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return "assets/images/[name]-[hash][extname]";
          } else if (/woff|woff2|ttf|eot/i.test(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    // Performance optimization
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Generate source maps for debugging (false for production)
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller bundles
    target: "es2020",
  },
  server: {
    port: 5173,
    host: true, // Needed for Docker
    strictPort: true,
    watch: {
      usePolling: true, // Needed for Docker volume mounting
    },
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
