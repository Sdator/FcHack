<template>
  <!-- 外层创建一个总框架 方便操控整体样式 -->
  <div class="shuru">
    <!--
      @blob 文件二进制讀取完畢往外发送事件
    -->
    <InFiles @blob="envblob" />
    <br />
    <button class="add" @click="db.add()">添加</button>
    <!--
      :blob 给组件传入的绑定数据
      data  绑定对象条目
      @Del  自定义事件 子组件被点击往外面传递
     -->
    <Tiaomu
      :blob="blob"
      v-for="(v, k) of data"
      :key="k"
      :data="v"
      @del="db.del(k)"
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
import { FCDate, 取随机数 } from "../../../api";

// 新建实例 并绑定实例数据   ! 静态属性无法更新
const db = ref(new FCDate());
const data = ref(db.value.data);

watch(data.value, (n, o) => {
  console.log(n, o, "监听");
});

const blob = ref();
/**
 * 子组件往外发送的自定义事件
 * 得到拖放窗返回的二进制数据
 */
function envblob(v) {
  blob.value = v;
  // console.log(blob, blob.value, 666);

  // 由于事件传入的变量是 ref 对象可以直接监听
  // watch(v, (n, o) => {
  //   blob.value = v;
  //   console.log("监听blob");
  //   // console.log(n, o, "监听blob");
  // });
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
