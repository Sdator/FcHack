import Shuru from "./components/Shuru/index.vue";
import Infiles from "./components/InFiles.vue";

let AUI = {};

// 安装插件
AUI.install = function (Vue) {
  // 全局注册组件库
  Vue.component(Shuru.name, Shuru);
  Vue.component(Infiles.name, Infiles);
};

export default AUI;
