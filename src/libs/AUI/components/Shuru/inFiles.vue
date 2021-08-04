<template>
  <div
    @dragover.prevent="dragover"
    @drop.prevent="openFile"
    class="drop"
    :style="msgClass"
  >
    {{ msg }}
  </div>

  <!-- 代理触发 -->
  <input ref="inNesFileEl" v-show="false" type="file" @change="openFile" />
  <button
    class="mdui-btn mdui-color-theme-accent mdui-ripple"
    @click="inNesFileEl.click()"
  >
    导入要修改的文件
  </button>
  <button class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="outFile">
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
const emit = defineEmits(["setBlob", "update"]);

function 获取文件数据() {
  let blob = null;
  const data = reactive({
    inNesFileEl: null,
    classStatus: false,
    msg: "把文件拖放进来",
    file: null,
    // 导出修改后的二进制数据文件
    outFile() {
      // 从本地储存中获取修改的内容数据
      const localData = JSON.parse(localStorage.getItem("config"));
      if (!localData || !blob)
        return alert("没找到需要修改的数据or文件没有打开");

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
      const name = file.value?.name ?? "db";
      // 输出文件
      if (view1) {
        download(view1, `new_${name}`);
      }
    },
    // 拖拽文件 and 文件选择框 内容改变事件
    async openFile(e) {
      //获得 拖拽文件 和 选择文件
      const file = e.dataTransfer?.files?.[0] ?? e.target.files?.[0];
      if (!file) throw new Error("未找到文件");
      data.classStatus = true;
      data.msg = "得到文件:" + file.name;
      data.file = file;

      // 监听文件变化
      try {
        if (!val?.size) {
          data.msg = "文件似乎有问题";
          return;
        }
        blob = await 读取文件二进制(data.file);
        // 向父组件发送事件通知
        emit("setBlob", blob);
        console.log("二进制读取完毕：往父组件发送事件");
      } catch (error) {
        console.log(error, "读取文件失败");
      }
    },
    // 拖放窗口样式
    msgClass: computed(() => {
      return {
        color: data.classStatus ? "darkgreen" : "red",
        backgroundColor: data.classStatus ? "aquamarine" : "#000",
      };
    }),
  });

  // // 监听文件变化
  // try {
  //   watch(
  //     () => data.file,
  //     async (val) => {
  //       console.log("文件发生变化", val);
  //       if (!val?.size) {
  //         data.msg = "文件似乎有问题";
  //         return;
  //       }
  //       blob = await 读取文件二进制(data.file);
  //       // 向父组件发送事件通知
  //       emit("setBlob", blob);
  //       console.log("二进制读取完毕：往父组件发送事件");
  //     }
  //   );
  // } catch (error) {
  //   console.log(error, "读取文件失败");
  // }

  return toRefs(data);
}
const { inNesFileEl, openFile, outFile, file, msg, msgClass } = 获取文件数据();

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
      try {
        const json = JSON.parse(text);
        // 数据为空返回
        if (json) return alert("导入的数据为空");
        console.log("导入文件", json);
        // 通知外部更新数据 某种情况下可以用刷新页面代替
        emit("update", json);
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
const { inJsonEl, exJsonFile, inJson } = json相关();
</script>>



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
