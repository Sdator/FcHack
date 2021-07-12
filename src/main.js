import { createApp } from "vue";
import App from "./App.vue";

// 导入组件
import AUI from "./libs/AUI/index.js";

// 使用组件
createApp(App).use(AUI).mount("#app");
