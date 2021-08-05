<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <InFiles :blob="blob" @outBlob="setBlob" @update="setDB" />
    <HexEdit :blob="blob" @upBlob="setBlob" />
    <Tab :blob="blob" :update="update" />
  </div>
  <by />
</template>

<script setup>
// 导入组件内部使用 不全局注册
// 在setup中可以直接导入插件使用 而不用设置componets
import Tab from "./TabList.vue";
import InFiles from "./inFiles.vue";
import HexEdit from "./十六进制组件.vue";
import InFileButton from "./打开文件按钮.vue";
import by from "./作者.vue";
import { ref } from "@vue/reactivity";
</script>



<script>
export default {
  // 全局注册 需要输入一下方便使用
  name: "ShuruEx",
  data() {
    return {
      blob: {},
      update: {}, // InFiles组件 导入 json 返回给 tab组件
    };
  },
  // 測試用
  mounted() {
    console.log(this, "index组件");
  },
  methods: {
    /**
     * 子组件往外发送的自定义事件
     * 得到拖放窗返回的二进制数据
     */
    setBlob(blob) {
      console.log("收到子组件数据设置blob", blob);
      this.blob = blob;
    },

    /**
     * 子组件往外发送的自定义事件
     * 返回导入的 json 数据
     */
    setDB(db) {
      console.log("收到子组件数据设置db", db);
      this.update = db;
    },
  },
};
</script>




<style lang="scss" scoped>
// 总体框架
.shuru {
  // width: 1000px;
  height: 90%;
  margin: 50px;
}
</style>>
