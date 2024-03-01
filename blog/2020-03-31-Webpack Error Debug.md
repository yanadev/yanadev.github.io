---
slug: Webpack Error Debug
title: Webpack Error Debug
authors: yana
tags: [webpack, debug]
---


## Module not found: Error: Can't resolve ' XX ' in '  XXXX  '

::: tip 重新安装项目依赖
:::

```js
npm i XX
```

## [Vue warn]: Cannot find element: #app

:::tip 打包好的 js（webpack中的 `bundle.js`） 文件要最后引入，因为要先有 #app 挂载的 div 元素，Vue 才能获取相应的元素
:::

```js
原来的 JS 文件位置：<head><script src="/bundle.js"></script></head>
// ================== 修正后位置 =================
<body>
    <div id="app"></div>
    <!-- ...  -->
    <script src="/bundle.js"></script>
</body>
```

## webpack -p 打包报错

:::danger
npm ERR! file D:\Z-work space\DOC\reading_IT\webpack-study\package.json
npm ERR! code EJSONPARSE
npm ERR! JSON.parse Failed to parse json
npm ERR! JSON.parse Unexpected token / in JSON at position 223 while parsing near '...entBase src --hot", // 调试开发命令
npm ERR! JSON.parse     "dev1"...'
npm ERR! JSON.parse Failed to parse package.json data.
npm ERR! JSON.parse package.json must be actual JSON, not just JavaScript.
:::

:::tip package.json 文件中不能添加 注释 ' // '
:::

```js
JSON 文件中不能添加注释 
// 很多人利用注释来制定解析规则，这破坏了互操作性（Interoperability）,因此将其剔除
```
