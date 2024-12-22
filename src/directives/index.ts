import type { App, Directive } from "vue";

const directives: Record<string, Directive> = {};

export default {
  install(app: App<Element>) {
    if (directives && Object.keys(directives).length > 0) {
      Object.keys(directives).forEach((key) => {
        app.directive(key, directives[key]);
      });
    }
  },
};
