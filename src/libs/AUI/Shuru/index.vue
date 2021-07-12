<template>
  <div>shuruaaaaaa</div>
</template>
<script>
// 组件模式无法在组件内推导 name 需要另外创建一个 script 标签导出 name
export default { name: "Shuru" };
</script>

<script setup>
import { defineProps, reactive, ref } from "vue";

// 导出名字一定要对上 不然是无法使用组件
</script>

<style>
</style>