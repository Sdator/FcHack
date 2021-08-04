<template>
  <tbody>
    <tr>
      <!-- <td>{{序列}}</td> -->
      <td><input type="text" v-model.trim="属性" /></td>
      <td><input type="number" v-model.number="长度" /></td>
      <td>
        <input
          class="zhong"
          type="text"
          v-model.trim="地址"
          placeholder="十六进制"
        />
      </td>
      <td>
        <input type="number" v-model="自定义值" placeholder="十进制" />
      </td>
      <!-- <td>
        <input
          class="zhong"
          type="text"
          v-model="备注"
          placeholder="详细描述"
        />
      </td> -->
      <td>
        <label>{{ 十六进制 }}</label>
      </td>
      <td>
        <label>{{ 十进制 }}</label>
      </td>

      <td>
        <label class="msg" :style="msgClass">{{ msg }}</label>
      </td>
      <!-- 往父组件抛出事件 并包含当前 数据对象条目 通过条目来过滤 -->
      <th><button @click="$emit('remote', id)">❌</button></th>
      <slot></slot>
    </tr>
  </tbody>
</template>


<script setup>
import { computed, defineProps, reactive, ref, watch, toRefs } from "vue";

// 暴露属性
const props = defineProps({
  blob: Object, //父组件传递进来的
  endian: Boolean, // 大小端
  data: Object, // 由于父组件传入的 props.data 是代理对象 可以使用监听函数
  bigModel: Boolean, // 大小端切换
});

const { id, 属性, 长度, 地址, 自定义值, 备注, 序列 } = toRefs(props.data);

// 处理提示信息和其样式
function msgSystem() {
  const data = reactive({
    classStatus: false,
    msgClass: computed(() => {
      return {
        color: data.classStatus ? "darkgreen" : "red",
        backgroundColor: data.classStatus ? "aquamarine" : "#000",
      };
    }),
    msg: computed(() => {
      if (!(props.blob instanceof ArrayBuffer)) {
        data.classStatus = false;
        return "还没有读入文件";
      }
      return data.classStatus ? "读取成功" : "地址超出范围";
    }),
  });
  return toRefs(data);
}
const { classStatus, msgClass, msg } = msgSystem();

// 封装一下才能读取
// const { 长度, 地址 } = props.data;
// const 传入数据 = reactive(props.data);
// const { 长度, 地址 } = toRefs(传入数据);

function 获取数据(显示模式 = false) {
  const blob = props.blob;

  // 是否 blob 是否 ArrayBuffer的实例
  if (!(blob instanceof ArrayBuffer)) return;

  // 转为十进制 检查地址是否正确
  let addr = 地址.value * 1;

  if (addr > blob.byteLength || 长度.value > 4) {
    classStatus.value = false;
    return;
  }
  classStatus.value = true;
  // console.log("数据更新", classStatus.value, blob, blob.byteLength);

  const view1 = new DataView(blob);
  let 数值 = 0;

  switch (长度.value) {
    case 1:
      数值 = view1.getUint8(addr);
      break;
    case 2:
      数值 = view1.getUint16(addr, props.bigModel);
      break;
    case 4:
      数值 = view1.getUint32(addr, props.bigModel);
      break;
    default:
      return;
  }

  return 显示模式
    ? /(.{2})(.{2})(.{2})(.{2})/g.exec(数值.toString(16).padStart(8, 0))
    : 数值;
}

const rawData = reactive({
  十六进制: computed(() => {
    return 获取数据(true);
  }),
  十进制: computed(() => {
    return 获取数据(false);
  }),
});

const { 十六进制, 十进制 } = toRefs(rawData);
</script>

<style lang="scss" scoped>
* {
  margin: 10px;
}
input {
  width: 70px;
  .zhong {
    width: 100px;
  }
}
.msg {
  width: 200px;
}
label {
  width: 150px;
}
</style>
