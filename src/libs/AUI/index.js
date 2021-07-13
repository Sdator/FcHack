import Shuru from "./components/Shuru/index.vue";
import Infiles from "./components/InFiles.vue";

let AUI = {};

// 注册组件库
AUI.install = function (Vue) {
  Vue.component(Shuru.name, Shuru);
  Vue.component(Infiles.name, Infiles);
};

export default AUI;
