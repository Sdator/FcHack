<template>
  <!-- 代理触发 -->
  <input
    ref="openfileEl"
    v-show="false"
    type="file"
    @change="(e) => emits('inFile', e.target.files)"
  />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="openfileEl.click()"
  >
    {{ title }}
  </button>
</template>

<script setup>
/**
 * 此组件用于点击按钮返回打开的文件列表
 */
import { ref } from "vue";
const openfileEl = ref(null);
const props = defineProps(["title"]);
const emits = defineEmits(["inFile"]);
</script>

<style scoped>
button {
  width: 200px;
  height: 60px;
  margin: 10px;

  border: 1px solid rgb(169, 98, 22);
}
</style>