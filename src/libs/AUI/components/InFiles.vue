<template>
  <div
    id="files"
    @ondrop.prevent="drop_handler"
    @ondragover.prevent="dragstart_handler"
  >
    把文件拖放进来
  </div>
  <input class="infile" type="file" @change="Egetfile" />
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { 读取文件二进制 } from "../../api.js";

export default { name: "InFiles" };
</script>

<script setup>
// 用于接受拖放文件

const file = ref();
const filename = ref();
const fileblob = ref();

const Egetfile = (e) => {
  file.value = e.target.files[0];
  filename.value = e.target.value;
};

function 获取文件数据() {
  watch(filename, async (n, o) => {
    if (filename.value == "") return;
    fileblob.value = await 读取文件二进制(file.value);
  });
}

// console.log(props.fileA, 111111);
// const fileA = "666666";

// watch(fileA, (a) => {
//   console.log(a, 222222);
// });

// console.log(props, 11111111);

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

#files {
  width: 500px;
  height: 300px;
  border: dashed red;
}
</style>
