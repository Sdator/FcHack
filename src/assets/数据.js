import { 取随机数 } from "../libs/api";

class 属性 {
  static 属性类目 = `
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
    .split("\n")
    .map((v) => v.trim());

  static get 取随机属性() {
    return 属性.属性类目[取随机数(属性.属性类目.length)];
  }
}

export { 属性 };
