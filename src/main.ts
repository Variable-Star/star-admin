import "./main.css";

import { createApp } from "vue";
import App from "./App.vue";
import directives from "./directives";
import lang from "./lang";
import router from "./router";
import pinia from "./stores";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(lang);
app.use(directives);

app.mount("#app");
