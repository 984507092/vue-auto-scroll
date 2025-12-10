import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import vue from '@vitejs/plugin-vue';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

// 基础插件配置
const basePlugins = [
  vue(),
  nodeResolve({
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    browser: true,
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.build.json',
    clean: true,
    check: false, // 禁用类型检查，只进行转译
  }),
  postcss({
    // 将 CSS 注入到 JS 中
    inject: true,
    minimize: isProduction,
  }),
];

// 生产环境添加压缩
if (isProduction) {
  basePlugins.push(terser());
}

export default [
  // ES Module 构建
  {
    input: resolve(__dirname, 'packages/index.ts'),
    external: ['vue'],
    plugins: basePlugins,
    output: {
      file: resolve(__dirname, 'dist/vue-seamless-autoscroll.es.js'),
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
  },

  // UMD 构建
  {
    input: resolve(__dirname, 'packages/index.ts'),
    external: ['vue'],
    plugins: basePlugins,
    output: {
      file: resolve(__dirname, 'dist/vue-seamless-autoscroll.umd.js'),
      format: 'umd',
      name: 'VueSeamlessAutoscroll',
      globals: {
        vue: 'Vue',
      },
      exports: 'named',
      sourcemap: false,
    },
  },

  // 类型定义构建
  {
    input: resolve(__dirname, 'packages/index.d.ts'),
    external: ['vue'],
    plugins: [dts()],
    output: {
      file: resolve(__dirname, 'dist/index.d.ts'),
      format: 'es',
    },
  },
];
