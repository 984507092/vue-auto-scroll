import type { App } from 'vue';
import Vue3AutoScroll from './Vue3AutoScroll/Vue3AutoScroll.vue';

interface InstallOptions {
  name?: string;
}

const install = function (app: App, options: InstallOptions = {}) {
  app.component(options.name || Vue3AutoScroll.name || 'Vue3AutoScroll', Vue3AutoScroll);
};

export default function (app: App) {
  app.use(install as any);
}

export { Vue3AutoScroll };

export type { InstallOptions };
