<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <!-- <div class="em"> -->
    <InFiles />
    <!-- </div> -->
    <!-- <div class="em"> -->
    <Shuru :data="data" db="db" />
    <!-- </div> -->
  </div>
</template>


<script setup>
// import HelloWorld from "./libs/AUI/components/HelloWorld.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md

import { defineProps, computed, ref, watch } from "vue";
import { FCDate } from "./libs/api";

// 创建数据库 代入初始列表
const db = new FCDate();
// const arr = ref(db.list);
const data = db.list;

// const fileD = ref("1111");

// 暴露属性
// const props = defineProps({
//   fileA: String,
// });

// console.log(props.fileA, 44444);

// let fileB = ref("34354");
// setTimeout(() => {
//   fileB = "55555555";
//   console.log(fileA, fileB, "时间到");
// }, 1000);
</script>



<style lang="scss" scoped>
// 总体框架
.shuru {
  width: 700px;
  height: 200px;
  margin: 50px auto;

  // .em {
  //   margin: 20px auto;
  //   padding: 20px;
  //   background-color: rgb(19, 154, 216);
  // }
}
</style>>
