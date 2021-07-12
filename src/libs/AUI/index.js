import Shuru from "./Shuru/index.vue";

let AUI = {};

// 注册组件库
AUI.install = function (Vue) {
  Vue.component(Shuru.name, Shuru);
};

export default AUI;
