<template>
  <div
    @dragover.prevent="dragover"
    @drop.prevent="drop"
    class="drop"
    :style="msgClass"
  >
    {{ msg }}
  </div>
  <!-- 代理触发 -->
  <input ref="inNesFile" v-show="false" type="file" @change="getFile" />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="inNesFile.click()"
  >
    导入要修改的文件
  </button>
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="exNesFile"
    disabled
  >
    确认修改并导出文件
  </button>

  <input ref="inJson" v-show="false" type="file" />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="exJsonFile"
  >
    导出json
  </button>
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="inJson.click()"
    disabled
  >
    导入json
  </button>
</template>

<script setup>
// 用于接受拖放文件
import { computed, watch, ref, reactive, toRefs } from "vue";
import { 读取文件二进制 } from "../../../api.js";

function 按钮相关() {
  const data = reactive({
    inNesFile: null,
    inJson: null,
  });
  return toRefs(data);
}
const { inNesFile, inJson } = 按钮相关();

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

// 触发下载
function exJsonFile() {
  const name = file.value?.name ?? "db";

  // const data = new Date();
  // const Y = Dates.getFullYear();
  // const M = Dates.getMonth() + 1;
  // const D = Dates.getDate();
  // const times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;

  download(localStorage["config"], `${name}_${Date.now()}.json`);
  // window.open(src, "_blank");
}

function fileDownload(content, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}

function download(data, name) {
  const url = URL.createObjectURL(
    new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  );
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
.drop {
  width: 500px;
  height: 300px;
  border: dashed red;
}

button {
  width: 200px;
  height: 60px;
  margin: 10px;
}
</style>
