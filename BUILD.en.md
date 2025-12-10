# Build Tool Guide

This project supports two build tools: **Rollup** and **Vite**. You can choose which tool to use for bundling based on your needs.

## 📦 Available Build Commands

```bash
# Build with Rollup (default)
npm run build
# or
npm run build:rollup

# Build with Vite
npm run build:vite

# Development server (Vite only)
npm run dev
```

## ⚖️ Rollup vs Vite Comparison

| Feature               | Rollup                                    | Vite                                          |
| --------------------- | ----------------------------------------- | --------------------------------------------- |
| **Build Speed**       | ⭐⭐⭐⭐⭐ Fast                           | ⭐⭐⭐⭐⭐ Fast                               |
|                       | Incremental builds, great for libraries   | Lightning-fast cold start, great for apps     |
| **Output Size**       | ⭐⭐⭐⭐⭐ Smaller                        | ⭐⭐⭐⭐ Small                                |
|                       | 21 KB (ES) / 22 KB (UMD)                  | 8.6 KB (ES) / 6.8 KB (UMD)                    |
| **Config Complexity** | ⭐⭐⭐ Medium                             | ⭐⭐ Simple                                   |
|                       | Manual plugin configuration required      | Zero-config setup with built-in optimizations |
| **Plugin Ecosystem**  | ⭐⭐⭐⭐⭐ Rich                           | ⭐⭐⭐⭐ Rich                                 |
|                       | Many official and community plugins       | Compatible with Rollup plugins                |
| **Type Definitions**  | Manual maintenance (index.d.ts)           | Auto-generated                                |
|                       | More flexible control                     | Convenient and fast                           |
| **CSS Handling**      | ✅ Inlined to JS                          | ✅ Inlined to JS                              |
| **Use Cases**         | Library development, fine-grained control | Application development, rapid prototyping    |

## 🎯 Recommended Use Cases

### Use Rollup when you need:

- ✨ Fine-grained control over the bundling process
- 📦 Optimized final bundle size for libraries
- 🔧 Custom build processes (e.g., special code splitting)
- 📝 Manual control over type definitions
- 🎯 Building libraries for others to use

### Use Vite when you need:

- ⚡ The fastest build speed possible
- 🚀 Zero-config quick start
- 🔥 Use the latest frontend features
- 🎨 Automatically optimized build output
- 💡 Simpler configuration maintenance

## 📊 Build Output Comparison

### Rollup Output:

```
dist/
├── vue-seamless-autoscroll.es.js   (21 KB)
├── vue-seamless-autoscroll.umd.js  (22 KB)
└── index.d.ts                       (1.1 KB)
```

### Vite Output:

```
dist/
├── vue-seamless-autoscroll.es.js   (8.6 KB)
├── vue-seamless-autoscroll.umd.js  (6.8 KB)
└── index.d.ts                       (auto-generated)
```

## 🔧 Configuration Files

### Rollup Config

- **File**: `rollup.config.js`
- **Features**:
  - ES and UMD dual-format output
  - CSS injection into JS
  - TypeScript transpilation (skip type checking)
  - Manual type definitions

### Vite Config

- **File**: `vite.config.ts`
- **Features**:
  - Library mode builds
  - Automatic CSS injection
  - Auto-generated type definitions
  - Development server support

## 🚀 Quick Start

### Rollup Build (Recommended for Production):

```bash
npm run build
```

### Vite Build (Recommended for Rapid Development):

```bash
npm run build:vite
```

### Development Mode:

```bash
npm run dev
```

## 💡 Notes

1. **Default Build**: `npm run build` uses Rollup (set based on personal preference)
2. **Dev Server**: Only Vite supports development server (`npm run dev`)
3. **Type Definitions**:
   - Rollup: Uses `packages/index.d.ts` (manually maintained)
   - Vite: Auto-generates type definitions
4. **CSS Handling**: Both methods inline CSS to JS

## 📖 How to Choose?

```javascript
// If you prefer control and performance → Use Rollup
npm run build:rollup

// If you prefer simplicity and speed → Use Vite
npm run build:vite

// Default (currently set to Rollup)
npm run build
```

## 🎯 Conclusion

Both build tools are excellent. The choice depends on your needs:

- **Rollup**: Better for library development, offers higher flexibility and better optimization
- **Vite**: Better for application development, offers better DX and faster builds

For this project (component library), **Rollup** is the default recommended choice because it provides better code optimization and more fine-grained build control.
