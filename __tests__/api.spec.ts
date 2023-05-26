import { describe, expect, it } from "vitest";

import {
  cut,
  cutAll,
  cutForSearch,
  cutHMM,
  cutSmall,
  insertWord,
  tag,
  extract,
  textRankExtract,
} from "../src/index.js";

const sentence =
  "我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。";

describe("nodejieba", () => {
  it("cut", () => {
    expect(cut("今天天气很好，🙋 我们去郊游。")).toEqual([
      "今天天气",
      "很",
      "好",
      "，",
      "🙋",
      " ",
      "我们",
      "去",
      "郊游",
      "。",
    ]);

    expect(cut(sentence)).toEqual([
      "我",
      "是",
      "拖拉机",
      "学院",
      "手扶拖拉机",
      "专业",
      "的",
      "。",
      "不用",
      "多久",
      "，",
      "我",
      "就",
      "会",
      "升职",
      "加薪",
      "，",
      "当",
      "上",
      "C",
      "E",
      "O",
      "，",
      "走上",
      "人生",
      "巅峰",
      "。",
    ]);

    expect(cut("访问www.baidu.com进行搜索", true)).toEqual([
      "访问",
      "www",
      ".",
      "baidu",
      ".",
      "com",
      "进行",
      "搜索",
    ]);

    expect(cut(sentence, true)).toEqual([
      "我",
      "是",
      "拖拉机",
      "学院",
      "手扶拖拉机",
      "专业",
      "的",
      "。",
      "不用",
      "多久",
      "，",
      "我",
      "就",
      "会",
      "升职",
      "加薪",
      "，",
      "当上",
      "CEO",
      "，",
      "走上",
      "人生",
      "巅峰",
      "。",
    ]);
  });

  it("cutHMM", () => {
    expect(cutHMM(sentence)).toEqual([
      "我",
      "是",
      "拖拉机",
      "学院",
      "手",
      "扶",
      "拖拉机",
      "专业",
      "的",
      "。",
      "不用",
      "多久",
      "，",
      "我",
      "就",
      "会升",
      "职加薪",
      "，",
      "当上",
      "CEO",
      "，",
      "走上",
      "人生",
      "巅峰",
      "。",
    ]);
  });

  it("cutAll", () => {
    expect(cutAll("南京市长江大桥")).toEqual([
      "南京",
      "南京市",
      "京市",
      "市长",
      "长江",
      "长江大桥",
      "大桥",
    ]);

    expect(cutAll(sentence)).toEqual([
      "我",
      "是",
      "拖拉",
      "拖拉机",
      "学院",
      "手扶",
      "手扶拖拉机",
      "拖拉",
      "拖拉机",
      "专业",
      "的",
      "。",
      "不用",
      "多久",
      "，",
      "我",
      "就",
      "会升",
      "升职",
      "加薪",
      "，",
      "当上",
      "C",
      "E",
      "O",
      "，",
      "走上",
      "人生",
      "巅峰",
      "。",
    ]);
  });

  it("cutSmall", () => {
    expect(cutSmall("南京市长江大桥", 2)).toEqual([
      "南京",
      "市",
      "长江",
      "大桥",
    ]);
    expect(cutSmall("南京市长江大桥", 3)).toEqual(["南京市", "长江", "大桥"]);
    expect(cutSmall("南京市长江大桥", 4)).toEqual(["南京市", "长江大桥"]);
  });

  it("cutForSearch", () => {
    expect(cutForSearch(sentence)).toEqual([
      "我",
      "是",
      "拖拉",
      "拖拉机",
      "学院",
      "手扶",
      "拖拉",
      "拖拉机",
      "手扶拖拉机",
      "专业",
      "的",
      "。",
      "不用",
      "多久",
      "，",
      "我",
      "就",
      "会",
      "升职",
      "加薪",
      "，",
      "当",
      "上",
      "C",
      "E",
      "O",
      "，",
      "走上",
      "人生",
      "巅峰",
      "。",
    ]);
  });

  it("tag", () => {
    expect(tag(sentence)).toEqual([
      {
        tag: "r",
        word: "我",
      },
      {
        tag: "v",
        word: "是",
      },
      {
        tag: "n",
        word: "拖拉机",
      },
      {
        tag: "n",
        word: "学院",
      },
      {
        tag: "n",
        word: "手扶拖拉机",
      },
      {
        tag: "n",
        word: "专业",
      },
      {
        tag: "uj",
        word: "的",
      },
      {
        tag: "x",
        word: "。",
      },
      {
        tag: "v",
        word: "不用",
      },
      {
        tag: "m",
        word: "多久",
      },
      {
        tag: "x",
        word: "，",
      },
      {
        tag: "r",
        word: "我",
      },
      {
        tag: "d",
        word: "就",
      },
      {
        tag: "v",
        word: "会",
      },
      {
        tag: "v",
        word: "升职",
      },
      {
        tag: "nr",
        word: "加薪",
      },
      {
        tag: "x",
        word: "，",
      },
      {
        tag: "t",
        word: "当上",
      },
      {
        tag: "eng",
        word: "CEO",
      },
      {
        tag: "x",
        word: "，",
      },
      {
        tag: "v",
        word: "走上",
      },
      {
        tag: "n",
        word: "人生",
      },
      {
        tag: "n",
        word: "巅峰",
      },
      {
        tag: "x",
        word: "。",
      },
    ]);
  });

  it("extract", () => {
    const result = extract(sentence, 5);

    expect(result).toEqual([
      {
        weight: 11.739204307083542,
        word: "CEO",
      },
      {
        weight: 10.8561552143,
        word: "升职",
      },
      {
        weight: 10.642581114,
        word: "加薪",
      },
      {
        weight: 10.0088573539,
        word: "手扶拖拉机",
      },
      {
        weight: 9.49395840471,
        word: "巅峰",
      },
    ]);
    expect(result.length).toEqual(5);
  });

  it("textRankExtract", () => {
    expect(textRankExtract(sentence, 5)).toEqual([
      {
        weight: 1,
        word: "当上",
      },
      {
        weight: 0.9898479330698993,
        word: "不用",
      },
      {
        weight: 0.9851260595435759,
        word: "多久",
      },
      {
        weight: 0.9830464899847804,
        word: "加薪",
      },
      {
        weight: 0.9802777682279076,
        word: "升职",
      },
    ]);
  });

  it("insertWord", () => {
    expect(cut("男默女泪")).toEqual(["男", "默", "女", "泪"]);

    insertWord("男默女泪");

    expect(cut("男默女泪")).toEqual(["男默女泪"]);
  });
});
