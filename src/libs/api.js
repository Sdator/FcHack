import { 属性 } from "../../src/assets/数据.js";

// 防抖
export function debounce(time = 1000) {
  let t;
  return function (fn) {
    // 获取参数 和 保存当前对象
    const args = arguments;
    const that = this;
    // 清除上一次延时器
    clearTimeout(t);
    t = setTimeout(() => {
      console.log(that, 4444444);
      // 调用时传递
      fn.apply(that, args);
    }, time);
  };
}

function fileDownload(content, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}

function download(data, name) {
  const url = URL.createObjectURL(
    new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  );
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function 取随机数(max) {
  return Math.floor(Math.random() * max);
}

function 读取文件二进制(file) {
  return new Promise((res) => {
    // 初始化一个文件读取对象
    var reader = new FileReader();
    // 读取完成事件
    reader.onload = function (evt) {
      res(evt.target.result);
    };
    // 开始读取文件
    reader.readAsArrayBuffer(file);
  });
}

class FCDate {
  // 默认条目属性
  static defaultData = {
    属性: 属性.取随机属性,
    长度: 1,
    地址: "0x10",
    自定义值: 500,
    原始值: 0,
    备注: "test",
  };
  data = [FCDate.defaultData];

  constructor() {
    // 单例模式
    FCDate.T = FCDate.T ?? this;
    return FCDate.T;
  }
  /**
   * 获取数据库条目数量
   */
  get size() {
    return this.data.length;
  }
  /**
   * 返回数据库数组列表
   */
  get list() {
    return this.data;
  }

  /**
   * 增加条目
   * @param {object} obj
   */
  add(obj) {
    if (obj) obj = Object.assign(FCDate.defaultData, obj);
    //  需要利用 assign 函数来生成一个全新的数组 否则会因为引用关系出问题
    const 条目 = Object.assign(
      {},
      obj ?? {
        属性: 属性.取随机属性,
        // 长度: FCDate.DB[FCDate.DB.length - 1].长度,
        长度: 1,
        地址: "0x" + 取随机数(100000).toString(16).toUpperCase(),
        数值: 取随机数(500),
      }
    );
    // 插入条目
    this.data.push(条目);
    console.log("DB:插入数据");
  }

  /**
   * 删除条目
   * 移除指定位置数组
   * 默认删除最后一个
   * @param {number} num
   */
  del(num = this.size - 1) {
    this.data.splice(num, 1);
    console.log("DB:删除数据");
  }
}

const db = new FCDate();
// db.add();
// db.add({ 长度: 10086 });
// db.add({ 长度: 55 });
// console.log(db.list, db.size, 2222);

export { 读取文件二进制, db, FCDate, 取随机数, download };
