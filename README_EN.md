# jie-ba [简体中文](README.md)

## Introduction

`jie-ba` provides chinese word segmentation for Node.js based on [CppJieba].

## Install

```sh
npm install jie-ba
```

Or with `npmmirror.com`:

```sh
npm install jie-ba --registry=https://registry.npmmirror.com --jie-ba_binary_host_mirror=https://registry.npmmirror.com/-/binary/nodejieba/
```

## Usage

```js
import { cut } from "jie-ba";

const result = cut("南京市长江大桥");
console.log(result);
//["南京市","长江大桥"]
```

See details in [test cases](__tests__/api.spec.ts)

### Initialization

Initialization is optional and will be executed once `cut` is called with the default dictionaries.

Loading the default dictionaries can be called explicitly by

```js
import { load } from "jie-ba";

load();
```

If a dictionary parameter is missing, its default value will be uesd.

#### Dictionary description

- dict: the main dictionary with weight and lexical tags, it's recommended to use the default dictionary
- hmmDict: hidden markov model, it's recommended to use the default dictionary
- userDict: user dictionary, it's recommended to modify it to your use case
- idfDict: idf information for keyword extraction
- stopWordDict: list of stop words for keyword extraction

### POS Tagging

```js
import { tag } from "jie-ba";

console.log(tag("红掌拨清波"));
//[ { word: '红掌', tag: 'n' },
//  { word: '拨', tag: 'v' },
//  { word: '清波', tag: 'n' } ]
```

See details in [test cases](__tests__/api.spec.ts)

### Keyword Extractor

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

See details in [test cases](__tests__/api.spec.ts)

## Node.js Support

- `v16`
- `v18`
- `v20`

## Performance

It is supposed to have the best performance out of all available Node.js modules.

[CppJieba]: https://github.com/yanyiwu/cppjieba.git
