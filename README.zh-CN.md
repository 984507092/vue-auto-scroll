# vue-seamless-autoscroll

<div align="center">

🚀 **一个功能强大的 Vue 3 无缝自动滚动组件**

[![npm version](https://badge.fury.io/js/vue-seamless-autoscroll.svg)](https://badge.fury.io/js/vue-seamless-autoscroll)
[![license](https://img.shields.io/npm/l/vue-seamless-autoscroll.svg)](https://github.com/984507092/vue-auto-scroll/blob/master/LICENSE)

</div>

<div align="center">

**文档：** [English](./README.md) | [简体中文](./README.zh-CN.md)

</div>

---

## 功能特性

- ✅ **无缝循环** - 连续滚动无中断
- ✅ **多方向支持** - 支持上下左右滚动
- ✅ **悬停暂停** - 鼠标移入暂停，移出恢复
- ✅ **滚轮控制** - 支持鼠标滚轮手动滚动
- ✅ **单步模式** - 固定距离滚动并停顿
- ✅ **灵活的数据** - 支持数组数据或插槽内容
- ✅ **完整 TypeScript** - 使用 TypeScript 编写，提供完整类型定义
- ✅ **灵活控制** - 暴露方法供外部控制
- ✅ **智能检测** - 自动检测内容溢出
- ✅ **轻量级** - 无外部依赖（除 Vue 外）

---

## 📦 安装

```bash
npm install vue-seamless-autoscroll
```

或使用其他包管理器：

```bash
# 使用 yarn
yarn add vue-seamless-autoscroll

# 使用 pnpm
pnpm add vue-seamless-autoscroll
```

## 🔨 快速开始

### 全局注册

```typescript
import { createApp } from 'vue';
import VueSeamlessAutoscroll from 'vue-seamless-autoscroll';

const app = createApp(App);
app.use(VueSeamlessAutoscroll);

// 或使用自定义组件名
app.use(VueSeamlessAutoscroll, {
  name: 'VueSeamlessAutoscroll', // 自定义组件名称
});
```

### 局部注册

```vue
<script setup>
import VueSeamlessAutoscroll from 'vue-seamless-autoscroll';
</script>
```

## 📝 基础用法

### 使用列表数据

```vue
<template>
  <div class="scroll-container">
    <VueSeamlessAutoscroll :list="listData" :steep="1">
      <template #scrollItem="{ item, index }">
        <div class="scroll-item">
          {{ item.title }}
        </div>
      </template>
    </VueSeamlessAutoscroll>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueSeamlessAutoscroll from 'vue-seamless-autoscroll';

const listData = ref([
  { title: '项目 1', id: 1 },
  { title: '项目 2', id: 2 },
  { title: '项目 3', id: 3 },
  // ...更多数据
]);
</script>

<style>
.scroll-container {
  height: 400px;
  width: 100%;
}

.scroll-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}
</style>
```

### 使用插槽（不使用列表）

```vue
<template>
  <div class="scroll-container">
    <VueSeamlessAutoscroll :steep="0.5" scroll-direction="left">
      <div class="notice-item">公告 1</div>
      <div class="notice-item">公告 2</div>
      <div class="notice-item">公告 3</div>
    </VueSeamlessAutoscroll>
  </div>
</template>
```

### 横向滚动

```vue
<template>
  <VueSeamlessAutoscroll
    :list="horizontalData"
    scroll-direction="left"
    :steep="2"
    class="horizontal-scroll"
  >
    <template #scrollItem="{ item }">
      <div class="horizontal-item">
        {{ item.text }}
      </div>
    </template>
  </VueSeamlessAutoscroll>
</template>

<style>
.horizontal-scroll {
  width: 100%;
  height: 50px;
  overflow: hidden;
}

.horizontal-item {
  display: inline-block;
  padding: 0 20px;
  line-height: 50px;
  white-space: nowrap;
}
</style>
```

### 外部控制

```vue
<template>
  <div>
    <button @click="startScroll">开始滚动</button>
    <button @click="stopScroll">停止滚动</button>
    <button @click="resetScroll">重置位置</button>

    <VueSeamlessAutoscroll ref="scrollRef" :list="data" :auto-play="false" :steep="1.5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueSeamlessAutoscroll from 'vue-seamless-autoscroll'

const scrollRef = ref(null)
const data = ref([...])

const startScroll = () => {
  scrollRef.value?.start()
}

const stopScroll = () => {
  scrollRef.value?.stop()
}

const resetScroll = () => {
  scrollRef.value?.initData()
}
</script>
```

## 📚 API 参考

### Props

| 参数                   | 类型                                                         | 默认值      | 说明                                 |
| ---------------------- | ------------------------------------------------------------ | ----------- | ------------------------------------ |
| `list`                 | `any[]`                                                      | `undefined` | 滚动数据数组，不传则使用插槽模式     |
| `steep`                | `number`                                                     | `0.5`       | 滚动速度（像素/帧）                  |
| `scrollDirection`      | `'top' \| 'bottom' \| 'left' \| 'right'`                     | `'top'`     | 滚动方向                             |
| `isRoller`             | `boolean`                                                    | `true`      | 是否启用鼠标滚轮控制                 |
| `rollerScrollDistance` | `number`                                                     | `20`        | 鼠标滚轮滚动距离                     |
| `isHoverStop`          | `boolean`                                                    | `false`     | 鼠标移出后是否保持停止               |
| `itemKey`              | `string \| ((item: any, index: number) => string \| number)` | `undefined` | 列表项的 key                         |
| `autoPlay`             | `boolean`                                                    | `true`      | 挂载后是否自动开始滚动               |
| `autoPlayDelay`        | `number`                                                     | `0`         | 自动开始前的延迟时间（毫秒）         |
| `forceScroll`          | `boolean`                                                    | `false`     | 内容未超出容器时是否强制滚动         |
| `isSingleStep`         | `boolean`                                                    | `false`     | 是否启用单步滚动模式                 |
| `singleStepDistance`   | `number`                                                     | `0`         | 单步滚动距离（像素），0 表示自动计算 |
| `singleStepDelay`      | `number`                                                     | `1500`      | 单步滚动后的停顿时间（毫秒）         |
| `seamless`             | `boolean`                                                    | `true`      | 是否开启无缝滚动                     |
| `wheelResumeDelay`     | `number`                                                     | `300`       | 滚轮停止后自动恢复滚动的延迟（毫秒） |
| `alwaysStop`           | `boolean`                                                    | `false`     | 是否强制停止自动滚动                 |

### 插槽

#### `scrollItem`（作用域插槽）

当提供 `list` 属性时使用。

```vue
<template #scrollItem="{ item, index }">
  <!-- 自定义项内容 -->
</template>
```

| 插槽参数 | 类型     | 说明       |
| -------- | -------- | ---------- |
| `item`   | `any`    | 当前项数据 |
| `index`  | `number` | 当前项索引 |

#### `default` 插槽

当不提供 `list` 属性时使用。

```vue
<VueSeamlessAutoscroll>
  <div>自定义内容 1</div>
  <div>自定义内容 2</div>
  <div>自定义内容 3</div>
</VueSeamlessAutoscroll>
```

### 方法

通过模板 ref 访问：

```vue
<template>
  <VueSeamlessAutoscroll ref="scrollRef" :list="data" />
</template>

<script setup>
const scrollRef = ref(null);

// 示例：scrollRef.value?.start()
</script>
```

| 方法         | 说明                                 |
| ------------ | ------------------------------------ |
| `start()`    | 开始滚动                             |
| `stop()`     | 停止滚动                             |
| `initData()` | 重新初始化组件（重新计算尺寸并重启） |
| `resize()`   | 手动重新计算尺寸                     |

### TypeScript 支持

完整的 TypeScript 支持：

```typescript
import type { VueSeamlessAutoscroll } from 'vue-seamless-autoscroll';

interface MyItem {
  id: number;
  title: string;
}

const items = ref<MyItem[]>([...]);
```

## 🎨 样式自定义

组件包含最小化的默认样式，你可以覆盖它们：

```scss
// 容器
.custom-list {
  // 自定义样式
}

// 滚动内容包装器
.scroll-content {
  // 自定义样式
}

// 内容主体
.list-body {
  // 自定义样式
}

/* 横向滚动 */
.list-content-horizontal {
  display: flex;
  flex-direction: row;
}
```

## 🔧 高级用法

### 智能溢出检测

组件自动检测内容是否超出容器，仅在需要时启用滚动：

```vue
<!-- 仅在内容超出容器高度时滚动 -->
<VueSeamlessAutoscroll :list="items">
  <!-- 内容 -->
</VueSeamlessAutoscroll>
```

### 强制滚动模式

使用 `force-scroll` 无论内容大小都启用滚动：

```vue
<!-- 即使内容合适也始终滚动 -->
<VueSeamlessAutoscroll :list="items" :force-scroll="true">
  <!-- 内容 -->
</VueSeamlessAutoscroll>
```

### 防抖函数工具

v1.0.1+ 版本提供了防抖工具函数：

```typescript
import { debounce } from 'vue-seamless-autoscroll/utils';

const debouncedFn = debounce(() => {
  console.log('我将延迟 300ms 执行');
}, 300);
```

## 📄 许可证

MIT

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 更新日志

### v1.0.1

- ✅ 修复：改进溢出检测逻辑，无需 `forceScroll: true` 即可正确检测
- ✅ 新增：防抖工具函数
- ✅ 优化：分离中英文文档

### v1.0.0

- ✅ 初始版本，支持无缝滚动、悬停暂停、滚轮控制、单步模式
