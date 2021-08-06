<template>
  <div class="charu">
    <div class="mdui-textfield">
      <input
        type="text"
        placeholder="插入位置 0x????"
        class="mdui-textfield-input"
        :class="classInputObj"
        v-model="插入位置"
        ref="addrEl"
        @click="inputClick"
      />
      <!-- @click="(e) => e.target.select()" -->
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
    <!-- 事件触发的同时把数据设置到变量中 -->
    <StrInput @outHex="(v) => (outHex = v)" />

    <button
      class="mdui-btn mdui-ripple"
      @click="changeBlob(blob, outHex, 插入位置, model)"
    >
      确认修改
    </button>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { computed, nextTick, watch } from "@vue/runtime-core";

import StrInput from "./文本输入框.vue";

// 传入的文件数据
const props = defineProps(["blob"]);
const emits = defineEmits(["upBlob"]);

const model = ref("ti"); //模式
const outHex = ref(JSON.parse(localStorage.getItem("HexConfig"))?.data); //待插入的数据 子组件返回

function 模块插入位置() {
  const 配置 = JSON.parse(localStorage.getItem("HexConfig"));
  let oldAddr;
  let clickStatus = false;

  const raw = reactive({
    插入位置: 配置?.addr ?? "",
    addrEl: null,
    classInputObj: {
      fontDel: false,
    },
    inputClick(e) {
      const el = e.target;
      // 全选
      el.select();
      // 点击时记录位置
      // nextTick(() => {
      //   oldAddr = el.selectionStart;
      //   console.log(el, oldAddr, el.selectionEnd);
      // });

      setTimeout(() => {
        console.log(el.selectionStart, el.selectionEnd);
        oldAddr = el.selectionEnd;
        clickStatus = true;
      }, 0);
    },
  });
  const regex = new RegExp(/[a-fA-F0-9]/g);
  // 预先给要执行的函数绑定防抖
  const upHexFrom = myapi.debounce((v, o) => {
    const len = v.search("^0x");
    const str = v
      .slice(len == -1 ? 0 : 2) // 如果存在0x从第2个字符开始
      .match(regex); // 匹配正规的字符

    if (!str) return (raw.插入位置 = "");
    const addr =
      "0x" +
      str
        .join("") // 合并数组
        .toUpperCase(); //转为大写
    // 写到本地储存
    const 配置 = JSON.parse(localStorage.getItem("HexConfig")) ?? {};
    配置.addr = addr;
    localStorage.setItem("HexConfig", JSON.stringify(配置));

    raw.classInputObj.fontDel = parseInt(addr) > props.blob.byteLength;

    // 处理用户输入 去掉前两个字符 匹配剩下的全部转为大写
    raw.插入位置 = addr;

    // console.log(oldAddr, 66666);

    nextTick(() => {
      // if (clickStatus) {
      //   raw.addrEl.selectionStart = raw.插入位置.length - o.length + oldAddr;
      //   raw.addrEl.selectionEnd = raw.插入位置.length - o.length + oldAddr;
      // }
      // console.log(raw.插入位置.length, o.length);
      // clickStatus = false;
      raw.addrEl.selectionStart = raw.插入位置.length - o.length + oldAddr;
      raw.addrEl.selectionEnd = raw.插入位置.length - o.length + oldAddr;

      oldAddr = raw.addrEl.selectionEnd;
    });
  }, 200);

  watch(
    () => raw.插入位置,
    (v, o) => {
      oldAddr = raw.addrEl.selectionEnd;
      // 防抖函数
      upHexFrom(v, o);
    }
  );

  return toRefs(raw);
}
const { 插入位置, classInputObj, addrEl, inputClick } = 模块插入位置();

/** 确认修改文件数据
 * 原始数据
 * 用作替换或插入数据
 * 地址偏移
 * 模式
 */
function changeBlob(rawblob, data, 插入位置, model) {
  if (!rawblob.byteLength || !data.length || 插入位置 == "")
    return alert("检查是否已经导入了文件，地址是否有填写，文本框是否有内容");

  console.log(rawblob, data, data.length, 插入位置, 22222);

  // 把相关数据转为十进制
  data = data.map((v) => parseInt(v, 16));
  插入位置 = parseInt(插入位置, 16);

  const newBlob = new Uint8Array(data);
  let rawBlobArr = new Uint8Array(rawblob);

  switch (model) {
    case "ti":
      // 替换数据
      for (const [k, v] of newBlob.entries()) {
        rawBlobArr[插入位置 + k] = v;
      }
      break;
    case "cha":
      // 插入数据
      // 取前面一段数据
      const a = new Uint8Array(rawBlobArr.buffer, 0, 插入位置);
      // 取后面一段数据
      const c = new Uint8Array(rawBlobArr.buffer, 插入位置);
      // 合并数据
      rawBlobArr = new Uint8Array([...a, ...newBlob, ...c]);
      // rawBlobArr = new Uint8Array([a + newBlob + c]);
      console.log(rawBlobArr, 777777);

      break;
    default:
      break;
  }

  // myapi.download(rawBlobArr,);

  // 往父组件返回修改后的文件数据
  emits("upBlob", rawBlobArr.buffer);
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

.fontDel {
  color: red;
  text-decoration: line-through;
  font-style: italic;
}
</style>
