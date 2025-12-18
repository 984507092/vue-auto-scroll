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

### Custom Item Styling

```vue
<template>
  <!-- Using CSS class -->
  <VueSeamlessAutoscroll :list="listData" item-class="custom-item">
    <template #scrollItem="{ item }">
      {{ item.title }}
    </template>
  </VueSeamlessAutoscroll>

  <!-- Using multiple classes -->
  <VueSeamlessAutoscroll :list="listData" :item-class="['item-base', 'item-highlight']">
    <template #scrollItem="{ item }">
      {{ item.title }}
    </template>
  </VueSeamlessAutoscroll>

  <!-- Using inline style object -->
  <VueSeamlessAutoscroll
    :list="listData"
    :item-style="{ padding: '20px', backgroundColor: '#f5f5f5' }"
  >
    <template #scrollItem="{ item }">
      {{ item.title }}
    </template>
  </VueSeamlessAutoscroll>

  <!-- Using inline style string -->
  <VueSeamlessAutoscroll :list="listData" item-style="padding: 20px; background-color: #f5f5f5;">
    <template #scrollItem="{ item }">
      {{ item.title }}
    </template>
  </VueSeamlessAutoscroll>
</template>

<style>
.custom-item {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.item-base {
  padding: 15px;
}

.item-highlight {
  border-left: 3px solid #1890ff;
}
</style>
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
| `itemClass`            | `string \| string[]`                                         | `undefined` | Custom CSS class(es) for scroll items                  |
| `itemStyle`            | `Record<string, any> \| string`                              | `undefined` | Custom inline style for scroll items                   |

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

## ❓ FAQ

### Q: Horizontal scrolling doesn't work automatically?

**A:** For horizontal scrolling (`scroll-direction="left"` or `"right"`), you may need to set `:force-scroll="true"` to force enable scrolling. This is because the browser's overflow detection for horizontal content can be affected by CSS flexbox layouts.

```vue
<!-- Horizontal scrolling with force-scroll enabled -->
<VueSeamlessAutoscroll
  :list="horizontalData"
  scroll-direction="left"
  :force-scroll="true"
  :steep="2"
>
</VueSeamlessAutoscroll>
```

If your horizontal content still doesn't scroll, check:

1. Ensure the container has a fixed width
2. Ensure child elements have proper `display: inline-block` or `flex: 0 0 auto`
3. Ensure `white-space: nowrap` is applied to horizontal content

## 📄 License

MIT

---

## 🤝 Contributing

Welcome to submit Issues and Pull Requests!

## 📝 Changelog

### v1.2.0

- ✅ Add `itemClass` prop for custom CSS classes on scroll items
- ✅ Add `itemStyle` prop for custom inline styles on scroll items
- ✅ Fix memory leak issue in single-step mode (clear reset timers properly)
- ✅ Optimize step transition timing with constant extraction

### v1.1.0

- ✅ Bundle CSS into JS (no longer need to import CSS separately)
- ✅ Add FAQ section to document horizontal scrolling requirements
- ✅ Optimize build configuration with `vite-plugin-css-injected-by-js`

### v1.0.0

- ✅ Initial release with seamless scrolling, hover pause, wheel control, and single-step mode
- ✅ Multiple directions support
- ✅ Flexible data support (array or slot)
- ✅ Full TypeScript support
