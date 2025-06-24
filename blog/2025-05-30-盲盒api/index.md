---
slug: surprise-gift-api
title: 盲盒API设计
authors: yana
tags: [surprise]
draft: true
---

好的，我们现在正式进入 **商品管理模块** 的开发。下面是根据你的需求整理的结构规划和开发清单，供你逐步实现。

---

## 🛒 商品模型设计（Product Schema）

### ✅ 字段设计

| 字段名      | 类型      | 必填 | 说明                       |
| ----------- | --------- | ---- | -------------------------- |
| `title`     | String    | ✅   | 商品标题                   |
| `price`     | Number    | ✅   | 商品标价                   |
| `realPrice` | Number    | ✅   | 商品实际售价               |
| `soldCount` | Number    | 否   | 历史成交数量，默认 0       |
| `inventory` | Number    | ✅   | 库存数量                   |
| `category`  | ObjectId  | ✅   | 商品分类，引用 Category    |
| `images`    | \[String] | ✅   | 商品图片数组（可多张）     |
| `video`     | String    | 否   | 商品视频 URL（可选）       |
| `order`     | Number    | 否   | 排序值，越小越靠前         |
| `visible`   | Boolean   | ✅   | 是否上架/展示，默认 `true` |
| `createdAt` | Date      | 自动 | 创建时间                   |
| `updatedAt` | Date      | 自动 | 更新时间                   |

---

## 📘 数据模型定义（Mongoose）

```js
// models/Product.js

import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    realPrice: { type: Number, required: true },
    soldCount: { type: Number, default: 0 },
    inventory: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    video: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
      },
    },
  }
)

export default model('Product', productSchema)
```

---

## 🔧 GraphQL 类型定义草案

```graphql
type Product {
  id: ID!
  title: String!
  price: Float!
  realPrice: Float!
  soldCount: Int
  inventory: Int!
  category: Category!
  images: [String!]!
  video: String
  order: Int
  visible: Boolean!
  createdAt: String
  updatedAt: String
}

input CreateProductInput {
  title: String!
  price: Float!
  realPrice: Float!
  inventory: Int!
  category: ID!
  images: [String!]!
  video: String
  order: Int
  visible: Boolean
}

input UpdateProductInput {
  id: ID!
  title: String
  price: Float
  realPrice: Float
  inventory: Int
  category: ID
  images: [String!]
  video: String
  order: Int
  visible: Boolean
}

type ProductResult {
  success: Boolean!
  statusCode: Int!
  message: String!
  data: Product
}

type ProductListResult {
  success: Boolean!
  statusCode: Int!
  message: String!
  data: ProductListData
}

type ProductListData {
  items: [Product!]!
  total: Int!
  page: Int!
  pageSize: Int!
}
```

---

## 🔧 GraphQL 接口列表

### Query

```graphql
products(input: ProductFilterInput): ProductListResult!
product(id: ID!): ProductResult!
```

### Mutation

```graphql
createProduct(input: CreateProductInput!): ProductResult!
updateProduct(input: UpdateProductInput!): ProductResult!
deleteProduct(id: ID!): ProductResult!
toggleProductVisibility(id: ID!, visible: Boolean!): ProductResult!
```

---

## ✅ 接下来可以做的开发步骤

1. ✅ 建立 `models/Product.js`
2. ✅ 定义 GraphQL `Product.graphql` 类型
3. ✅ 写 resolver：`createProduct`
4. ✅ 实现分页 `products` 查询
5. ✅ 实现 `updateProduct` 和 `deleteProduct`
6. ✅ 实现上/下架接口 `toggleProductVisibility`

好的，这里是完整的集成方案，包含：

1. ✅ 图片与视频上传接口（REST）
2. ✅ 集成到现有 GraphQL + Express 项目中
3. ✅ 文件访问路径配置
4. ✅ 使用方式与接口文档

---

## ✅ 1. 文件上传模块（Express + Multer）

### 📁 创建目录结构（建议）

```
/uploads
  /images
  /videos
/routes
  upload.js
```

### 📦 安装依赖

```bash
npm install multer
```

### 📄 routes/upload.js

```js
import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// 保证上传目录存在
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}
ensureDir('uploads/images')
ensureDir('uploads/videos')

// 图片存储
const imageStorage = multer.diskStorage({
  destination: 'uploads/images',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

// 视频存储
const videoStorage = multer.diskStorage({
  destination: 'uploads/videos',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const uploadImage = multer({ storage: imageStorage })
const uploadVideo = multer({ storage: videoStorage })

// 上传图片接口
router.post('/upload/image', uploadImage.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: '未上传文件' })
  res.json({
    success: true,
    path: `/uploads/images/${req.file.filename}`,
  })
})

// 上传视频接口
router.post('/upload/video', uploadVideo.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: '未上传文件' })
  res.json({
    success: true,
    path: `/uploads/videos/${req.file.filename}`,
  })
})

export default router
```

---

## ✅ 2. 集成到主服务（server.js）

在 `server.js` 中加入以下内容：

```js
import express from 'express'
import uploadRoutes from './routes/upload.js'
import path from 'path'

const app = express()

// 静态资源访问
app.use('/uploads', express.static(path.resolve('uploads')))

// 注册上传路由
app.use('/api', uploadRoutes)
```

---

## ✅ 3. 图片/视频在 GraphQL 的使用方式

上传接口返回 `path` 字符串，前端在创建商品时带入 GraphQL 接口：

```graphql
mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    success
    message
    data {
      id
      title
      images
      videos
    }
  }
}
```

```json
{
  "input": {
    "title": "沙发A款",
    "price": 899,
    "realPrice": 699,
    "inventory": 10,
    "categoryId": "xxxxx",
    "images": ["/uploads/images/1721919053234.jpg", "/uploads/images/1721919053235.jpg"],
    "videos": ["/uploads/videos/1721919053236.mp4"]
  }
}
```

---

## ✅ 4. 接口文档（Markdown）

````markdown
# 文件上传接口

## 1. 上传图片

- 接口地址：`POST /api/upload/image`
- Content-Type: `multipart/form-data`
- 参数：formData 字段为 `file`

### 返回示例

```json
{
  "success": true,
  "path": "/uploads/images/1721919053234.jpg"
}
```
````

## 2. 上传视频

- 接口地址：`POST /api/upload/video`
- Content-Type: `multipart/form-data`
- 参数：formData 字段为 `file`

### 返回示例

```json
{
  "success": true,
  "path": "/uploads/videos/1721919053236.mp4"
}
```

## ⚠️ 图片/视频展示注意事项

- 前端展示时手动拼接访问前缀：

  - `http://localhost:3000` + path
  - 例如：`http://localhost:3000/uploads/images/xxx.jpg`

- 后续替换为 OSS/CDN 只需统一替换前缀即可。

```

---

## ✅ 可选增强建议（后续）

- 上传大小/类型校验（Multer 提供）
- 登录鉴权（JWT 中间件）
- 上传结果写入数据库（如记录用户、时间等）
- 替换为云存储（如阿里 OSS、Cloudflare R2）

---

如需我帮你生成前端上传图片的 `fetch` 示例代码或组件，也可以告诉我。你已经打下非常好的基础了，继续保持！👍
```
