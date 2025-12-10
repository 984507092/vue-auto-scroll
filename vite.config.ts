import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    // 将 CSS 注入到 JS 中，避免生成单独的 style.css 文件
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      outDir: 'dist/types',
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'VueSeamlessAutoscroll',
      fileName: format => `vue-seamless-autoscroll.${format}.js`,
      formats: ['es', 'umd'],
    },
    // 将组件样式内联到 JS 中，使用方无需再单独 import CSS。
    // 如需独立 CSS，请改为 cssCodeSplit: true 并提示使用方引入 dist/style.css。
    cssCodeSplit: false,
    sourcemap: false,
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
        // 当 cssCodeSplit 为 false 时，无需配置 assetFileNames
      },
    },
  },
  // SASS 预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
