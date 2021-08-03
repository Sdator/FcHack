<template>
  <div class="样式功能按钮">
    <button class="add" @click="addTodo">添加</button>
    <input type="text" v-model="模糊搜索" placeholder="模糊搜索" />
  </div>

  <!-- <label>{{ bigModel ? "大端:" : "小端：" }}</label> -->

  大小端：<input type="checkbox" v-model="bigModel" />

  <br />
  <br />

  <table>
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
      @remote="remoteTodo"
      :bigModel="bigModel"
    >
      {{ v.id }}
    </TabTbody>
  </table>
</template>

<script setup>
import TabTbody from "../tab_item.vue";
</script>

<script>
import { 属性 } from "../../../../../assets/数据";
import { 取随机数 } from "../../../../api";
import { reactive, toRef } from "@vue/reactivity";

export default {
  props: {
    blob: Object,
  },
  data() {
    return {
      db: [],
      bigModel: true,
      key: 0,
      th: [
        "属性",
        "长度",
        "地址",
        "自定义值",
        "备注",
        "十六进制",
        "十进制",
        "提示",
      ],
      模糊搜索: "",
    };
  },
  created() {
    // 读取配置
    const config = JSON.parse(localStorage.getItem("config"));
    // 判断对象是否为空
    if (config) {
      console.log(JSON.stringify(config) == "{}", 55555555);
      console.log(config, config?.bigModel, 44444444444);
      this.db = config?.db ?? this.db;
      this.bigModel = config?.bigModel ?? this.bigModel;
    }
  },
  methods: {
    addTodo() {
      const data = {
        id: this.key++,
        属性: 属性.取随机属性,
        长度: 1,
        地址: "0x" + 取随机数(50000).toString(16).toUpperCase(),
        自定义值: "",
        备注: "",
      };

      this.db.push(data);

      console.log("DB:添加数据", data);
    },
    remoteTodo(tudo) {
      this.db = this.db.filter((v) => {
        // console.log(v, tudo, v !== tudo, 2222222222);
        return tudo.id !== v.id;
      });
      console.log("DB:删除数据", tudo);
    },
  },
  computed: {
    // 因为计算属性中使用了 db 和 模糊搜索 因此他们发生变化就会执行
    fildb() {
      // 写出配置
      const data = {
        db: this.db,
        bigModel: this.bigModel,
      };
      localStorage.setItem("config", JSON.stringify(data));

      return this.db.filter((p) => {
        if (this.模糊搜索) {
          let strs = "";
          for (const v of Object.entries(p)) {
            strs += v.join("\n");
          }
          // console.log(p, { ...p }, Object.entries(p), Object.entries({ ...p }));
          return strs.includes(this.模糊搜索);
        }
        return true;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.样式功能按钮 {
  * {
    width: 400px;
    height: 100px;
    margin: 10px;
  }
}

.showModel {
  width: 10px;
  height: 10px;
}
</style>