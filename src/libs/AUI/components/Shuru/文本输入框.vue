<template>
  <div>
    <textarea
      class="mdui-color-blue-200 mdui-text-color-black-text"
      xstyle=""
      v-model="blob"
    ></textarea>
    <span>字符统计:{{ num }}</span>
  </div>
</template>


<script setup>
import {
  computed,
  nextTick,
  reactive,
  ref,
  toRefs,
  watch,
} from "@vue/runtime-core";

const emits = defineEmits(["outHex"]);

function 模块十六进制编辑器() {
  const 配置 = JSON.parse(localStorage.getItem("HexConfig"));
  const raw = reactive({
    blob: 配置.data ?? "",
  });

  const regex = new RegExp(/[a-fA-F0-9]/g);
  // 预先给要执行的函数绑定防抖
  const upHexFrom = myapi.debounce((v) => {
    const arr = [];
    // 匹配正规的字符 并每两个字符合并为一个数组添加到 arr
    const blob = v.match(regex)?.forEach((_, k, c) => {
      //条件 双数触发一次
      if (k % 2 == 0) {
        arr.push(
          //添加到数组中
          c
            .slice(k, k + 2) //取两个元素
            .join("") //合并
            .toUpperCase() //转换为大小写
        );
      }
    });

    const data = arr.join(" ");

    // 写到本地储存
    const 配置 = JSON.parse(localStorage.getItem("HexConfig"));
    配置.data = data;
    localStorage.setItem("HexConfig", JSON.stringify(配置));

    // 合并后传出组件外
    emits("outHex", data);
    // 最后把数组转为字符串并用空格分隔
    raw.blob = data;
  }, 200);

  watch(
    () => raw.blob,
    (v, old) => {
      // 防抖函数
      upHexFrom(v);
    }
  );

  return toRefs(raw);
}
const { blob } = 模块十六进制编辑器();

function 模块字符统计(data) {
  const raw = reactive({
    num: computed(() => {
      // 要计算的代理数据需要放在函数中才能监视到变化
      // 去掉空格后的数量
      const len = data.value.replace(/ /g, "").length;
      // 前面添加两个占位符 防止元素抖动
      return len.toString().padStart(3, "0");
    }),
  });
  return toRefs(raw);
}
const { num } = 模块字符统计(blob);
</script>

<style lang="scss" scoped>
div {
  width: 400px;
  height: 200px;
  position: relative;

  textarea {
    // 禁止窗口缩放
    resize: none;
    height: 100%;
    width: 100%;
    // 设置等宽字体
    font-family: Consolas, "Courier New", Courier, FreeMono, monospace;
    // 设置y轴滚动条
    // overflow-y: scroll;
  }

  span {
    color: rgb(235, 1, 1);
    float: right;
    position: relative;
    top: -30px;
    left: -30px;
  }
}
</style>>
