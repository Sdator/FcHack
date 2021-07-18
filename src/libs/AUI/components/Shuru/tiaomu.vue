<template>
  <div class="inputs">
    属性：<input type="text" v-model="data.属性" />

    长度：<input type="number" v-model.number="data.长度" />

    地址：<input type="text" v-model="data.地址" />

    自定义值：<input type="text" v-model="data.自定义值" />

    原始值：<label>{{ data.原始值 }}</label>

    提示：<label :style="{ color: classStatus ? 'darkgreen' : 'red' }">{{
      classStatus ? "读取成功" : "地址超出范围"
    }}</label>

    <!-- 往父组件传递一个自定义事件 -->
    <button @click="$emit('del')">❌</button>
  </div>
</template>

<script setup>
import {
  defineProps,
  reactive,
  ref,
  toRefs,
  vModelCheckbox,
  watch,
  watchEffect,
} from "vue";

const msg = ref("test");

// 样式
const classStatus = ref(true);

// 暴露属性
const props = defineProps({
  //父组件传递进来的
  blob: Object,
  // 大小端
  endian: Boolean,
  // 由于父组件传入的 props.data 是代理对象 可以使用监听函数
  data: {
    type: Object,
    default: {
      属性: "力量",
      长度: 1,
      地址: "0x10",
      原始值: 500,
      自定义值: 500,
      备注: "test",
    },
  },
});

// 读取修改二进制
function crudBlob(obj) {
  if (!props.blob) return;
  const blob = props.blob.value;
  // 转为十进制
  let 地址 = new Number(obj.地址);
  if (地址 > blob.byteLength) {
    classStatus.value = false;
    return;
  }
  classStatus.value = true;
  console.log("数据更新", blob, blob.byteLength);

  const view1 = new DataView(blob);
  let 数值 = 0;
  switch (obj.长度) {
    case 1:
      数值 = view1.getUint8(地址);
      break;
    case 2:
      数值 = view1.getUint16(地址);
      break;
    case 4:
      数值 = view1.getUint32(地址);
      break;
    default:
      return;
  }
  props.data.原始值 = 数值;
  console.log(view1, 22222222);
}

watch(props.data, (obj) => {
  crudBlob(obj);
  // console.log(props.data, obj, 111111111122222);
});

// watch(自定义值, (obj) => {
//   console.log("地址变了", obj);
// });
</script>

<style lang="scss" scoped>
* {
  margin: 10px;
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
