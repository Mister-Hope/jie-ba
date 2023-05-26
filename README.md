# jie-ba "结巴"分词的 Node.js 版本 [English](README_EN.md)

## 介绍

`jie-ba`是"结巴"中文分词的 Node.js 版本实现，由[CppJieba]提供底层分词算法实现，是兼具高性能和易用性两者的 Node.js 中文分词组件。

## 特点

- 词典载入方式灵活，无需配置词典路径也可使用，需要定制自己的词典路径时也可灵活定制。
- 底层算法由 C++ 实现，高性能。
- 支持多种分词算法，各种分词算法见 [CppJieba] 的 README.md 介绍。
- 支持动态补充词库。

## 下载

```sh
npm install jie-ba
```

由于默认源速度很慢并且 GitHub 访问不稳定，可以使用国内镜像，命令如下：

```sh
npm install jie-ba --registry=https://registry.npmmirror.com --jie-ba_binary_host_mirror=https://registry.npmmirror.com/-/binary/nodejieba/
```

## 用法

```js
import { cut } from "jie-ba";

const result = cut("南京市长江大桥");
console.log(result);
//["南京市","长江大桥"]
```

更详细的其他用法请看 [测试案例](__tests__/api.spec.ts)

### 配置词典载入

如果没有主动调用词典函数时，则会在第一次调用 `cut` 等功能函数时，自动载入默认词典。

如果要主动触发词典载入，则使用以下函数主动触发。

```js
import { load } from "jie-ba";

load();
```

以上用法会自动载入所有默认词典。

如果需要载入自己的词典，而不是默认词典，你需要传递参数。

比如载入自己的用户词典:

```js
import { load } from "jie-ba";

load({
  userDict: "./test/testdata/userdict.utf8",
});
```

字典载入函数 load 的参数项都是可选的，如果没有对应的项则自动填充默认参数。
所以上面这段代码和下面这代代码是等价的。

```js
import {
  DEFAULT_DICT,
  DEFAULT_HMM_DICT,
  DEFAULT_IDF_DICT,
  DEFAULT_STOP_WORD_DICT,
  load,
} from "jie-ba";

load({
  dict: DEFAULT_DICT,
  hmmDict: DEFAULT_HMM_DICT,
  userDict: "./test/testdata/userdict.utf8",
  idfDict: DEFAULT_IDF_DICT,
  stopWordDict: DEFAULT_STOP_WORD_DICT,
});
```

#### 词典说明

- dict: 主词典，带权重和词性标签，建议使用默认词典。
- hmmDict: 隐式马尔科夫模型，建议使用默认词典。
- userDict: 用户词典，建议自己根据需要定制。
- idfDict: 关键词抽取所需的 idf 信息。
- stopWordDict: 关键词抽取所需的停用词列表。

### 词性标注

```js
import { tag } from "jie-ba";

console.log(tag("红掌拨清波"));
//[ { word: '红掌', tag: 'n' },
//  { word: '拨', tag: 'v' },
//  { word: '清波', tag: 'n' } ]
```

更详细的其他用法请看 [测试案例](__tests__/api.spec.ts)

### 关键词抽取

```js
import { extract, textRankExtract } from "jie-ba";

const topN = 4;

console.log(extract("升职加薪，当上CEO，走上人生巅峰。", topN));
//[ { word: 'CEO', weight: 11.739204307083542 },
//  { word: '升职', weight: 10.8561552143 },
//  { word: '加薪', weight: 10.642581114 },
//  { word: '巅峰', weight: 9.49395840471 } ]

console.log(textRankExtract("升职加薪，当上CEO，走上人生巅峰。", topN));
//[ { word: '当上', weight: 1 },
//  { word: '不用', weight: 0.9898479330698993 },
//  { word: '多久', weight: 0.9851260595435759 },
//  { word: '加薪', weight: 0.9830464899847804 },
//  { word: '升职', weight: 0.9802777682279076 } ]
```

更详细的其他用法请看 [test/demo.js](__tests__/api.spec.ts)

## Node.js 支持

- `v16`
- `v18`
- `v20`

[CppJieba]: https://github.com/yanyiwu/cppjieba.git
