<template>
  <input
    type="file"
    v-show="false"
    ref="openfileEl"
    @change="(e) => openFile(e.target.files)"
  />
  <div
    class="drop"
    @dragover.prevent
    @drop.prevent="(e) => openFile(e.dataTransfer.files)"
    @click="openfileEl.click()"
    :style="msgClass"
  >
    {{ data.msg }}
  </div>
</template>


<script setup>
import { 读取文件二进制, download } from "../../../api.js";
import { defineProps, ref, computed, reactive, toRefs } from "vue";

const props = defineProps(["msg"]);
const emits = defineEmits(["inFile", "outBlob"]);
const openfileEl = ref(null);

const data = reactive({
  msg: "点击我or把文件拖放进来",
  classStatus: false,
});

async function openFile(files) {
  emits("inFile", files);
  try {
    // 暂时只处理第一个文件
    const file = files[0];
    if (!file) throw new Error("未找到文件");
    data.classStatus = true;
    data.msg = "得到文件:" + file.name;
    const blob = await 读取文件二进制(file);
    // 向父组件发送事件通知
    emits("outBlob", blob);
    console.log("二进制读取完毕：往父组件发送事件");
  } catch (error) {
    console.log(error, "读取文件失败");
  }
}

// 计算属性 拖放窗口样式
const msgClass = computed(() => {
  return {
    color: data.classStatus ? "darkgreen" : "red",
    backgroundColor: data.classStatus ? "aquamarine" : "#000",
  };
});
</script>



<style  scoped>
.drop {
  width: 500px;
  height: 300px;
  margin: 50px;
  border: dashed red;
  /* float: left; */
  font-size: 150%;
  line-height: 150px;
  overflow: hidden;
}
</style>