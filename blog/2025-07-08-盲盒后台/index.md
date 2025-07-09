---
slug: surprise-gift-admin
title: 盲盒后台
authors: yana
tags: [surprise]
draft: true
---

# 初始化

## 项目初始化

```sh
$ npm create vite@latest surprise-gift-admin --template react

> npx
> create-vite surprise-gift-admin react

│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + SWC
│
◇  Scaffolding project in F:\VSProjects\2025\surprise-gift-admin...
│
└  Done. Now run:

  cd surprise-gift-admin
  npm install
  npm run dev

```

执行 `npm install` 提示以下信息

```sh
$ npm install
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'vite@7.0.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || >=22.12.0' },
npm warn EBADENGINE   current: { node: 'v18.20.4', npm: '10.7.0' }
npm warn EBADENGINE }

added 150 packages, and audited 151 packages in 2m

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

需要更新 node 版本，本地使用 nvm 重新安装一个新的版本然后启动即可

```sh
nvm install 22.12.0
npm run dev
```

## 引入 UI 框架 antd-mobile

安装 antd-mobile 的时候提示 react19 存在兼容问题，因此将 react 退到 18

```sh
npm install react@18.2.0 react-dom@18.2.0
```

重新安装 antd-mobile

```sh
npm install antd-mobile
```

安装完毕直接引入组件即可使用，antd-mobile 会自动加载 css 文件

```tsx
import { Button } from 'antd-mobile'
```

## 引入 css 处理器

```sh
npm install less less-loader
```
