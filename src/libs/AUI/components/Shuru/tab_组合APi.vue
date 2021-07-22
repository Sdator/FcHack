<template>
  <div class="样式功能按钮">
    <button
      class="mdui-btn mdui-color-theme-accent mdui-ripple"
      @click="addEntry"
    >
      添加条目
    </button>
    <!-- <input type="text" v-model="模糊搜索" placeholder="模糊搜索" /> -->
  </div>

  <div class="mdui-textfield mdui-textfield-floating-label">
    <label class="mdui-textfield-label">模糊搜索</label>
    <input class="mdui-textfield-input" type="text" v-model="模糊搜索" />
  </div>

  <label>{{ bigModel ? "大端:" : "小端：" }}</label>
  <input type="checkbox" v-model="bigModel" />

  <br />
  <br />

  <div class="mdui-table-fluid">
    <table class="mdui-table mdui-table-hoverable mdui-container-flui">
      <thead>
        <tr>
          <th v-for="(name, k) of th" :key="k">{{ name }}</th>
        </tr>
      </thead>
      <TabTbody
        :blob="blob"
        v-for="v of fildb"
        :key="v.id"
        :data="v"
        @remote="remoteEntry"
        :bigModel="bigModel"
      >
      </TabTbody>
    </table>
  </div>
</template>

<script setup>
import TabTbody from "./tab_tbody.vue";
import { reactive, ref, computed, toRefs } from "@vue/reactivity";
import { 取随机数 } from "../../../api";
import { 属性 } from "../../../../assets/数据";
import { watch } from "@vue/runtime-core";

const props = defineProps({ blob: Object, update: Object });

// 数据库管理
function 数据库() {
  const data = reactive({
    模糊搜索: "",
    db: [],
    bigModel: true,
    remoteEntry(tudo) {
      data.db = data.db.filter((v) => {
        // console.log(v, tudo, v !== tudo, 2222222222);
        return tudo.id !== v.id;
      });
      console.log("DB:删除数据", tudo);
    },
    addEntry() {
      const obj = {
        id: Date.now(),
        属性: 属性.取随机属性,
        长度: 1,
        地址: "0x" + 取随机数(50000).toString(16).toUpperCase(),
        自定义值: "",
        备注: "",
        序列: 0,
      };
      data.db.push(obj);
      console.log("DB:添加数据", obj);
    },
    fildb: computed(() => {
      // 因为计算属性中使用了 db 和 模糊搜索 因此他们发生变化就会执行
      // 写出配置
      const obj = {
        db: data.db,
        bigModel: data.bigModel,
      };
      localStorage.setItem("config", JSON.stringify(obj));

      console.log("数据发生变化", data.db);

      const arr = data.db.filter((p) => {
        if (data.模糊搜索) {
          let strs = "";
          for (const v of Object.entries(p)) {
            strs += v.join("\n");
          }
          // console.log(p, { ...p }, Object.entries(p), Object.entries({ ...p }));
          return strs.includes(data.模糊搜索);
        }
        return true;
      });

      return arr;
    }),
  });

  watch(
    () => props.update,
    (val) => {
      console.log("收到邻居数据更新db", val);
      data.bigModel = val.bigModel;
      data.db = val.db;
    }
  );

  function 读取配置() {
    // 读取配置
    try {
      const config = JSON.parse(localStorage.getItem("config"));
      // 判断对象是否为空
      if (config) {
        // console.log(JSON.stringify(config) !== "{}", 55555555);
        // console.log(config, config?.bigModel, 44444444444);
        data.db = config?.db ?? data.db;
        data.bigModel = config?.bigModel ?? data.bigModel;
      }
      // 兼容旧版
      const oldDB = localStorage.getItem("db");
      if (oldDB) {
        data.db = JSON.parse(oldDB ?? "[]");
        localStorage.removeItem("db");
      }
    } catch (error) {
      localStorage.removeItem("config");
    }
  }
  读取配置();

  return toRefs(data);
}
const { addEntry, remoteEntry, db, bigModel, fildb, 模糊搜索 } = 数据库();
const th = [
  // 序列,
  "属性",
  "长度",
  "地址",
  "自定义值",
  // "备注",
  "十六进制",
  "十进制",
  "提示",
  "功能",
];
</script>


<style lang="scss" scoped>
.样式功能按钮 {
  * {
    width: 400px;
    height: 100px;
    margin: 10px;
  }
}
</style>