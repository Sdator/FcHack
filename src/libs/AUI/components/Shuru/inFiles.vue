<template>
  <div
    @dragover.prevent="dragover"
    @drop.prevent="drop"
    class="drop"
    :style="msgClass"
  >
    {{ msg }}
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
const msg = ref("把文件拖放进来");
const classStatus = ref(false);
// 提示信息 样式值
const msgClass = computed(() => {
  return {
    color: classStatus.value ? "darkgreen" : "red",
    backgroundColor: classStatus.value ? "aquamarine" : "#000",
  };
});

// 文件选择框 内容改变事件
const getFile = (e, files) => {
  file.value = files ?? e.target.files[0];
  classStatus.value = true;
  msg.value = "得到文件:" + file.value.name;
  console.log("得到文件", file);
};

// 事件：松开拖放
function drop(e) {
  let files = e.dataTransfer.files;
  // 拖放非文件类型抛出错误
  if (!files.length) throw new Error("未找到文件");
  getFile(e, files[0]);
  console.log("在放置区域中释放拖放");
}

function 获取文件数据() {
  watch(file, async (n, o) => {
    console.log(file.value.name, "文件发生变化");
    if (file.value.name == "") return;
    // 向父组件发送事件通知
    emit("blob", await 读取文件二进制(file.value));
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
