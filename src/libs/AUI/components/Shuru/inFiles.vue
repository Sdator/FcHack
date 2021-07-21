<template>
  <div
    @dragover.prevent="dragover"
    @drop.prevent="getFile"
    class="drop"
    :style="msgClass"
  >
    {{ msg }}
  </div>
  <!-- 代理触发 -->
  <input ref="inNesFileEl" v-show="false" type="file" @change="getFile" />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="inNesFileEl.click()"
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

  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="exJsonFile"
  >
    导出json
  </button>
  <input ref="inJsonEl" v-show="false" type="file" @change="inJson" />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="inJsonEl.click()"
  >
    导入json
  </button>
</template>

<script setup>
// 用于接受拖放文件
import { computed, watch, ref, reactive, toRefs } from "vue";
import { 读取文件二进制, download } from "../../../api.js";

// 自定义事件
const emit = defineEmits(["blob", "update"]);

function 获取文件数据() {
  const data = reactive({
    inNesFileEl: null,
    classStatus: false,
    msg: "把文件拖放进来",
    file: null,
    // 文件选择框 内容改变事件
    getFile(e) {
      const file = e.dataTransfer?.files?.[0] ?? e.target.files?.[0];
      if (!file) throw new Error("未找到文件");
      data.classStatus = true;
      data.msg = "得到文件:" + file.name;
      data.file = file;
      console.log("得到文件", file);
    },
    // 拖放窗口样式
    msgClass: computed(() => {
      return {
        color: data.classStatus ? "darkgreen" : "red",
        backgroundColor: data.classStatus ? "aquamarine" : "#000",
      };
    }),
  });

  try {
    watch(
      () => data.file,
      async (val) => {
        console.log("文件发生变化", val);
        if (!val?.size) {
          data.msg = "文件似乎有问题";
          return;
        }
        // 向父组件发送事件通知
        emit("blob", await 读取文件二进制(data.file));
        console.log("二进制读取完毕：往父组件发送事件");
      }
    );
  } catch (error) {
    console.log(error, "读取文件失败");
  }

  return toRefs(data);
}
const { inNesFileEl, getFile, file, msg, msgClass } = 获取文件数据();

function json相关() {
  const data = reactive({
    inJsonEl: null,
    // 导入json
    async inJson(e) {
      const file = e.target.files?.[0];
      // 文件验证
      if (!(file.type == "application/json")) {
        alert("文件格式错误");
        return;
      }

      const text = await file.text();
      // 转为对象 检查是否合法
      const json = JSON.parse(text ?? {});
      if (JSON.stringify(json) == "{}") return;

      console.log("导入文件", json);
      // 通知外部更新数据 考虑太麻烦直接刷新页面
      emit("update", json);
      // 刷新页面会导致文件句柄丢失 需要重新导入文件
      // localStorage["config"] = text;
      // location.reload();
    },
    // 导出json
    exJsonFile() {
      const name = file.value?.name ?? "db";
      download(localStorage["config"], `${name}_${Date.now()}.json`);
    },
  });

  return toRefs(data);
}
const { inJsonEl, exJsonFile, inJson } = json相关();
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
