<template>
  <div>
    <textarea style="" v-model="blob"></textarea>

    <span>字符统计:{{ num }}</span>
  </div>
</template>


<script setup>
import { computed, reactive, toRefs, warn, watch } from "@vue/runtime-core";

const data = reactive({
  num: computed(() => {
    console.log("文本发生变化");
    return data.blob.length;
  }),
  blob: "",
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

const 防抖 = (fun, time = 1000) => {
  let t;
  console.log(t, "执行了");
  return function () {
    console.log(t, 22222);
    if (t) {
      return;
    }
    t = setTimeout(() => {
      console.log(t, 33333333333);

      fun();
      t = null;
    }, time);
  };
};

watch(
  () => data.blob,
  async (v) => {
    防抖(() => console.log(1111))();

    // await 延时(1000).then(() => {
    //   //   去掉前后空字符 有禁止回车的效果
    //   data.blob = v.trim();
    // });
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
    resize: none;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
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
