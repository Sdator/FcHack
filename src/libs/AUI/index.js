import Shuru from "./components/Shuru/index.vue";
// import Shuru from "./components/Shuru/indexEX.vue";

// 返回一个对象给vue调用
const AUI = {};

// 安装插件
AUI.install = function (Vue) {
  // 全局注册组件库
  Vue.component(Shuru.name, Shuru);
};

export default AUI;
