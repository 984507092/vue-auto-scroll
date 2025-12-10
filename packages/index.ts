import type { App } from 'vue';
import Vue3AutoScroll from './Vue3AutoScroll/Vue3AutoScroll.vue';

interface InstallOptions {
  name?: string;
}

export default {
  install: (app: App, options: InstallOptions = {}) => {
    app.component(options.name || Vue3AutoScroll.name || 'Vue3AutoScroll', Vue3AutoScroll);
  },
};

export { Vue3AutoScroll };

export type { InstallOptions };
