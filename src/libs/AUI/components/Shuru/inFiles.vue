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

// 自定义事件 向外传出数据
const emit = defineEmits(["blob", "update"]);

function 获取文件数据() {
  let blob = null;
  const data = reactive({
    inNesFileEl: null,
    classStatus: false,
    msg: "把文件拖放进来",
    file: null,
    exNesFile() {
      const data = JSON.parse(localStorage.getItem("config"));
      if (!data || !blob) {
        alert("没找到需要修改的数据");
        return;
      }

      const view1 = new DataView(blob);

      for (const { 地址, 长度, 自定义值 } of data.db) {
        // 转为十进制 检查地址是否正确
        let addr = 地址 * 1;

        // console.log(addr, view1.byteLength, blob.byteLength);
        if (addr > blob.byteLength || 长度 > 4) {
          // console.log("地址太长跳过", addr);
          continue;
        }

        switch (长度) {
          case 1:
            view1.setUint8(地址, 自定义值);
            break;
          case 2:
            view1.setUint16(地址, 自定义值, data.bigModel);
            break;
          case 4:
            view1.setUint32(地址, 自定义值, data.bigModel);
            break;
          default:
            break;
        }
      }
      const name = file.value?.name ?? "db";
      if (view1) {
        download(view1, `new_${name}`);
      }
    },
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
        blob = await 读取文件二进制(data.file);
        // 向父组件发送事件通知
        emit("blob", blob);
        console.log("二进制读取完毕：往父组件发送事件");
      }
    );
  } catch (error) {
    console.log(error, "读取文件失败");
  }

  return toRefs(data);
}
const { inNesFileEl, getFile, exNesFile, file, msg, msgClass } = 获取文件数据();

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
      const json = localStorage.getItem("config");
      if (json) {
        download(json, `${name}_${Date.now()}.json`);
      }
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
