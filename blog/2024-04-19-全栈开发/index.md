---
slug: mern-stack-dev
title: MERN 全栈项目搭建
authors: yana
date: 2024-05-06
tags: ['mongodb', 'express', 'node', 'React']
draft: true
---

## 技术选型

- 前端框架：React
- 后端框架：Express.js + Node.js
- 数据库：MongoDB

## 预期的项目结构

```bash
my-mern-project/   # 项目根目录
│
├── backend/       # 后端代码目录
│   ├── models/    # 数据模型目录
│   ├── routes/    # 路由目录(将 controllers 和 routes 合并到同一个目录，便与后续维护)
│   │   ├── userRoutes.js
│   │   └── userController.js
│   ├── config/    # 配置文件目录
│   ├── index.js   # 后端入口文件
│   └── package.json   # 后端依赖管理文件
│
├── frontend/      # 前端代码目录
│   ├── public/    # 静态资源目录
│   ├── src/       # 源代码目录
│   │   ├── components/   # React 组件目录
│   │   ├── pages/    # 页面组件目录
│   │   ├── App.js    # React 应用入口文件
│   │   └── index.js   # React 应用渲染入口文件
│   └── package.json   # 前端依赖管理文件
│
└── README.md      # 项目说明文档
```

## 项目搭建步骤

1. 新建文件夹 my-mern-project 保存前后端项目
2. 新建前后端项目根目录 /frontend, /backend
3. 在 frontend、backend 中各自用脚手架初始化项目
4. 分别优化前后端项目目录结构
5. 基于优化的项目结构启动项目并联调协作

```bash
# 新建项目文件夹
mkdirmkdir my-mern-project
cd my-mern-project

# 脚手架初始化前端项目，会创建名为 frontend 的 react 项目
npx create-react-app@latest frontend

# 全局安装 express-generator
npm install -g express-generator
# 脚手架初始化后端项目，会创建名为 backend 的后端项目
express backend --no-view
```

> 至此项目结构已经基本搭建起来了，接下来是按照预期的项目结构来优化一下目录结构

## 后端项目结构优化

```bash
└─── backend/       # 后端代码目录
    ├── models/    # 数据模型目录
    ├── routes/    # 路由目录(将 controllers 和 routes 合并到同一个目录，便与后续维护)
    ├── config/    # 配置文件目录
    ├── index.js   # 后端入口文件
    └── package.json   # 后端依赖管理文件
```

### routes/index.js 统一管理路由，让路由配置更为集中和清晰

#### routes/index.js

```js
// routes/index.js

const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')

router.use('/users', userRoutes)
router.use('/posts', postRoutes)

module.exports = router
```

#### routes/userRoutes.js

```js
// userRoutes.js

const express = require('express')
const router = express.Router()
const { getUser, createUser } = require('./userController')

// GET 请求处理
router.get('/', getUser)

// POST 请求处理
router.post('/', createUser)

// 导出路由对象
module.exports = router
```

#### routes/userController.js

```js
// userController.js

// 中间件函数 - 获取用户
const getUser = (req, res) => {
  // 中间件处理逻辑
  res.send('GET request to the homepage')
}

// 中间件函数 - 创建用户
const createUser = (req, res) => {
  // 中间件处理逻辑
  res.send('POST request to the homepage')
}

// 使用ES6解构导出中间件函数
module.exports = {
  getUser,
  createUser,
}
```

:::tip

postRoutes.js postController.js 的初始化文件结构也基本一致，只是修改一下变量名称
:::

### 数据库与环境变量配置

#### 安装 dotenv 创建 .env 文件配置全局环境变量

```bash
# .env

DB_HOST=localhost
DB_PORT=27017
DB_NAME=mydatabase
DB_USER=myusername
DB_PASS=mypassword
```

#### config/env.js 中引入环境变量，配置各个环境的启动参数

```js
// config/env.js

require('dotenv').config()

module.exports = {
  development: {
    PORT: process.env.PORT || 3000,
    MONGO_URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // 其他开发环境配置...
  },
  test: {
    PORT: process.env.PORT || 4000,
    MONGO_URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // 其他测试环境配置...
  },
  production: {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGODB_URI,
    // 其他生产环境配置...
  },
}
```

:::tip

注意：这里测试环境和开发环境的本地环境配置脚本和上面的 .env 一致

生产环境的话只需要配置 MONGODB_URI=xxxxxx 这一项就可以了

:::

#### 随后在 config/database.js 中引入环境变量，根据不同环境自动读取环境变量

```js
// config/database.js

const envConfig = require('./env')

// 获取当前环境
const ENV = process.env.NODE_ENV || 'development'

// 根据当前环境加载对应的数据库配置信息
const config = envConfig[ENV]

module.exports = config
```

#### 接下来在 utils/database.js 中创建数据库的连接函数

```js
// utils/database.js

const mongoose = require('mongoose')

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
```

#### 最终在入口文件 app.js 中引入配置信息

```js
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const routes = require('./routes')
// 引入数据库配置
const config = require('./config/database')

// 引入数据库连接函数
const connectDB = require('./utils/database')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 连接数据库
connectDB(config.MONGO_URI)

// 所有以 /api 开头的请求都会交给 routes 对象处理
app.use('/api', routes)

module.exports = app
```

### 创建数据库，配置数据库密钥信息，更新不同环境中的环境变量

```js
// todo
```

## 项目搭建

### 利用常用的脚手架 create-react-app 和 express-generator 快速搭建项目

```shell
# 创建后端项目目录
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
