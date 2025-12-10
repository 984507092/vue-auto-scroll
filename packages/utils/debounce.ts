/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 延迟的毫秒数
 * @returns 防抖后的函数
 *
 * @example
 * const debouncedFn = debounce(() => {
 *   console.log('我将延迟 300ms 执行')
 * }, 300)
 *
 * // 触发多次debouncedFn，只有最后一次会在300ms后执行
 * debouncedFn()
 * debouncedFn()
 * debouncedFn()
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: number | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as T;
}

export default debounce;
