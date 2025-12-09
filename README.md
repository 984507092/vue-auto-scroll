# vue3-auto-scroll

English | [简体中文](#vue3-auto-scroll-中文文档)

A Vue 3 auto scroll component with seamless loop, hover pause, wheel control, and single step mode support.

[简体中文文档](#vue3-auto-scroll-1)

## Features

- ✅ **Seamless Loop** - Continuous scrolling without interruption
- ✅ **Multiple Directions** - Support top/bottom/left/right scrolling
- ✅ **Hover Pause** - Pause on mouse enter, resume on leave
- ✅ **Wheel Control** - Manual scroll with mouse wheel
- ✅ **Single Step Mode** - Scroll by fixed distance with delay
- ✅ **Flexible Data** - Support array data or slot content
- ✅ **Full TypeScript** - Written in TypeScript with complete type definitions
- ✅ **Flexible Control** - Expose methods for external control

## Installation

```bash
npm install vue3-auto-scroll
```

## Usage

### Global Registration

```typescript
import { createApp } from 'vue';
import Vue3AutoScroll from 'vue3-auto-scroll';
import App from './App.vue';

const app = createApp(App);
app.use(Vue3AutoScroll);

// Or with options
app.use(Vue3AutoScroll, {
  name: 'CustomAutoScroll', // Custom component name
});
```

### Local Registration

```vue
<script setup>
import { Vue3AutoScroll } from 'vue3-auto-scroll';
</script>
```

### Basic Example

```vue
<template>
  <div class="scroll-container">
    <Vue3AutoScroll :list="listData" :steep="1">
      <template #scrollItem="{ item, index }">
        <div class="scroll-item">
          {{ item.title }}
        </div>
      </template>
    </Vue3AutoScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Vue3AutoScroll } from 'vue3-auto-scroll';

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

### Slot Mode (Without List Data)

```vue
<template>
  <Vue3AutoScroll :steep="0.5" scroll-direction="left">
    <div class="notice-item">Notice 1</div>
    <div class="notice-item">Notice 2</div>
    <div class="notice-item">Notice 3</div>
  </Vue3AutoScroll>
</template>
```

### Horizontal Scroll Example

```vue
<template>
  <Vue3AutoScroll
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
  </Vue3AutoScroll>
</template>

<style>
.horizontal-scroll {
  width: 100%;
  height: 50px;
  white-space: nowrap;
}

.horizontal-item {
  display: inline-block;
  padding: 0 20px;
  line-height: 50px;
}
</style>
```

### External Control Example

```vue
<template>
  <div>
    <button @click="startScroll">Start</button>
    <button @click="stopScroll">Stop</button>
    <button @click="resetScroll">Reset</button>

    <Vue3AutoScroll ref="scrollRef" :list="dataList" :auto-play="false" :steep="1.5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3AutoScroll } from 'vue3-auto-scroll'

const scrollRef = ref(null)
const dataList = ref([...])

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

## API Reference

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
<Vue3AutoScroll>
  <div>Custom content 1</div>
  <div>Custom content 2</div>
  <div>Custom content 3</div>
</Vue3AutoScroll>
```

### Exposed Methods

Access via template ref:

```vue
<template>
  <Vue3AutoScroll ref="scrollRef" :list="data" />
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
import type { Vue3AutoScroll, InstallOptions } from 'vue3-auto-scroll'

interface MyItem {
  id: number
  title: string
}

const items = ref<MyItem[]>([...])
```

## Styles

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

// For horizontal scrolling
.list-body2 {
  display: inline-block;
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)

## License

MIT

---

# vue3-auto-scroll (中文文档)

Vue 3 自动无缝滚动组件，支持悬停暂停、滚轮控制、单步滚动等多种功能。

## 特性

- ✅ **无缝循环** - 连续滚动无停顿
- ✅ **多方向支持** - 支持上下左右滚动
- ✅ **悬停暂停** - 鼠标移入暂停，移出恢复
- ✅ **滚轮控制** - 支持鼠标滚轮手动滚动
- ✅ **单步模式** - 固定距离滚动并停顿
- ✅ **灵活的数据** - 支持数组数据或插槽内容
- ✅ **完整 TypeScript** - 使用 TypeScript 编写，提供完整类型定义
- ✅ **灵活控制** - 暴露方法供外部控制

## 安装

```bash
npm install vue3-auto-scroll
```

## 使用

### 全局注册

```typescript
import { createApp } from 'vue';
import Vue3AutoScroll from 'vue3-auto-scroll';
import App from './App.vue';

const app = createApp(App);
app.use(Vue3AutoScroll);

// 或使用选项
app.use(Vue3AutoScroll, {
  name: 'CustomAutoScroll', // 自定义组件名称
});
```

### 局部注册

```vue
<script setup>
import { Vue3AutoScroll } from 'vue3-auto-scroll';
</script>
```

### 基础示例

```vue
<template>
  <div class="scroll-container">
    <Vue3AutoScroll :list="listData" :steep="1">
      <template #scrollItem="{ item, index }">
        <div class="scroll-item">
          {{ item.title }}
        </div>
      </template>
    </Vue3AutoScroll>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Vue3AutoScroll } from 'vue3-auto-scroll';

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

### 插槽模式（不使用数组数据）

```vue
<template>
  <Vue3AutoScroll :steep="0.5" scroll-direction="left">
    <div class="notice-item">通知 1</div>
    <div class="notice-item">通知 2</div>
    <div class="notice-item">通知 3</div>
  </Vue3AutoScroll>
</template>
```

### 横向滚动示例

```vue
<template>
  <Vue3AutoScroll
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
  </Vue3AutoScroll>
</template>

<style>
.horizontal-scroll {
  width: 100%;
  height: 50px;
  white-space: nowrap;
}

.horizontal-item {
  display: inline-block;
  padding: 0 20px;
  line-height: 50px;
}
</style>
```

### 外部控制示例

```vue
<template>
  <div>
    <button @click="startScroll">开始</button>
    <button @click="stopScroll">停止</button>
    <button @click="resetScroll">重置</button>

    <Vue3AutoScroll ref="scrollRef" :list="dataList" :auto-play="false" :steep="1.5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3AutoScroll } from 'vue3-auto-scroll'

const scrollRef = ref(null)
const dataList = ref([...])

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

## API 参考 (中文)

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

#### `scrollItem` 作用域插槽

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
<Vue3AutoScroll>
  <div>自定义内容 1</div>
  <div>自定义内容 2</div>
  <div>自定义内容 3</div>
</Vue3AutoScroll>
```

### 暴露的方法

通过模板 ref 访问：

```vue
<template>
  <Vue3AutoScroll ref="scrollRef" :list="data" />
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
import type { Vue3AutoScroll, InstallOptions } from 'vue3-auto-scroll'

interface MyItem {
  id: number
  title: string
}

const items = ref<MyItem[]>([...])
```

## 样式

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

// 横向滚动
.list-body2 {
  display: inline-block;
}
```

## 浏览器支持

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- IE11+（需要 polyfill）

## 许可证

MIT
