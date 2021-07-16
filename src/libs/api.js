import { 属性 } from "../../src/assets/数据.js";

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

const 属性类目 = `
力量
敏捷
智力
生命
魔法
法防
物防
魔抗
`
  .trim()
  .split("\n");

class FCDate {
  // 默认条目属性
  static defaultData = {
    属性: "力量",
    长度: 1,
    地址: "0x10",
    数值: 500,
  };

  // 静态属性 设置一个默认条目
  static DB = [FCDate.defaultData];

  constructor(db) {
    // FCDate.DB = db;
    //   单例模式
    // FCDate.T = FCDate.T ?? this;
    // return FCDate.T;
  }

  // 获取数据库条目数量
  get size() {
    return FCDate.DB.length;
  }
  // 返回数据库数组列表
  get list() {
    return FCDate.DB;
  }

  // 增加条目
  add(v) {
    if (v) v = Object.assign(FCDate.defaultData, v);
    //  需要利用 assign 函数来生成一个全新的数组 否则会因为引用关系出问题
    const 条目 = Object.assign(
      {},
      v ?? {
        属性: 属性类目[取随机数(属性类目.length)],
        // 长度: FCDate.DB[FCDate.DB.length - 1].长度,
        长度: 1,
        地址: "0x" + 取随机数(100000).toString(16).toUpperCase(),
        数值: 取随机数(500),
      }
    );
    // 插入条目
    FCDate.DB.push(条目);
    console.log("DB:插入数据");
  }

  // 删除条目
  // 默认删除最后一个
  del(num = this.size - 1) {
    FCDate.DB.splice(num, 1); // 移除指定位置数组
    console.log("DB:删除数据");
  }
}

// const db = new FCDate();
// db.add();
// db.add({ 长度: 10086 });
// db.add({ 长度: 55 });
// console.log(db.list, db.size, 2222);

export { 读取文件二进制, FCDate };
