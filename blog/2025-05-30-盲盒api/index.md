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

---

你现在想从哪个接口开始写？比如：

- 先写 `createProduct`
- 或者先做 `products` 列表分页接口
