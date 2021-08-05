<template>
  <div class="charu">
    <div class="mdui-textfield">
      <input
        class="mdui-textfield-input"
        type="text"
        placeholder="插入位置 0x????"
        v-model="插入位置"
        @click="(e) => e.target.select()"
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
    <StrInput @outHex="(v) => (outHex = v)" />

    <button
      class="mdui-btn mdui-ripple"
      @click="changeBlob(blob, 插入位置, model)"
    >
      确认修改
    </button>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { nextTick, watch } from "@vue/runtime-core";

import StrInput from "./文本输入框.vue";

// 传入的文件数据
const props = defineProps(["blob"]);
const emits = defineEmits(["upBlob"]);

const { blob } = toRefs(props);

const model = ref("ti"); //模式
const outHex = ref(null); //待插入的数据 子组件返回

function 模块插入位置() {
  const 配置 = JSON.parse(localStorage.getItem("HexConfig"));
  const raw = reactive({
    插入位置: 配置.addr ?? "",
  });

  const regex = new RegExp(/[a-fA-F0-9]/g);
  // 预先给要执行的函数绑定防抖
  const upHexFrom = myapi.debounce((v) => {
    const len = v.search("^0x");
    const str = v
      .slice(len == -1 ? 0 : 2) // 如果存在0x从第2个字符开始
      .match(regex); // 匹配正规的字符

    console.log(str, 666666666);

    if (!str) return (raw.插入位置 = "");
    const addr =
      "0x" +
      str
        .join("") // 合并数组
        .toUpperCase(); //转为大写
    // 写到本地储存
    const 配置 = JSON.parse(localStorage.getItem("HexConfig"));
    配置.addr = addr;
    localStorage.setItem("HexConfig", JSON.stringify(配置));

    // 处理用户输入 去掉前两个字符 匹配剩下的全部转为大写
    raw.插入位置 = addr;
  }, 200);

  watch(
    () => raw.插入位置,
    (v) => {
      // 防抖函数
      upHexFrom(v);
    }
  );

  return toRefs(raw);
}
const { 插入位置 } = 模块插入位置();

function changeBlob(blob, 插入位置, model) {
  console.log(outHex.value, blob, blob.byteLength, 插入位置, 111111);

  if (!blob.byteLength) return;
  const data = new DataView(blob);

  switch (model) {
    case "ti":
      break;
    case "cha":
      break;
    default:
      break;
  }
  // 往父组件返回修改后的文件数据
  // emits("upBlob", data);
  console.log(data, data.byteLength, blob, blob.byteLength, 插入位置, 22222);
}
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
  border: 1px solid rgb(169, 98, 22);
}
</style>
