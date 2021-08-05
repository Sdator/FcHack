<template>
  <ExDrop @inFile="inFile" @outBlob="outBlob" />

  <button class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="outFile">
    确认修改并导出文件
  </button>

  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="exJsonFile"
  >
    导出json
  </button>

  <InFileButton title="导入JSON配置文件" @inFile="inJson" />
</template>

<script setup>
// 用于接受拖放文件
import { computed, watch, ref, reactive, toRefs } from "vue";

import InFileButton from "./打开文件按钮.vue";
import ExDrop from "./高级拖放.vue";
// 自定义事件 向外传出数据
const emits = defineEmits(["outBlob", "update"]);
const { download } = myapi;

function 获取文件数据() {
  let blob = null;
  let file = null;

  const data = reactive({
    classStatus: false,
    msg: "把文件拖放进来",

    // 拖放窗口样式
    msgClass: computed(() => {
      return {
        color: data.classStatus ? "darkgreen" : "red",
        backgroundColor: data.classStatus ? "aquamarine" : "#000",
      };
    }),
  });

  // 处理高级拖放事件 返回文件
  function inFile(files) {
    console.log("获得拖放控件数据:Files", files);
    file = files[0];
  }
  // 处理高级拖放事件 返回数据
  function outBlob(data) {
    blob = data;
    console.log("获得拖放控件数据继续往外层传送Blob", data);
    emits("outBlob", data);
  }

  // 导出修改后的二进制数据文件
  function outFile() {
    // 从本地储存中获取修改的内容数据
    const localData = JSON.parse(localStorage.getItem("config"));
    console.log(!localData, !blob);
    if (!localData || !blob) return alert("没找到需要修改的数据or文件没有打开");

    const view1 = new DataView(blob);

    for (const { 地址, 长度, 自定义值 } of localData.db) {
      // 转为十进制 检查地址是否正确
      let addr = 地址 * 1;

      // 跳过不符合规则的数据修改
      if (addr > blob.byteLength || 长度 > 4) continue;

      switch (长度) {
        case 1:
          view1.setUint8(地址, 自定义值);
          break;
        case 2:
          view1.setUint16(地址, 自定义值, localData.bigModel);
          break;
        case 4:
          view1.setUint32(地址, 自定义值, localData.bigModel);
          break;
        default:
          break;
      }
    }
    // 组织名称
    const name = file.name ?? "db";
    // 输出文件
    if (view1) {
      download(view1, `new_${name}`);
    }
  }

  return { outFile, outBlob, inFile, ...toRefs(data) };
}
const { outFile, outBlob, inFile, msg, msgClass } = 获取文件数据();

function json相关() {
  const data = reactive({
    // 导入json
    async inJson(files) {
      const file = files[0];
      // 文件验证
      if (!(file.type == "application/json")) {
        alert("文件格式错误");
        return;
      }

      // 转为对象 检查是否合法
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        // 数据为空返回
        if (json) return alert("导入的数据为空");
        console.log("导入文件", json);
        // 通知外部更新数据 某种情况下可以用刷新页面代替
        emits("update", json);
      } catch (error) {
        console.error("导入数据不符合json标准", error);
      }
    },
    // 导出json
    exJsonFile() {
      const name = file.value?.name ?? "db";
      const json = localStorage.getItem("config");
      if (json) {
        download(json, `${name}_${Date.now()}.json`);
      }
    },
  });

  return toRefs(data);
}
const { exJsonFile, inJson } = json相关();
</script>



<style lang="scss" scoped>
// .top {
// display: flex;
// width: 80vw;
// height: 500px;
// justify-content: space-around;
// }
.drop {
  width: 500px;
  height: 300px;
  margin: 50px;
  border: dashed red;
  // float: left;
}

button {
  width: 200px;
  height: 60px;
  margin: 10px;
}
</style>
