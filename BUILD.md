# 构建工具选择指南

本项目支持两种构建方式：**Rollup** 和 **Vite**。你可以根据需要选择使用哪种工具进行打包。

## 📦 可用构建命令

```bash
# 使用 Rollup 构建（默认）
npm run build
# 或
npm run build:rollup

# 使用 Vite 构建
npm run build:vite

# 开发服务器（仅 Vite）
npm run dev
```

## ⚖️ Rollup vs Vite 对比

| 特性           | Rollup                   | Vite                       |
| -------------- | ------------------------ | -------------------------- |
| **构建速度**   | ⭐⭐⭐⭐⭐ 快            | ⭐⭐⭐⭐⭐ 快              |
|                | 增量构建，适合库开发     | 极速冷启动，适合应用开发   |
| **输出大小**   | ⭐⭐⭐⭐⭐ 更小          | ⭐⭐⭐⭐ 小                |
|                | 21 KB (ES) / 22 KB (UMD) | 8.6 KB (ES) / 6.8 KB (UMD) |
| **配置复杂度** | ⭐⭐⭐ 中等              | ⭐⭐ 简单                  |
|                | 需要手动配置多个插件     | 内置优化，零配置起步       |
| **插件生态**   | ⭐⭐⭐⭐⭐ 丰富          | ⭐⭐⭐⭐ 丰富              |
|                | 大量官方和社区插件       | 兼容 Rollup 插件           |
| **类型定义**   | 手动维护 (index.d.ts)    | 自动生成                   |
|                | 更灵活的控制             | 方便快捷                   |
| **CSS 处理**   | ✅ 内联到 JS             | ✅ 内联到 JS               |
| **适用场景**   | 库开发、需要精细控制     | 应用开发、快速原型         |

## 🎯 推荐使用场景

### 使用 Rollup 当你需要：

- ✨ 对打包过程有更精细的控制
- 📦 优化库的最终体积
- 🔧 自定义构建流程（如特殊的代码分割）
- 📝 需要手动控制类型定义
- 🎯 构建供他人使用的库

### 使用 Vite 当你需要：

- ⚡ 最快的构建速度
- 🚀 零配置快速开始
- 🔥 使用最新的前端特性
- 🎨 自动优化的构建结果
- 💡 更简单的配置维护

## 📊 构建输出对比

### Rollup 输出：

```
dist/
├── vue-seamless-autoscroll.es.js   (21 KB)
├── vue-seamless-autoscroll.umd.js  (22 KB)
└── index.d.ts                       (1.1 KB)
```

### Vite 输出：

```
dist/
├── vue-seamless-autoscroll.es.js   (8.6 KB)
├── vue-seamless-autoscroll.umd.js  (6.8 KB)
└── index.d.ts                       (自动生成)
```

## 🔧 配置文件

### Rollup 配置

- **文件**: `rollup.config.js`
- **功能**:
  - ES 和 UMD 双格式输出
  - CSS 注入到 JS
  - TypeScript 转译（跳过类型检查）
  - 手动维护的类型定义

### Vite 配置

- **文件**: `vite.config.ts`
- **功能**:
  - 库模式构建
  - 自动 CSS 注入
  - 自动类型定义生成
  - 开发服务器支持

## 🚀 快速开始

### Rollup 构建（推荐用于生产）：

```bash
npm run build
```

### Vite 构建（推荐用于快速开发）：

```bash
npm run build:vite
```

### 开发模式：

```bash
npm run dev
```

## 💡 注意事项

1. **默认构建**：`npm run build` 使用 Rollup（根据个人偏好设置）
2. **开发服务器**：仅 Vite 支持开发服务器（`npm run dev`）
3. **类型定义**:
   - Rollup: 使用 `packages/index.d.ts`（手动维护）
   - Vite: 自动生成类型定义
4. **CSS 处理**：两种方式都会将 CSS 内联到 JS 中

## 📖 如何选择？

```javascript
// 如果你偏好控制和高性能 → 使用 Rollup
npm run build:rollup

// 如果你偏好简单和快速 → 使用 Vite
npm run build:vite

// 默认（当前设置为 Rollup）
npm run build
```

## 🎯 结论

两种构建工具都非常优秀，选择取决于你的需求：

- **Rollup**: 更适合库开发，提供更高的灵活性和更好的优化
- **Vite**: 更适合应用开发，提供更好的开发体验和更快的构建速度

对于本项目（组件库），**Rollup** 是默认推荐的选择，因为它提供了更好的代码优化和更精细的构建控制。
