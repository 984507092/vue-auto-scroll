import type { App } from 'vue';
import VueSeamlessAutoscroll from './VueSeamlessAutoscroll/index.vue';

interface InstallOptions {
  name?: string;
}

export default {
  install: (app: App, options: InstallOptions = {}) => {
    app.component(
      options.name || VueSeamlessAutoscroll.name || 'VueSeamlessAutoscroll',
      VueSeamlessAutoscroll
    );
  },
};

export { VueSeamlessAutoscroll };

export type { InstallOptions };
