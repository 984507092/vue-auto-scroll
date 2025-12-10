<template>
  <div
    class="custom-list"
    ref="scrollBodyRef"
    @mouseenter="mouseenterFunc"
    @mouseleave="mouseleaveFunc"
    @wheel.prevent="mousewheelFunc"
  >
    <!-- 包裹整体，用于 transform 滚动 -->
    <div
      class="scroll-content"
      :class="{ 'scroll-content-horizontal': isHorizontal }"
      :style="{ transform: transformStyle }"
    >
      <!-- 第一份内容 -->
      <div
        class="list-body"
        :class="{ 'list-horizontal': isHorizontal, 'manual-scroll': !isCanScroll }"
        ref="listBodyRef"
      >
        <template v-if="hasList">
          <div
            v-for="(item, index) in list"
            :key="getItemKey(item, index)"
            class="auto-scroll-item"
          >
            <!-- 可自定义渲染 item -->
            <slot name="scrollItem" :item="item" :index="index">
              {{ item }}
            </slot>
          </div>
        </template>

        <!-- 旧的 slot 渲染方式（兼容保留） -->
        <slot v-else></slot>
      </div>

      <!-- 第二份内容（无缝滚动用） -->
      <div
        v-if="isCanScroll && props.seamless"
        class="list-body"
        :class="{ 'list-horizontal': isHorizontal }"
        ref="tBodyRef"
      >
        <template v-if="hasList">
          <div
            v-for="(item, index) in list"
            :key="'copy-' + getItemKey(item, index)"
            class="auto-scroll-item"
          >
            <slot name="scrollItem" :item="item" :index="index">
              {{ item }}
            </slot>
          </div>
        </template>
        <slot v-else></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'vueSeamlessAutoscroll',
});

import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { debounce } from '../utils/debounce';

/**
 * 自动滚动组件（增强版）
 *
 * 支持：
 * - list 数组渲染 / slot 渲染
 * - 上下左右无缝滚动
 * - 悬停暂停 / 可配置是否自动继续
 * - 滚轮滚动
 * - 单步滚动 + 单行停顿时间
 * - 外部 start / stop / initData / resize 控制
 */

interface Props {
  /** 传入的列表数据 */
  list?: any[];

  /** 连续滚动速度（像素/帧） */
  steep?: number;

  /** 滚动方向 */
  scrollDirection?: 'top' | 'bottom' | 'left' | 'right';

  /** 是否允许滚轮滚动 */
  isRoller?: boolean;

  /** 滚轮滚动单位距离 */
  rollerScrollDistance?: number;

  /**
   * 鼠标移出时是否保持停止
   * - false：移出后自动继续滚动（默认）
   * - true：移出后保持暂停，需要手动调用 start()
   */
  isHoverStop?: boolean;

  /** item 的 key：字符串字段 或 函数 */
  itemKey?: string | ((item: any, index: number) => string | number);

  /** 是否自动开始滚动（挂载 / 数据变化后） */
  autoPlay?: boolean;

  /** 自动开始滚动的延迟时间（ms） */
  autoPlayDelay?: number;

  /**
   * 内容未超出容器时是否仍然强制滚动
   * - false：内容不超出则不自动滚动，只允许手动滚
   * - true：不管有没有超出都强制自动滚
   */
  forceScroll?: boolean;

  /**
   * 是否启用“单步滚动”模式
   * - false：连续平滑滚动
   * - true：每次滚动固定距离，然后停顿一段时间
   */
  isSingleStep?: boolean;

  /**
   * 单步滚动距离（px）
   * - 0 / 未设置：默认取第一行高度（或容器高度）
   */
  singleStepDistance?: number;

  /** 单步滚动后停顿时间（ms），仅 isSingleStep=true 时生效 */
  singleStepDelay?: number;

  /**
   * 是否开启无缝滚动
   * - true：渲染两份内容，实现无缝循环
   * - false：只渲染一份内容
   */
  seamless?: boolean;

  /**
   * 滚轮停止后自动恢复滚动的延迟（ms）
   * - 传 0 可立即恢复
   */
  wheelResumeDelay?: number;

  /**
   * 是否强制停止自动滚动
   * - true：不自动滚动，滚轮后也不自动恢复
   */
  alwaysStop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  list: undefined,
  steep: 0.5,
  scrollDirection: 'top',
  isRoller: true,
  rollerScrollDistance: 20,
  isHoverStop: false,
  itemKey: undefined,
  autoPlay: true,
  autoPlayDelay: 0,
  forceScroll: false,
  isSingleStep: false,
  singleStepDistance: 0,
  singleStepDelay: 1500,
  seamless: true,
  wheelResumeDelay: 300,
  alwaysStop: false,
});

defineSlots<{
  scrollItem?: (props: { item: any; index: number }) => any;
  default?: () => any;
}>();

// 是否使用 list，而不是 slot
const hasList = computed(() => Array.isArray(props.list));

/** 处理 item key */
const getItemKey = (item: any, index: number) => {
  if (!props.itemKey) return index;
  if (typeof props.itemKey === 'string') return item[props.itemKey] ?? index;
  return props.itemKey(item, index);
};

