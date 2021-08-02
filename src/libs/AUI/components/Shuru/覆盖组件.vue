<template>
  <div class="charu">
    <div class="mdui-textfield mdui-textfield-floating-label">
      <label class="mdui-textfield-label"
        >{{ 插入位置 ? 插入位置 : "插入位置 0x????" }}
      </label>
      <input class="mdui-textfield-input" type="text" v-model="插入位置" />
    </div>

    <div class="mdui-textfield mdui-textfield-floating-label">
      <label>改写模式:</label>&nbsp;
      <label
        >插入<input
          type="radio"
          name="model"
          v-model="model"
          value="cha" /></label
      >&nbsp;
      <label
        >替换 <input type="radio" name="model" v-model="model" value="ti"
      /></label>
    </div>
    <StrInput />

    <button
      class="mdui-btn mdui-color-theme-accent mdui-ripple"
      @click="exJsonFile"
    >
      确认修改
    </button>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

import StrInput from "./文本输入框.vue";

const data = reactive({
  model: "ti",
  插入位置: "",
  blob: null,
});

const { model, 插入位置, blob } = toRefs(data);

watch(model, (a, b) => {
  console.log(a, 1111111);
});
</script>

<style lang="scss" scoped>
.charu {
  width: 40vw;

  // position: absolute;
  // left: 600px;
  // top: 50px;
  // background-color: #f00;
}
</style>
