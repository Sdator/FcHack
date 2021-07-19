<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <InFiles @blob="setBlob" />

    <Tab :blob="blob" />
  </div>
</template>

<script>
// 导入组件内部使用 不全局注册

import Tab from "./tab.vue";
import InFiles from "./inFiles.vue";

export default {
  // 逐渐名称
  name: "ShuruEx",
  // 注册组件
  components: {
    InFiles,
    Tab,
  },
  data() {
    return {
      blob: {},
    };
  },
  methods: {
    /**
     * 子组件往外发送的自定义事件
     * 得到拖放窗返回的二进制数据
     */
    setBlob(blob) {
      console.log("收到子组件数据", blob);
      this.blob = blob;
    },
  },
};
</script>




<style lang="scss" scoped>
// 总体框架
.shuru {
  // width: 1000px;
  height: 200px;
  margin: 50px auto;
  margin-left: 200px;
}
</style>>