// refs
const scrollBodyRef = ref<HTMLElement | null>(null);
const listBodyRef = ref<HTMLElement | null>(null);
const tBodyRef = ref<HTMLElement | null>(null);

// 尺寸和偏移值
const scrollDistance = ref(0);
const bodyHeight = ref(0);
const bodyWidth = ref(0);
const listHeight = ref(0);
const listWidth = ref(0);
const itemSize = ref(0);

const isStop = ref(false);
const animationFrame = ref<number | null>(null);
const isCanScroll = ref(true);
const lastTimestamp = ref<number | null>(null);

// 单步模式的定时器、延迟定时器
const stepTimer = ref<number | null>(null);
const delayTimer = ref<number | null>(null);
const wheelTimer = ref<number | null>(null);

// 横向滚动？
const isHorizontal = computed(
  () => props.scrollDirection === 'left' || props.scrollDirection === 'right'
);

/** transform 样式 */
const transformStyle = computed(() =>
  isHorizontal.value
    ? `translate3d(${scrollDistance.value}px, 0, 0)`
    : `translate3d(0, ${scrollDistance.value}px, 0)`
);

/** 更新 item 尺寸（单行高度/宽度） */
const updateItemSize = () => {
  const body = listBodyRef.value;
  if (!body) {
    itemSize.value = 0;
    return;
  }
  const first = body.querySelector<HTMLElement>('.auto-scroll-item');
  if (!first) {
    itemSize.value = 0;
    return;
  }
  itemSize.value = isHorizontal.value ? first.offsetWidth : first.offsetHeight;
};

/** 同步更新尺寸（用于初始化，保证时序正确） */
const updateSizeSync = () => {
  const body = scrollBodyRef.value;
  const list = listBodyRef.value;

  bodyHeight.value = body?.clientHeight || 0;
  bodyWidth.value = body?.clientWidth || 0;
  listHeight.value = list?.clientHeight || 0;
  // 横向滚动时用 scrollWidth 获取实际内容宽度
  listWidth.value = isHorizontal.value ? list?.scrollWidth || 0 : list?.clientWidth || 0;

  updateItemSize();
};

/** 防抖更新尺寸（用于 resize 等频繁触发场景） */
const updateSize = debounce(updateSizeSync, 100);

/** 清理动画帧 */
const clearAnimation = () => {
  if (animationFrame.value !== null) {
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = null;
  }
  lastTimestamp.value = null;
};

/** 清理单步定时器 */
const clearStepTimer = () => {
  if (stepTimer.value !== null) {
    clearInterval(stepTimer.value);
    stepTimer.value = null;
  }
};

/** 清理延迟定时器 */
const clearDelayTimer = () => {
  if (delayTimer.value !== null) {
    clearTimeout(delayTimer.value);
    delayTimer.value = null;
  }
};

/** 清理滚轮恢复定时器 */
const clearWheelTimer = () => {
  if (wheelTimer.value !== null) {
    clearTimeout(wheelTimer.value);
    wheelTimer.value = null;
  }
};

const resetAllTimer = () => {
  clearAnimation();
  clearStepTimer();
  clearDelayTimer();
  clearWheelTimer();
};

/** 计算单步滚动距离 */
const getStepSize = () => {
  if (props.singleStepDistance && props.singleStepDistance > 0) {
    return props.singleStepDistance;
  }
  if (itemSize.value > 0) return itemSize.value;
  // 兜底：用可视区域高度/宽度做单步距离
  return isHorizontal.value ? bodyWidth.value : bodyHeight.value;
};

/** 连续滚动（requestAnimationFrame） */
const runContinuous = () => {
  clearAnimation();
  clearStepTimer();
  lastTimestamp.value = null;

  const listSize = isHorizontal.value ? listWidth.value : listHeight.value;
  if (!isCanScroll.value || props.steep === 0 || !listSize) return;

  const forward = ['top', 'left'].includes(props.scrollDirection);
  const speedPerMs = props.steep / (1000 / 60); // 将每帧速度换算成 ms 速度，掉帧时也能平滑

  const step = (timestamp: number) => {
    if (isStop.value) {
      lastTimestamp.value = null;
      return;
    }

    if (lastTimestamp.value === null) {
      lastTimestamp.value = timestamp;
    }

    const delta = timestamp - lastTimestamp.value;
    lastTimestamp.value = timestamp;

    const deltaDistance = speedPerMs * delta;
    let next = scrollDistance.value + (forward ? -deltaDistance : deltaDistance);

    // 无缝循环
    if (forward && next <= -listSize) {
      next += listSize;
    } else if (!forward && next >= 0) {
      next -= listSize;
    }

    scrollDistance.value = next;
    animationFrame.value = requestAnimationFrame(step);
  };

  animationFrame.value = requestAnimationFrame(step);
};

