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

# sendLoginCode(phone: String!): Boolean — 给手机号发送验证码

1. 第一步先设计数据库需要存储哪些信息
2. 确定要保存的结构后设置对应 Schema
3. 明确接口是什么类型，查询操作用 get - query,操作类型用 post\put\delete - mutations
4. 定义 mutation 或者 query 信息，在 rootMuataion 或者 RootQuery 中声明接口名称、IO 参数
5. 定义需要返回的数据类型，简单类型直接返回即可

## 定义用户表

```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, '用户名是必填项'] },
    phone: { type: String, unique: true, required: [true, '手机号是必填项'] },
    password: { type: String, default: '123456' },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    loginCode: String,
    loginCodeExpires: Date,
  },
  {
    timestamps: true, // ✅ 自动添加 createdAt 和 updatedAt 字段
  }
)

module.exports = mongoose.model('User', userSchema)
```
