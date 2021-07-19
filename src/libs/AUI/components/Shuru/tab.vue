<template>
  <div class="样式功能按钮">
    <button class="add" @click="addTodo">添加</button>
    <input type="text" v-model="模糊搜索" placeholder="模糊搜索" />
  </div>
  <table>
    <thead>
      <tr>
        <th v-for="(name, k) of th" :key="k">{{ name }}</th>
      </tr>
    </thead>
    <TabTbody
      :blob="blob"
      v-for="(v, k) of fildb"
      :key="v.id"
      :data="v"
      @remote="remoteTodo"
    >
      {{ v.id }}
    </TabTbody>
  </table>
</template>

<script>
import TabTbody from "./tab_tbody.vue";
import { defineProps, watch, reactive, ref, computed } from "vue";
import { 属性 } from "../../../../assets/数据";
import { 取随机数 } from "../../../api";

export default {
  name: "Tab",
  components: { TabTbody },
  props: {
    blob: Object,
  },
  data() {
    return {
      db: [],
      key: 0,
      th: ["属性", "长度", "地址", "自定义值", "备注", "原始值", "提示"],
      模糊搜索: "",
    };
  },
  methods: {
    addTodo() {
      this.db.push({
        id: this.key++,
        属性: 属性.取随机属性,
        长度: 1,
        地址: "0x" + 取随机数(50000).toString(16).toUpperCase(),
        自定义值: 0,
        备注: "",
      });
      console.log(this.db, "DB");
    },
    remoteTodo(tudo) {
      this.db = this.db.filter((v) => {
        // console.log(v, tudo, v !== tudo, 2222222222);
        return tudo !== v;
      });
      console.log("DB:删除数据", tudo);
    },
  },
  computed: {
    fildb() {
      console.log(this.db, "变化了");
      return this.db.filter((p) => {
        if (this.模糊搜索) {
          let strs = "";
          for (const v of Object.entries(p)) {
            strs += v.join("\n");
          }
          console.log(p, { ...p }, Object.entries(p), Object.entries({ ...p }));
          return strs.includes(this.模糊搜索);
        }
        return true;
      });
    },
  },
};
</script>

<script setup>
// import { defineProps, watch, reactive, ref, computed } from "vue";
// import { 属性 } from "../../../../assets/数据";

// 表格字段
// const th = reactive([
//   "属性",
//   "长度",
//   "地址",
//   "自定义值",
//   "备注",
//   "原始值",
//   "提示",
// ]);
// 表格数据
// let db = reactive([]);
// const 模糊搜索 = ref();

// const porps = defineProps({
//   blob: Object,
// });

// 条目过滤器  普通版本
// const fildb = computed(() => {
//   console.log(db, "变化了");
//   return db.filter((p) => {
//     if (模糊搜索.value) {
//       let strs = "";
//       for (const v of Object.entries(p)) {
//         strs += v.join("\n");
//       }
//       // console.log(p, { ...p }, Object.entries(p), Object.entries({ ...p }));
//       //   return JSON.stringify(p).includes(模糊搜索.value);
//       // console.log(strs);
//       return strs.includes(模糊搜索.value);
//     }
//     return true;
//   });
// });

let time = {};
const 计时器 = (t = 1000) => {
  return new Promise((res) => {
    clearTimeout(time);
    time = setTimeout(() => {
      res();
    }, t);
  });
};
// const fildb = ref(db);
// 条目过滤器  异步版本
// watch([模糊搜索], async (a, v) => {
//   if (a || a != v) {
//     await 计时器(1000).then(() => {
//       console.log(模糊搜索, 55555);
//       fildb.value = db.filter((p) => {
//         if (模糊搜索.value) {
//           let strs = "";
//           for (const v of Object.entries(p)) {
//             strs += v.join("\n");
//           }
//           return strs.includes(模糊搜索.value);
//         }
//         return true;
//       });
//     });
//     return;
//   }
//   fildb.value = db;
// });

// let key = 0;
// function add() {
//   db.push({
//     id: key++,
//     属性: 属性.取随机属性,
//     长度: 1,
//     地址: "0x10",
//     自定义值: 0,
//     备注: "",
//   });
//   console.log(db, "DB");
// }
// function remoteTodo(tudo) {
//   // 数据变化了但是没有更新
//   // db = reactive(
//   // );
//   // db.splice(k, 1);
//   db = db.filter((v) => {
//     console.log(v, tudo, v !== tudo, 2222222222);
//     // return v.id !== id;

//     return tudo !== v;
//   });
//   console.log("DB:删除数据", tudo);
// }
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