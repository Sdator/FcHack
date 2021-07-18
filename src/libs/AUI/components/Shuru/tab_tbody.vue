<template>
  <tbody>
    <tr>
      <td><input type="text" v-model="data.属性" /></td>
      <td><input type="number" v-model.number="data.长度" /></td>
      <td><input type="text" v-model="data.地址" /></td>
      <td>
        <input type="text" v-model="data.自定义值" placeholder="修改的值" />
      </td>
      <td>
        <label>{{ data.原始值 }}</label>
      </td>
      <td>
        <label :style="msgClass">{{ msg }}</label>
      </td>
      <th><button @click="$emit('remote')">❌</button></th>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TabTbody",
};
</script>



<script setup>
import { computed, defineProps, reactive, ref, watch, toRefs } from "vue";

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
      addr: 200,
    },
  },
});

// 样式
const classStatus = ref(false);

// 提示信息 样式值
const msgClass = computed(() => {
  return {
    color: classStatus.value ? "darkgreen" : "red",
    backgroundColor: classStatus.value ? "aquamarine" : "#000",
  };
});

// 提示信息
const msg = computed(() => {
  if (!props.blob) {
    classStatus.value = false;
    return "还没有读入文件";
  }
  return classStatus.value ? "读取成功" : "地址超出范围";
});

// const msgSystem = reactive({
//   classStatus: ref(false),
//   msgClass: {
//     color: classStatus.value ? "darkgreen" : "red",
//     backgroundColor: classStatus.value ? "aquamarine" : "#000",
//   },
//   msg: computed(() => {
//     console.log(classStatus.value, 55555555555);

//     if (!props.blob) {
//       classStatus.value = false;
//       return "还没有读入文件";
//     }
//     return classStatus.value ? "读取成功" : "地址超出范围";
//   }),
// });

// const { classStatus, msgClass, msg } = toRefs(msgSystem);

// 读取修改二进制
function crudBlob(obj) {
  if (!props.blob) return;
  const blob = props.blob.value;
  // 转为十进制
  let 地址 = new Number(obj.地址);
  console.log(地址, blob.byteLength, "长度检查");
  if (地址 > blob.byteLength) {
    console.log("大于");
    classStatus.value = false;
    return;
  }
  classStatus.value = true;

  console.log(classStatus.value, 22222222);
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

// 封装一下才能读取
const 传入数据 = reactive(props.data);
const { 长度, 地址 } = toRefs(传入数据);

// console.log(props.blob, props.blob.value, 5555555555);

watch([长度, 地址], ([len, addr]) => {
  if (!props.blob) return;
  const blob = props.blob;
  // 转为十进制
  let 地址 = new Number(addr);
  console.log(地址, blob.byteLength, "长度检查");

  if (地址 > blob.byteLength) {
    console.log("大于");
    classStatus.value = false;
    return;
  }

  classStatus.value = true;
  console.log("数据更新", classStatus.value, blob, blob.byteLength);
  const view1 = new DataView(blob);
  let 数值 = 0;
  switch (len) {
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
