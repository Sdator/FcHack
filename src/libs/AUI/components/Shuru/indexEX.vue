<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <!--
      @blob 文件二进制讀取完畢往外发送事件
    -->
    <InFiles @blob="setBlob" />
    <br />
    <!-- <button class="add" @click="add()">添加</button> -->

    <Tab :blob="blob" />
    <!--
      :blob 给组件传入的绑定数据
      data  绑定对象条目
      @Del  自定义事件 子组件被点击往外面传递
     -->
    <!-- <Tiaomu
      :blob="blob"
      v-for="(v, k) of db"
      :key="k"
      :data="v"
      @remote="remoteTodo(k)"
    /> -->
  </div>
</template>

<script>
// 导入组件内部使用 不全局注册
// import Tiaomu from "./tiaomu.vue";
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
};
</script>

<script setup>
import { ref } from "vue";

/**
 * 子组件往外发送的自定义事件
 * 得到拖放窗返回的二进制数据
 */
const blob = ref();
function setBlob(v) {
  console.log("收到子组件数据", v);
  blob.value = v;
}
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
