<template>
  <button class="add" @click="add">添加</button>
  <div class="inputs" v-for="(v, k) of data" :key="k" ref="fileblob">
    属性：<input type="text" v-model="v.属性" />

    长度：<input type="number" v-model.number="v.长度" />

    地址：<input type="text" v-model="v.地址" />

    数值：<label for="">{{ v.数值 }}</label>
    <button @click="del(v, k)">❌</button>
  </div>
</template>

<script>
// 组件模式无法在组件内推导 name 需要另外创建一个 script 标签导出 name
// 导出名字一定要对上 不然是无法使用组件
export default { name: "Shuru" };
</script>


<script setup>
import { defineProps, reactive, ref, watch } from "vue";
import { FCDate } from "../../../api.js";

// 创建数据库 代入初始列表
// const db = new FCDate();
// const arr = ref(db.list);

// 暴露属性
const props = defineProps({
  data: Array,
  db: Object,
});

// ===================
// 事件
// ====
// 新增两个代理事件 来手动触发对象函数
// 通过 Object.assign 返回一个新对象实现更新 vue代理属性 否则vue无法捕获到更新信息
const add = () => {
  props.db.add();
  // arr.value = Object.assign({}, db.list);
};

// const del = (v, k) => {
//   console.log(v);
//   db.del(k);
//   // arr.value = Object.assign({}, db.list);
// };
</script>

<style lang="scss" scoped>
* {
  margin: 10px;
}

.add {
  width: 600px;
  height: 100px;
  margin: 10px auto;
}
.inputs {
  input {
    width: 90px;
  }
  label {
    width: 150px;
  }
}
</style>
