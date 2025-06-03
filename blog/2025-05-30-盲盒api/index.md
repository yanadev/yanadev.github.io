---
slug: surprise-gift-api
title: 盲盒API
authors: yana
tags: [surprise]
draft: true
---

# 用户表

一个用户表，字段区别角色（role）

```js
{
  _id: ...,
  username: "...",
  email: "...",
  password: "...",
  role: "admin" | "client"  // 标识管理员或普通用户
}

```

# 需求

设计一个手机号+验证码登录（兼含隐式注册）接口，关键点是：

- 用户传手机号请求验证码
- 用户提交手机号+验证码登录
- 后端验证验证码，判断手机号是否已注册

  - 没注册就自动创建用户
  - 注册了就直接登录

- 返回统一的登录结果（比如 token、用户信息）

# 接口设计

- sendLoginCode(phone: String!): Boolean — 给手机号发送验证码

- loginWithCode(phone: String!, code: String!): User — 用手机号+验证码登录，未注册就自动注册
