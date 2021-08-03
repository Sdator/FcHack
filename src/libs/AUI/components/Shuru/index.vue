<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <InFiles @blob="setBlob" @update="setDB" />
    <br />
    <Tab ref="test" :blob="blob" :update="update" />
    <button @click="demo(test)">点我</button>
  </div>
</template>

<script setup>
// 导入组件内部使用 不全局注册
// 在setup中可以直接导入插件使用 而不用设置componets
// import Tab from "./tab.vue";
import Tab from "./TabList.vue";
import InFiles from "./inFiles.vue";
import { ref } from "@vue/reactivity";

const test = ref(null);

function demo(a) {
  console.log(test, abc);
  console.log(this, 22222);
}
</script>



<script>
export default {
  // 全局注册 需要输入一下方便使用
  name: "ShuruEx",
  data() {
    return {
      blob: {},
      update: {},
    };
  },
  mounted() {
    console.log(this, 66666666);
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
    setDB(db) {
      console.log("收到子组件数据", db);
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
