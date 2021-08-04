// import Shuru from "./components/Shuru/index.vue";
import ShuruEx from "./components/Shuru/index.vue";

// 返回一个对象给vue调用
const AUI = {};

// 定义插件 安装函数
AUI.install = function (Vue) {
  // 全局注册组件库
  // Vue.component(Shuru.name, Shuru);
  Vue.component(ShuruEx.name, ShuruEx);

  console.log(Vue, 222222);
};

export default AUI;
