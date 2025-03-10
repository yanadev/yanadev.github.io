---
slug: graphql-api
title: QraphQL API
authors: yana
tags: ['graphql', 'api']
date: 2025-03-10
draft: true
---

#   选择 GraphQL 作为 API 方案优势

- 灵活 - 客户端可以请求所需具体字段，不受服务端与定义的响应格式限制
- 高效 - 避免 restful 中可能发生的 over-fetching 多取无用数据 和 under-fetching 少取导致多次请求
- 单一端点 所有请求一个端点处理，简化路由管理
- 实时数据 可通过 subscription 实现实时数据更新

# 主要概念

1. schema 定义
2. resolvers 实现查询与变更逻辑
3. query 获取数据
4. mutation 修改数据
5. subscription 实时获取数据（websocket）

# 实战

Node.js 中使用 Apollo Server 来搭建一个 GraphQL 服务

## 技术栈

- ✅ Apollo Server（GraphQL 服务器）
- ✅ Express（HTTP 服务器）
- ✅ MongoDB + Mongoose（数据库和 ORM）
- ✅ dotenv（管理环境变量）

# 初始化

```zsh
mkdir surprise-gift-api && cd surprise-gift-api

npm init -y  # 初始化 package.json

npm install apollo-server-express express mongoose dotenv
```

# 项目结构

```zsh
surprise-gift-api/
│── node_modules/       # 依赖
│── src/
│   ├── models/         # 数据库模型
│   │   ├── User.js
│   ├── resolvers/      # 解析器（Resolvers）
│   │   ├── index.js
│   ├── schemas/        # GraphQL Schema
│   │   ├── index.js
│   ├── config/         # 配置
│   │   ├── db.js
│   ├── server.js       # 入口文件
│── .env                # 环境变量
│── package.json        # 依赖管理
│── .gitignore          # 忽略文件

```

# 连接 MongoDB （src/config/db.js）

```js
const mongoose = require('mongoose')
require('dotenv').config() // 读取 .env 变量

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    process.exit(1)
  }
}

module.exports = connectDB
```

> 在 .env 里添加数据库连接字符串

```js
MONGO_URI=mongodb://localhost:27017/mygraphqlapi
```

> question: MONGO_URI 在哪里获取？

1. 本地集群默认： mongodb://localhost:27017/mygraphqlapi
2. mygraphqlapi 是对应的数据库名称

---

1. mongodb atlas 官网注册登陆
2. 创建免费集群 shared cluster
3. database access 中添加用户（用户名和密码）
4. network access 允许你的 IP 访问（选择 0.0.0.0/0 允许所有 IP）
5. connect/drivers/node.js 可以看到一个类似的连接地址

```zsh
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/mygraphqlapi?retryWrites=true&w=majority

# 将 your_username 和your_password 替换成你 databse access 中创建的用户和密码
```

# 创建 Mongoose 数据模型

## 在 src/models/User.js 里定义一个用户模型：

```js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
})

module.exports = mongoose.model('User', UserSchema)
```

## 在 src/schemas/index.js 里定义 Schema：

```js
const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User
  }
`

module.exports = typeDefs
```

## 在 src/resolvers/index.js 里编写解析逻辑：

```js
const User = require('../models/User')

const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUser: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      const user = new User({ name, email, age })
      await user.save()
      return user
    },
  },
}

module.exports = resolvers
```

## 在 src/server.js 里搭建 Express + Apollo Server：

```js
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const connectDB = require('./config/db')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')
require('dotenv').config()

// 连接数据库
connectDB()

const app = express()

const server = new ApolloServer({ typeDefs, resolvers })

;(async () => {
  await server.start()
  server.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server running at http://localhost:4000/graphql')
  })
})()
```

## 运行项目

```sh
# 启动 MongoDB
mongod --dbpath /path/to/mongodb/data
# 或者使用 docker 启动
docker run -d -p 27017:27017 --name mongodb mongo

# 启动 API 服务器(如果是用 altas，直接启动即可)
node src/server.js
```

## 测试 api

### 直接浏览器

1. 正确启动项目之后，在终端中会显示 `http://localhost:4000/graphql`
2. 点击跳转之后，可以直接用 浏览器测试 api 服务是否正常（熟悉 graphql 语法）

```graphql
# Operation 中输入以下创建逻辑
# _id 是默认生成的主键

mutation ($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    _id
    name
    email
  }
}

# variables 中输入对应的变量
# run 运行脚本，测试是否正确创建用户
```

![createUser](createUser.png)

### curl 测试

```sh
curl -X POST http://localhost:4000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "{ users { _id name email } }"}'

```

### postman

1. 打开 postman ，选择 post
2. 输入 url http://localhost:4000/graphql
3. body 选择 `raw`, 格式选择 `JSON`

```json
{
  "query": "{ users { _id name email } }"
}
```

4. send 返回数据则正常

### 前端中发起请求

```js
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      mutation($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          _id
          name
          email
        }
      }
    `,
    variables: {
      name: '李四',
      email: 'lisi@example.com',
    },
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
```
