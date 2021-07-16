import { createApp } from "vue";
import App from "./App.vue";

// 安装插件
import AUI from "./libs/AUI/index.js";

// 使用插件
createApp(App).use(AUI).mount("#app");
