<template>
  <div>
    <textarea style="" v-model="blob"></textarea>

    <span>字符统计:{{ num.toString().padStart(3, "0") }}</span>
  </div>
</template>


<script setup>
import { computed, reactive, toRefs, warn, watch } from "@vue/runtime-core";
import { debounce } from "../../../api.js";

const data = reactive({
  num: computed(() => {
    console.log("文本发生变化");

    // 去掉空格后的数量
    return data.blob.replace(/ /g, "").length;
  }),
  blob: "",
  debounce: debounce(500),
});

const 延时 = (time) => {
  let t = null;

  return new Promise((res) => {
    if (t) {
      return;
    }
    t = setTimeout(() => {
      res();
      t = null;
    }, time);
  });
};

const regex = new RegExp(/[a-fA-F0-9]/g);
watch(
  () => data.blob,
  (v, old) => {
    // 没有手感 适合任意字符输入时使用  空格换行除外
    // if (!regex.test(v[v.length - 1])) data.blob = old;
    // data.blob = data.blob.trim().toUpperCase();
    // 防抖函数
    data.debounce(() => {
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
      // 最后把数组转为字符串并用空格分隔
      data.blob = arr.join(" ");
    });
  }
);

const { num, blob } = toRefs(data);
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
div {
  width: 400px;
  height: 200px;
  position: relative;

  textarea {
    // 禁止窗口缩放
    resize: none;
    height: 100%;
    width: 100%;
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
