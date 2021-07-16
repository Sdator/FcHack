<template>
  <!-- <div
    class="files"
    @ondrop.prevent="drop_handler"
    @ondragover.prevent="dragstart_handler"
  >
    把文件拖放进来
  </div> -->
  <input class="infile" type="file" @change="Egetfile" />
</template>

<script setup>
// 用于接受拖放文件
import { computed, watch, ref, reactive, toRefs } from "vue";
import { 读取文件二进制 } from "../../../api.js";

// 自定义事件
const emit = defineEmits(["blob"]);

const file = ref();
const filename = ref();
const fileblob = ref();

// 文件选择框 内容改变事件
const Egetfile = (e) => {
  file.value = e.target.files[0];
  filename.value = e.target.value;
};

function 获取文件数据() {
  watch(filename, async (n, o) => {
    if (filename.value == "") return;
    fileblob.value = await 读取文件二进制(file.value);
    // 向父组件发送事件通知
    emit("blob", fileblob);
  });
}

try {
  获取文件数据();
} catch (error) {
  console.log(error, "读取文件失败");
}

// const getfile = computed((a) => {
//   console.log(a, "改变了");
// });

// const drop_handler = function () {
//   console.log(e);
// };

// const dragstart_handler = function () {
//   console.log(e);
// };

// Get the element by id

// window.addEventListener("DOMContentLoaded", () => {
//   const element = document.getElementById("files");
//   // Add the ondragstart event listener
//   element.addEventListener("dragstart", dragstart_handler);
// });
</script>>



<style lang="scss" scoped>
* {
  margin-top: 10px;
}

.files {
  width: 500px;
  height: 300px;
  border: dashed red;
}
</style>
