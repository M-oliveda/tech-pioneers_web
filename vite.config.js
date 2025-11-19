import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    // Enable modern ES module output
    modulePreload: {
      polyfill: false,
    },
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
        // Optimize manual chunks
        manualChunks: (id) => {
          // Separate vendor chunks for better caching
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      // Tree-shaking and dead code elimination
      treeshake: {
        preset: "recommended",
        moduleSideEffects: false,
      },
    },
    // Performance optimization with aggressive minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.warn", "console.info"],
        passes: 4,
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_methods: false,
        toplevel: true,
        keep_fargs: false,
        pure_getters: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        side_effects: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: false,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    // Generate source maps for debugging (false for production)
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    // CSS code splitting disabled for better compression
    cssCodeSplit: false,
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller bundles
    target: "es2020",
    // Inline small assets
    assetsInlineLimit: 4096,
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
  // CSS configuration with aggressive minification
  css: {
    devSourcemap: true,
    // PostCSS config is loaded from postcss.config.js
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [],
  },
});
