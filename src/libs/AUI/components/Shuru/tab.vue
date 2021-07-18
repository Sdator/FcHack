<template>
  <button class="add" @click="add()">添加</button>

  <table>
    <thead>
      <tr>
        <th v-for="(name, k) of th" :key="k">{{ name }}</th>
      </tr>
    </thead>
    <TabTbody
      :blob="blob"
      v-for="(v, k) of db"
      :key="k"
      :data="v"
      @remote="remoteTodo(k)"
    />
  </table>
</template>

<script>
import TabTbody from "./tab_tbody.vue";

export default {
  name: "Tab",
  components: { TabTbody },
};
</script>

<script setup>
import { defineProps, watch, reactive } from "vue";

const th = reactive(["  属性", "长度", "地址", " 原始值", "自定义值", "备注"]);
const db = reactive([]);

const porps = defineProps({
  blob: Object,
});

function add() {
  db.push({
    属性: "力量",
    长度: 1,
    地址: "0x10",
    addr: 100,
    自定义值: 500,
    原始值: 0,
    备注: "test",
  });
  console.log(db, "DB");
}

function remoteTodo(key) {
  db.splice(key, 1);
  console.log("DB:删除数据");
}

watch(
  () => [...db],
  (n, o) => {
    console.log(n, o, "监听");
  }
);
</script>

<style lang="scss" scoped>
.add {
  width: 600px;
  height: 100px;
  margin: 10px auto;
}
</style>