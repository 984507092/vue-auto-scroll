# vue-seamless-autoscroll

<div align="center">

🚀 **A powerful Vue 3 auto scroll component with seamless loop**

[![npm version](https://badge.fury.io/js/vue-seamless-autoscroll.svg)](https://badge.fury.io/js/vue-seamless-autoscroll)
[![license](https://img.shields.io/npm/l/vue-seamless-autoscroll.svg)](https://github.com/984507092/vue-auto-scroll/blob/master/LICENSE)

</div>

<div align="center">

**Languages:** [English](./README.md) | [简体中文](./README.zh-CN.md)

</div>

---

## Features

- ✅ **Seamless Loop** - Continuous scrolling without interruption
- ✅ **Multiple Directions** - Support top/bottom/left/right scrolling
- ✅ **Hover Pause** - Pause on mouse enter, resume on leave
- ✅ **Wheel Control** - Manual scroll with mouse wheel
- ✅ **Single Step Mode** - Scroll by fixed distance with delay
- ✅ **Flexible Data** - Support array data or slot content
- ✅ **Full TypeScript** - Written in TypeScript with complete type definitions
- ✅ **Flexible Control** - Expose methods for external control
- ✅ **Smart Detection** - Automatically detect overflow content
- ✅ **Lightweight** - No external dependencies (except Vue)

---

## 📦 Installation

```bash
npm install vue-seamless-autoscroll
```

Or with other package managers:

```bash
# using yarn
yarn add vue-seamless-autoscroll

# using pnpm
pnpm add vue-seamless-autoscroll
```

## 🔨 Quick Start

### Global Registration

```typescript
import { createApp } from 'vue';
import VueSeamlessAutoscroll from 'vue-seamless-autoscroll';

const app = createApp(App);
app.use(VueSeamlessAutoscroll);

// Or with custom component name
app.use(VueSeamlessAutoscroll, {
  name: 'VueSeamlessAutoscroll', // Custom component name
});
```

### Local Registration

```vue
<script setup>
import { VueSeamlessAutoscroll } from 'vue-seamless-autoscroll';
</script>
```

## 📝 Basic Usage

### Using List Data

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
import { VueSeamlessAutoscroll } from 'vue-seamless-autoscroll';

const listData = ref([
  { title: 'Item 1', id: 1 },
  { title: 'Item 2', id: 2 },
  { title: 'Item 3', id: 3 },
  // ...more items
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

### Using Slot (Without List)

```vue
<template>
  <div class="scroll-container">
    <VueSeamlessAutoscroll :steep="0.5" scroll-direction="left">
      <div class="notice-item">Notice 1</div>
      <div class="notice-item">Notice 2</div>
      <div class="notice-item">Notice 3</div>
    </VueSeamlessAutoscroll>
  </div>
</template>
```

### Horizontal Scrolling

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

### External Control

```vue
<template>
  <div>
    <button @click="startScroll">Start</button>
    <button @click="stopScroll">Stop</button>
    <button @click="resetScroll">Reset</button>

    <VueSeamlessAutoscroll ref="scrollRef" :list="data" :auto-play="false" :steep="1.5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueSeamlessAutoscroll } from 'vue-seamless-autoscroll'

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

## 📚 API Reference

### Props

| Prop                   | Type                                                         | Default     | Description                                            |
| ---------------------- | ------------------------------------------------------------ | ----------- | ------------------------------------------------------ |
| `list`                 | `any[]`                                                      | `undefined` | Data array for scroll items. Leave empty for slot mode |
| `steep`                | `number`                                                     | `0.5`       | Scroll speed (pixels per frame)                        |
| `scrollDirection`      | `'top' \| 'bottom' \| 'left' \| 'right'`                     | `'top'`     | Scroll direction                                       |
| `isRoller`             | `boolean`                                                    | `true`      | Enable mouse wheel control                             |
| `rollerScrollDistance` | `number`                                                     | `20`        | Mouse wheel scroll distance                            |
| `isHoverStop`          | `boolean`                                                    | `false`     | Keep stopped after mouse leave                         |
| `itemKey`              | `string \| ((item: any, index: number) => string \| number)` | `undefined` | Item key for list rendering                            |
| `autoPlay`             | `boolean`                                                    | `true`      | Auto start scroll on mount                             |
| `autoPlayDelay`        | `number`                                                     | `0`         | Delay before auto start (ms)                           |
| `forceScroll`          | `boolean`                                                    | `false`     | Force scroll even if content not overflow              |
| `isSingleStep`         | `boolean`                                                    | `false`     | Enable single step mode                                |
| `singleStepDistance`   | `number`                                                     | `0`         | Single step distance (px). `0` means auto calculate    |
| `singleStepDelay`      | `number`                                                     | `1500`      | Delay between steps (ms)                               |
| `seamless`             | `boolean`                                                    | `true`      | Enable seamless loop                                   |
| `wheelResumeDelay`     | `number`                                                     | `300`       | Resume delay after wheel scroll (ms)                   |
| `alwaysStop`           | `boolean`                                                    | `false`     | Always stop auto scroll                                |

### Slots

#### `scrollItem` (Scoped Slot)

Used when `list` prop is provided.

```vue
<template #scrollItem="{ item, index }">
  <!-- Custom item content -->
</template>
```

| Slot Prop | Type     | Description        |
| --------- | -------- | ------------------ |
| `item`    | `any`    | Current item data  |
| `index`   | `number` | Current item index |

#### `default` Slot

Used when `list` prop is not provided.

```vue
<VueSeamlessAutoscroll>
  <div>Custom content 1</div>
  <div>Custom content 2</div>
  <div>Custom content 3</div>
</VueSeamlessAutoscroll>
```

### Methods

Access via template ref:

```vue
<template>
  <VueSeamlessAutoscroll ref="scrollRef" :list="data" />
</template>

<script setup>
const scrollRef = ref(null);

// Example: scrollRef.value?.start()
</script>
```

| Method       | Description                                        |
| ------------ | -------------------------------------------------- |
| `start()`    | Start scrolling                                    |
| `stop()`     | Stop scrolling                                     |
| `initData()` | Reinitialize component (recalculate size, restart) |
| `resize()`   | Recalculate sizes manually                         |

### TypeScript Support

Full TypeScript support with type definitions:

```typescript
import { VueSeamlessAutoscroll } from 'vue-seamless-autoscroll';

interface MyItem {
  id: number;
  title: string;
}

const items = ref<MyItem[]>([...]);
```

## 🎨 Styling

The component includes minimal default styles. You can override them:

```scss
// Container
.custom-list {
  // Your custom styles
}

// Scroll content wrapper
.scroll-content {
  // Your custom styles
}

// Content body
.list-body {
  // Your custom styles
}

/* For horizontal scrolling */
.list-content-horizontal {
  display: flex;
  flex-direction: row;
}
```

## 🔧 Advanced Usage

### Smart Overflow Detection

The component automatically detects if content overflows the container and only enables scrolling when necessary:

```vue
<!-- This will only scroll if content exceeds container height -->
<VueSeamlessAutoscroll :list="items">
  <!-- content -->
</VueSeamlessAutoscroll>
```

### Force Scroll Mode

Use `force-scroll` to enable scrolling regardless of content size:

```vue
<!-- Always scroll, even if content fits -->
<VueSeamlessAutoscroll :list="items" :force-scroll="true">
  <!-- content -->
</VueSeamlessAutoscroll>
```

### Debounce Utility

v1.0.1+ provides a debounce utility function:

```typescript
import { debounce } from 'vue-seamless-autoscroll/utils';

const debouncedFn = debounce(() => {
  console.log('I will be executed after 300ms delay');
}, 300);
```

## 📄 License

MIT

---

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

## 📝 Changelog

### v1.0.1

- ✅ Fix: Improved overflow detection logic, no need for `forceScroll: true`
- ✅ New: Added debounce utility function
- ✅ Improvement: Separated Chinese and English documentation

### v1.0.0

- ✅ Initial release with seamless scrolling, hover pause, wheel control, and single-step mode
- ✅ Multiple directions support
- ✅ Flexible data support (array or slot)
- ✅ Full TypeScript support
