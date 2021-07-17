<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <!--
      @blob 文件二进制讀取完畢往外发送事件
    -->
    <InFiles @blob="envblob" />
    <br />
    <button class="add" @click="add()">添加</button>
    <!--
      :blob 给组件传入的绑定数据
      data  绑定对象条目
      @Del  自定义事件 子组件被点击往外面传递
     -->
    <Tiaomu
      :blob="blob"
      v-for="(v, k) of db"
      :key="k"
      :data="v"
      @del="del(k)"
    />
  </div>
</template>

<script>
// 导入组件内部使用 不全局注册
import Tiaomu from "./tiaomu.vue";
import InFiles from "./inFiles.vue";

export default {
  // 逐渐名称
  name: "Shuru",
  // 注册组件
  components: {
    Tiaomu,
    InFiles,
  },
};
</script>

<script setup>
import {
  defineProps,
  computed,
  ref,
  watch,
  reactive,
  toRef,
  toRefs,
} from "vue";

const data = {
  属性: "力量",
  长度: 1,
  地址: "0x10",
  自定义值: 500,
  原始值: 0,
  备注: "test",
};

const db = reactive([]);

function add() {
  db.push(data);
}
function del(num) {
  db.splice(num, 1);
  console.log("DB:删除数据", num);
}

watch(
  () => [...db],
  (n, o) => {
    console.log(n, o, "监听");
  }
);

const blob = ref();
/**
 * 子组件往外发送的自定义事件
 * 得到拖放窗返回的二进制数据
 */
function envblob(v) {
  blob.value = v;
}
</script>





<style lang="scss" scoped>
.add {
  width: 600px;
  height: 100px;
  margin: 10px auto;
}
// 总体框架
.shuru {
  // width: 1000px;
  height: 200px;
  margin: 50px auto;
  margin-left: 200px;
}
</style>>
