<template>
  <div class="inputs">
    属性：<input type="text" v-model="data.属性" />

    长度：<input type="number" v-model.number="data.长度" />

    地址：<input type="text" v-model="data.地址" />

    数值：<label for="">{{ data.数值 }}</label>
    <!-- 往父组件传递一个自定义事件 -->
    <button @click="$emit('eDel')">❌</button>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, toRefs, watch } from "vue";

// 暴露属性
const props = defineProps({
  //父组件传递进来的
  blob: Object,
  // 大小端
  endian: Boolean,

  data: {
    type: Object,
    default: {
      属性: "力量",
      长度: 1,
      地址: "0x10",
      数值: 500,
    },
  },
});

// 由于父组件传入的二进制数据是代理对象 可以使用监听函数
watch(props.data, (v) => {
  if (!props.blob) return;
  // 转为十进制
  let 地址 = new Number(v.地址);
  if (地址 > props.blob.byteLength) return;

  const view1 = new DataView(props.blob.value);
  let 数值 = 0;
  switch (v.长度) {
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
  v.数值 = 数值;
  console.log(view1, 22222222);
});
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
