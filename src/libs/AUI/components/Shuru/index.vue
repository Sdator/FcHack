<template>
  <button class="add" @click="add">添加</button>
  <div class="inputs" v-for="(v, k) of arr" :key="k">
    属性：<input type="text" v-model="v.属性" />

    长度：<input type="number" v-model.number="v.长度" />

    地址：<input type="text" v-model="v.地址" />

    数值：<label for="">{{ v.数值 }}</label>
    <button @click="del(v, k)">❌</button>
  </div>
</template>

<script>
// 组件模式无法在组件内推导 name 需要另外创建一个 script 标签导出 name
export default { name: "Shuru" };
</script>

<script setup>
import { defineProps, reactive, ref } from "vue";
import { 属性 } from "../../../../assets/数据.js";

const 取随机数 = (max) => Math.floor(Math.random() * max);

// 条目基础属性
const obj = {
  属性: "力量",
  长度: 1,
  地址: "0x10",
  数值: 500,
};
// 绑定的数组
const arr = reactive([obj]);
let 计数器 = 0;

const add = (v) => {
  const dan = Object.assign({}, obj);
  dan.属性 = 属性[取随机数(属性.length)];

  dan.数值 = 取随机数(500);
  dan.地址 = "0x" + 取随机数(100000).toString(16).toUpperCase();

  // 使用最后一次设置的长度
  dan.长度 = arr[计数器].长度;

  console.log(arr, dan);
  arr.push(dan);
  计数器 += 1;

  // console.log(JSON.stringify(arr));
};

const del = (a, v) => {
  计数器 -= 1;
  // arr.pop(this);
  arr.splice(v, 1);
  console.log(a, v, 计数器);
};

// 导出名字一定要对上 不然是无法使用组件
</script>

<style lang="scss" scoped>
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
  * {
    margin: 10px;
  }
}
</style>
