---
slug: surprise-gift-frontend
title: 盲盒项目记录
authors: yana
tags: [react, nextjs]
draft: true
---

# 项目搭建

```zsh
# 项目初始化
npx create-next-app@latest surprise-gift-frontend

# 进入项目目录
cd surprise-gift-frontend
```

# 项目结构

- /app 包含所有路由和组件
- /app/lib 工具函数
- /app/ui 所有 UI 组件
- /public 静态资源
- 配置文件

# 路由模式

Next.js 支持两种结构：

- Pages 路由模式：这是 Next.js 的经典方式，所有页面都在 pages/ 目录下。
- App 路由模式：这是 Next.js 13 引入的新特性，页面和布局会放在 app/ 目录下

# 无 API 情况下页面数据调试

- 使用 JSON 或者 JS 对象的占位符数据
- 使用 mockAPI 等三方服务

# 登录模块

需求：

1. 输入手机号、验证码
2. 登录成功
3. 登录失败
4. 验证码重新发送

需要安装依赖

- react-hook-form — 表单管理库
- @hookform/resolvers — 与 react-hook-form 兼容的验证解析器
- zod ts优先的验证库，验证基础、复杂数据结构

```zsh
npm install react-hook-form zod @hookform/resolvers
```

- daisyui 组件库

```zsh
npm i -D daisyui@latest
```

```js
// tailwind.config.js
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
```