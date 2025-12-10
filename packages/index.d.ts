import type { App, DefineComponent } from 'vue';

export interface InstallOptions {
  name?: string;
}

export const VueSeamlessAutoscroll: DefineComponent<
  {
    list?: any[];
    steep?: number;
    scrollDirection?: 'top' | 'bottom' | 'left' | 'right';
    isRoller?: boolean;
    rollerScrollDistance?: number;
    isHoverStop?: boolean;
    itemKey?: string | ((item: any, index: number) => string | number);
    autoPlay?: boolean;
    autoPlayDelay?: number;
    forceScroll?: boolean;
    isSingleStep?: boolean;
    singleStepDistance?: number;
    singleStepDelay?: number;
    seamless?: boolean;
    wheelResumeDelay?: number;
    alwaysStop?: boolean;
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    start: () => void;
    stop: () => void;
    initData: () => void;
    resize: () => void;
  }
>;

export interface VueSeamlessAutoscrollPlugin {
  install: (app: App, options?: InstallOptions) => void;
}

const plugin: VueSeamlessAutoscrollPlugin;
export default plugin;
