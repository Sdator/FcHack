import { createApp } from "vue";
import App from "./App.vue";

// 安装插件
import AUI from "./libs/AUI/index.js";
import MDUI from "mdui";

// 把 api 挂载到全局中
import myapi from "./libs/api.js";
window.myapi = myapi;

// 使用插件 use(AUI)
const vm = createApp(App).use(AUI).use(MDUI).mount("#app");

console.log("VM:", vm);
