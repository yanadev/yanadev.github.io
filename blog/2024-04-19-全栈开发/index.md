---
slug: mern-stack-dev
title: MongoDB + Express + React + Node 开发
authors: yana
date: 2024-01-11
tags: ['mongodb', 'express', 'node', 'React']
draft: true
---

## 技术选型

- 前端框架：React
- 后端框架：Express.js + Node.js
- 数据库：MongoDB

## 项目搭建

### 利用常用的脚手架 create-react-app 和 express-generator 快速搭建项目

```shell
# 创建项目目录
mkdir surprise-box
cd suprise-box

# 使用 create-react-app 创建 react 项目
npx create-react-app client

# 使用 express-generator 创建 express 后端
npx express-generator server
cd server
# 在 server 文件夹中安装依赖
npm install

# 回到项目根目录
cd ../

# 将 server 文件夹中的所有文件和子目录全部拷贝到项目根目录
cp -r server/* .

# 删除原来的 server 目录
rm -rf server
```

### 调整前端配置:支持前后端通信

:::tip

进入 client 文件夹，打开 package.json 文件更新 scripts 脚本

:::

```diff
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
+    "proxy": "http://localhost:5000/"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 项目启动

```shell
# 根目录下启动 express 后端
npm start

# 进入 client 目录启动前端项目
npm start
```

### 设置快速启动脚本

在项目根目录下新建 start.sh 文件

```bash
#!/bin/bash

# 启动 Express.js 后端
echo "Starting Express.js backend..."
yarn start &

# 等待 Express.js 后端启动完成
sleep 5

# 进入 client 目录并启动 React 前端
echo "Starting React frontend..."
cd client
yarn start
```

## 项目配置 mongodb

1. 安装 mongodb 依赖

```bash
yarn add mongodb
```

2. 根目录下创建 config 文件夹保存配置文件

config/dbConfig.js 设置数据库配置信息

```js
module.exports = {
  // 这是 MongoDB 连接字符串 URI
  uri: 'mongodb://localhost:27017/mydatabase',
  // 使用最新的连接器和拓扑检测器
  options: { useNewUrlParser: true, useUnifiedTopology: true },
}
```

3. 在 express 的 app.js （即根目录下的 app.js）中引入 dbConfig 配置文件

```js
// 引入所需模块
const createError = require('http-errors') // 用于创建 HTTP 错误
const express = require('express') // Express 框架
const path = require('path') // 处理文件路径
const cookieParser = require('cookie-parser') // 解析 cookie
const logger = require('morgan') // HTTP 请求日志记录器

// 引入 MongoDB 相关模块
const mongoose = require('mongoose') // MongoDB 驱动程序

// 引入路由模块
const indexRouter = require('./routes/index') // 主页路由
const usersRouter = require('./routes/users') // 用户路由

// 创建 Express 应用程序实例
const app = express()

// 连接 MongoDB 数据库
mongoose
  .connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB 连接成功'))
  .catch((err) => console.error('MongoDB 连接失败:', err))

// 设置视图引擎和视图文件夹路径
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 使用中间件
app.use(logger('dev')) // 使用 morgan 记录日志
app.use(express.json()) // 解析 JSON 请求体
app.use(express.urlencoded({ extended: false })) // 解析 URL 编码的请求体
app.use(cookieParser()) // 解析 cookie
app.use(express.static(path.join(__dirname, 'public'))) // 静态文件服务

// 使用路由
app.use('/', indexRouter) // 主页路由
app.use('/users', usersRouter) // 用户路由

// 处理 404 错误并转发到错误处理程序
app.use(function (req, res, next) {
  next(createError(404)) // 创建 404 错误并传递给错误处理程序
})

// 错误处理程序
app.use(function (err, req, res, next) {
  // 设置局部变量，仅在开发环境中提供错误信息
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 渲染错误页面
  res.status(err.status || 500) // 设置响应状态码
  res.render('error') // 渲染 error.jade 视图
})

// 导出 Express 应用程序实例
module.exports = app
```

4. 优化一下 app.js 文件

> 将路由、数据库、中间件的配置都抽离出来，以便后续维护

```js
/* app.js */
// 引入所需模块
const express = require('express')
const path = require('path')
const logger = require('morgan')

// 引入配置模块
const dbConfig = require('./config/database')
const routesConfig = require('./config/routes')
const middlewaresConfig = require('./config/middlewares')

// 创建 Express 应用程序实例
const app = express()

// 配置数据库连接
dbConfig.connect()

// 设置视图引擎和视图文件夹路径
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 使用中间件
app.use(logger('dev'))
middlewaresConfig.setup(app)

// 配置路由
routesConfig.setup(app)

// 导出 Express 应用程序实例
module.exports = app
```

```js
/* db.js */
// 引入所需模块
const mongoose = require('mongoose')

// 数据库连接配置
const dbConfig = {
  url: 'mongodb://localhost:27017/mydatabase', // MongoDB连接URL
  connect: function () {
    mongoose
      .connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.error('MongoDB connection error:', err))
  },
}

// 导出数据库连接配置
module.exports = dbConfig
```

```js
/* middlewares */
// 引入所需模块
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

// 中间件配置
const middlewaresConfig = {
  setup: function (app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../public')))
    // 可以添加更多中间件配置
  },
}

// 导出中间件配置
module.exports = middlewaresConfig
```

## MongoDB 数据库安装

[🔗MongoDB 安装地址](https://www.mongodb.com/try/download/community)

1. 安装完毕之后，打开 MongoDB compass 客户端
