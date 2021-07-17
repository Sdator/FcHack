<template>
  <div id="drop" @dragover.prevent="dragover" @drop.prevent="drop" class="drop">
    把文件拖放进来
  </div>
  <input class="infile" type="file" @change="getFile" />
</template>

<script setup>
// 用于接受拖放文件
import { computed, watch, ref, reactive, toRefs } from "vue";
import { 读取文件二进制 } from "../../../api.js";

// 自定义事件
const emit = defineEmits(["blob"]);

const file = ref();
const fileblob = ref();

// 文件选择框 内容改变事件
// const getFile = (e, files) => getFileCall(e);
const getFile = (e, files) => {
  file.value = files ?? e.target.files[0];
  console.log("得到文件", files);
};

// 如果有传入参数2 优先使用
// const getFileCall = (e, files) => {
//   file.value = files ?? e.target.files[0];
//   console.log(file.value, files, "得到文件");
// };

function drop(e) {
  let files = e.dataTransfer.files;
  // 拖放非文件类型抛出错误
  if (!files.length) throw new Error("未找到文件");
  getFile(e, e.dataTransfer.files[0]);
  console.log("在放置区域中释放拖放");
}

function 获取文件数据() {
  watch(file, async (n, o) => {
    console.log(file.value.name, "文件发生变化");

    if (file.value.name == "") return;
    fileblob.value = await 读取文件二进制(file.value);
    // 向父组件发送事件通知
    emit("blob", fileblob);
    console.log("二进制读取完毕：往父组件发送事件");
  });
}

try {
  获取文件数据();
} catch (error) {
  console.log(error, "读取文件失败");
}
</script>>



<style lang="scss" scoped>
* {
  margin-top: 10px;
}

.drop {
  width: 500px;
  height: 300px;
  border: dashed red;
}

.test {
  width: 100px;
  height: 60px;
  background-color: brown;
}
</style>
