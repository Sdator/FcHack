<template>
  <tbody :class="classTudo">
    <tr>
      <!-- <td>{{序列}}</td> -->
      <td><input type="text" v-model="属性" /></td>
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
        <span>{{ 十六进制 }}</span>
      </td>
      <td>
        <span>{{ 十进制 }}</span>
      </td>

      <td>
        <span class="msg" :style="msgClass">{{ msg }}</span>
      </td>
      <!-- 往父组件抛出事件 并包含当前 数据对象条目 通过条目来过滤 -->
      <th><button @click="emits('remote', id)">❌</button></th>
      <slot></slot>
    </tr>
  </tbody>
</template>


<script setup>
import { computed, reactive, ref, watch, toRefs } from "vue";

const emits = defineEmits(["remote"]);
const props = defineProps({
  blob: Object, //父组件传递进来的
  endian: Boolean, // 大小端
  data: Object, // 由于父组件传入的 props.data 是代理对象 可以使用监听函数
  bigModel: Boolean, // 大小端切换
});

const { id, 属性, 长度, 地址, 自定义值, 备注, 序列 } = toRefs(props.data);

const classTudo = ref(null);

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
  // console.log(数值, 数值.toString(16), 11111);

  return 显示模式
    ? /(.{2})(.{2})(.{2})(.{2})/g.exec(数值.toString(16).padStart(8, 0))
    : 数值;
}

const rawData = reactive({
  十六进制: computed(() => {
    let arr = 获取数据(true);
    // 解决首次运行数据为空报错  计算属性创建后会自动执行一次
    if (!arr) return;
    return arr.map((a) => a.toUpperCase());
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

tbody {
  // 当读取成功时
  .tudoRedSucceed {
    background-color: darkgreen;
  }
  // 当读取失败时
  .tudoRedFail {
    background-color: darkgray;
  }
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
span {
  width: 150px;
}
</style>
