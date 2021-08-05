<template>
  <div class="charu">
    <div class="mdui-textfield">
      <input
        class="mdui-textfield-input"
        type="text"
        placeholder="插入位置 0x????"
        v-model="插入位置"
      />
    </div>

    <div class="mdui-textfield mdui-textfield-floating-label">
      <span>改写模式:</span>&nbsp;
      <span
        >插入<input
          type="radio"
          name="model"
          v-model="model"
          value="cha" /></span
      >&nbsp;
      <span
        >替换 <input type="radio" name="model" v-model="model" value="ti"
      /></span>
    </div>
    <StrInput />

    <button
      class="mdui-btn mdui-color-theme-accent mdui-ripple"
      @click="changeBlob(blob, 插入位置, model)"
    >
      确认修改
    </button>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { getCurrentInstance, watch } from "@vue/runtime-core";

import StrInput from "./文本输入框.vue";

// vue3 组合api中获取this的方法
const instance = getCurrentInstance();

console.log(instance, 111);

const props = defineProps(["blob"]);
const emits = defineEmits(["upBlob"]);

const data = reactive({
  model: "ti",
  插入位置: "",
});

const { model, 插入位置 } = toRefs(data);
const { blob } = toRefs(props);

function changeBlob(blob, 插入位置, model) {
  console.log(blob, blob.byteLength, 插入位置, 111111);

  if (!blob.byteLength) return;
  blob = new DataView(blob);

  switch (model) {
    case "ti":
      break;
    case "cha":
      break;
    default:
      break;
  }

  console.log(blob, blob.byteLength, 插入位置, 22222);
}
const regex = new RegExp(/[a-fA-F0-9]/g);

watch(插入位置, (v) => {
  console.log(debounce, 222222);

  插入位置.value = v.match(regex).join("").toUpperCase();

  // console.log(arr,  111);

});
</script>

<style lang="scss" scoped>
.charu {
  // 绝对定位
  position: absolute;
  left: 700px;
  top: 10px;
  // background-color: #f00;
  // width: 40vw;
  // height: 50vmax;
}
button {
  margin-top: 20px;
}
</style>