/** 单步滚动（间隔定时器） */
const startStepMode = () => {
  clearStepTimer();
  clearAnimation();

  const listSize = isHorizontal.value ? listWidth.value : listHeight.value;
  if (!isCanScroll.value || !listSize) return;

  const stepSize = getStepSize();
  if (!stepSize) return;

  const forward = ['top', 'left'].includes(props.scrollDirection);

  stepTimer.value = window.setInterval(() => {
    if (isStop.value) return;

    let next = scrollDistance.value + (forward ? -stepSize : stepSize);

    // 无缝循环
    if (forward && next <= -listSize) {
      next += listSize;
    } else if (!forward && next >= 0) {
      next -= listSize;
    }

    scrollDistance.value = next;
  }, props.singleStepDelay);
};

/** 开始滚动 */
const start = () => {
  if (props.alwaysStop) {
    return;
  }
  isStop.value = false;
  // 先清理所有定时器，确保干净启动
  resetAllTimer();

  if (!isCanScroll.value) return;

  if (props.isSingleStep) {
    startStepMode();
  } else {
    runContinuous();
  }
};

/** 停止滚动 */
const stop = () => {
  isStop.value = true;
  resetAllTimer();
};

/** 初始化 / 重新计算尺寸并决定是否滚动 */
const initData = async () => {
  resetAllTimer();
  isStop.value = false;
  scrollDistance.value = 0;
  isCanScroll.value = true;

  await nextTick();

  // 使用同步版本更新尺寸，确保时序正确
  updateSizeSync();

  // 如果尺寸为0，等待一段时间后重试（可能是动态加载内容）
  if (
    (bodyHeight.value === 0 || listHeight.value === 0) &&
    (bodyWidth.value === 0 || listWidth.value === 0)
  ) {
    await new Promise(resolve => setTimeout(resolve, 100));
    updateSizeSync();
  }

  const canVertical = listHeight.value > bodyHeight.value;
  const canHorizontal = listWidth.value > bodyWidth.value;
  const hasOverflow = canVertical || canHorizontal;

  isCanScroll.value = props.forceScroll || hasOverflow;

  // 初始化位置：向上/向左从 0 开始，向下/向右从 -listSize 开始
  const listSize = isHorizontal.value ? listWidth.value : listHeight.value;
  scrollDistance.value = ['top', 'left'].includes(props.scrollDirection) ? 0 : -listSize;

  if (isCanScroll.value && props.autoPlay && !props.alwaysStop) {
    if (props.autoPlayDelay > 0) {
      delayTimer.value = window.setTimeout(() => {
        start();
      }, props.autoPlayDelay);
    } else {
      start();
    }
  }
};

/** 鼠标悬停暂停（只停动画，保留当前位置） */
const mouseenterFunc = () => {
  isStop.value = true;
  resetAllTimer();
};

/** 鼠标移出恢复（立即重启动画，不依赖 autoPlay） */
const mouseleaveFunc = () => {
  if (props.isHoverStop || props.alwaysStop) return;
  // 直接调用 start()，它会处理 isStop 状态和启动逻辑
  start();
};

/** 滚轮滚动 */
const mousewheelFunc = (e: WheelEvent) => {
  if (!isCanScroll.value || !props.isRoller) return;

  // 手动滚动时暂停自动滚动，避免立即抢回控制权
  isStop.value = true;
  clearAnimation();
  clearStepTimer();
  clearWheelTimer();

  // 横向滚动时优先使用 deltaX，否则用 deltaY
  const delta = isHorizontal.value ? e.deltaX || e.deltaY : e.deltaY;
  scrollDistance.value += delta > 0 ? -props.rollerScrollDistance : props.rollerScrollDistance;

  if (props.alwaysStop) return;

  // 停止一段时间后自动恢复
  wheelTimer.value = window.setTimeout(() => {
    isStop.value = false;
    if (props.isSingleStep) {
      startStepMode();
    } else {
      runContinuous();
    }
  }, props.wheelResumeDelay);
};

onMounted(() => initData());
onUnmounted(() => resetAllTimer());

// 监听列表和配置变化，自动重新初始化
watch(
  () => props.list,
  () => {
    initData();
  },
  { deep: true }
);

watch(
  () => [props.scrollDirection, props.forceScroll, props.seamless, props.isSingleStep],
  () => {
    initData();
  }
);

// 调整速度时，保持当前位置重新启动动画
watch(
  () => props.steep,
  () => {
    if (props.alwaysStop) return;
    if (!isCanScroll.value) return;
    isStop.value = false;
    if (props.isSingleStep) {
      startStepMode();
    } else {
      runContinuous();
    }
  }
);

// 暴露给外部
defineExpose({
  start,
  stop,
  resize: updateSize,
  initData,
});
</script>

<style scoped lang="scss">
.custom-list {
  overflow: hidden;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  font-size: 14px;
}

.scroll-content {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.scroll-content-horizontal {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.list-body {
  overflow: hidden;
  white-space: nowrap;
}

/* 横向时让每份 list-body 变为横向 flex 容器（提高优先级） */
.scroll-content-horizontal .list-horizontal {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  overflow: visible;
}

/* 防止横向时 item 被压缩，确保逐个滚动 */
.scroll-content-horizontal .auto-scroll-item {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  margin: 0 12px;
}

/* 当 isCanScroll = false 时，允许手动滚动 */
.manual-scroll {
  overflow: auto;
}
</style>
