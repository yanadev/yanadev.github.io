---
slug: surprise-gift-api-project-docs
title: 盲盒项目文档
authors: yana
tags: [surprise]
draft: true
---

# 项目配置

| 序号 | 功能模块     | 功能描述                            | 状态     | 备注                                     |
| ---- | ------------ | ----------------------------------- | -------- | ---------------------------------------- |
| 1    | 环境配置     | 使用 dotenv 读取环境变量            | 已完成   | 已统一管理环境变量，支持 ESModule        |
| 2    | 代码规范     | 集成 ESLint 和 Prettier，自动格式化 | 已完成   | VS Code `.vscode/settings.json` 配置完成 |
| 3    | API 框架     | 使用 Express + GraphQL 搭建接口     | 已完成   | 支持 GraphiQL 调试                       |
| 4    | 数据库连接   | 使用 Mongoose 连接 MongoDB          | 已完成   | 支持连接池及异步初始化                   |
| 5    | 统一响应格式 | success 和 fail 统一响应结构体      | 已完成   | 支持状态码、消息和业务数据               |
| 6    | JWT 认证     | JWT 生成与验证                      | 已完成   | 使用环境变量管理密钥，支持登录验证       |
| 7    | 商品模块基础 | 商品数据模型及关联分类、物流        | 设计完成 | Mongoose 模型和 GraphQL Schema 已设计    |
| 8    | 物流信息     | 商品物流信息内嵌及管理              | 设计完成 | 支持状态跟踪和预计送达时间               |
| 9    | 分类管理     | 商品分类模型与接口                  | 设计完成 | 支持多分类关联                           |

# 状态码

| 常量名           | 值    | 说明           | 典型使用场景                                  |
| ---------------- | ----- | -------------- | --------------------------------------------- |
| `OK`             | `200` | 成功           | 登录成功、验证码发送成功等                    |
| `BAD_REQUEST`    | `400` | 客户端请求无效 | 缺少参数、参数格式错误                        |
| `UNAUTHORIZED`   | `401` | 未授权访问     | 未登录或 Token 无效/过期                      |
| `FORBIDDEN`      | `403` | 被禁止         | 有登录但权限不足，比如普通用户访问 admin 功能 |
| `NOT_FOUND`      | `404` | 请求资源不存在 | 手机号查不到对应用户、验证码不存在等          |
| `CONFLICT`       | `409` | 冲突           | 注册时手机号已存在，重复操作等                |
| `INTERNAL_ERROR` | `500` | 服务器内部错误 | 异常未捕获、数据库连接失败等                  |

# auth.js

明白了！这是基于你之前的登录和验证码功能，帮你整理的**接口文档**，方便后续开发和前端调用。

---

# 状态码说明（示例）

| 状态码 | 含义                     |
| ------ | ------------------------ |
| 200    | 请求成功                 |
| 400    | 请求参数错误             |
| 401    | 未授权（登录失败等）     |
| 403    | 禁止访问                 |
| 404    | 资源未找到               |
| 409    | 冲突（如手机号已注册等） |
| 500    | 服务器内部错误           |
| 1001   | 验证码过期               |
| 1002   | 验证码已使用             |

# 公共响应结构说明

所有接口返回统一结构如下：

| 字段名     | 类型    | 说明                       |
| ---------- | ------- | -------------------------- |
| success    | Boolean | 请求是否成功               |
| statusCode | Int     | 状态码（参考后端定义）     |
| message    | String  | 接口提示信息               |
| data       | Mixed   | 实际返回数据（结构见上文） |

# 接口文档 — 用户登录 & 验证码模块

## 1. 发送验证码接口

### 请求类型

```graphql
mutation sendCode($phone: String!) {
  sendCode(phone: $phone) {
    success # Boolean，是否成功发送
    statusCode # Int，状态码（参考常量定义）
    message # String，提示信息
    code # String，开发环境下返回的验证码，正式环境返回 null
  }
}
```

### 参数说明

| 参数名 | 类型   | 必填 | 说明       |
| ------ | ------ | ---- | ---------- |
| phone  | String | 是   | 用户手机号 |

### 返回示例

```json
{
  "data": {
    "sendCode": {
      "success": true,
      "statusCode": 200,
      "message": "验证码发送成功",
      "code": "6752" // 仅开发环境返回
    }
  }
}
```

## 2. 验证码登录接口

### 请求类型

```graphql
mutation loginWithCode($phone: String!, $code: String!) {
  loginWithCode(phone: $phone, code: $code) {
    success # Boolean，是否登录成功
    statusCode # Int，状态码
    message # String，提示信息
    data {
      # 登录成功时返回的数据
      token # String，JWT 令牌
      user {
        # 用户信息
        id
        nickname
        phone
        avatar
        role
        status
        createdAt
        updatedAt
      }
    }
  }
}
```

### 参数说明

| 参数名 | 类型   | 必填 | 说明             |
| ------ | ------ | ---- | ---------------- |
| phone  | String | 是   | 用户手机号       |
| code   | String | 是   | 用户收到的验证码 |

### 返回示例

- **登录成功**

```json
{
  "data": {
    "loginWithCode": {
      "success": true,
      "statusCode": 200,
      "message": "登录成功",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
          "id": "60f7c3bd4a3c2b0012345678",
          "nickname": "",
          "phone": "1234567890",
          "avatar": "",
          "role": "client",
          "status": "active",
          "createdAt": "2024-06-23T09:00:00Z",
          "updatedAt": "2024-06-23T10:00:00Z"
        }
      }
    }
  }
}
```

- **登录失败（验证码错误或过期）**

```json
{
  "data": {
    "loginWithCode": {
      "success": false,
      "statusCode": 400,
      "message": "验证码错误或已过期",
      "data": null
    }
  }
}
```

- **服务器错误**

```json
{
  "data": {
    "loginWithCode": {
      "success": false,
      "statusCode": 500,
      "message": "服务器错误",
      "data": null
    }
  }
}
```

---

## 4. 备注

- 开发环境下 `sendCode` 接口会返回验证码，方便调试。正式环境返回 `code: null`。
- `loginWithCode` 返回的 `token` 是 JWT 令牌，用于后续接口鉴权。
- 用户信息中的 `id` 是字符串类型，确保前端使用时正确解析。
- 所有接口均返回统一结构 `{ success, statusCode, message, data }`，方便统一处理。

# 接口文档 — 分类管理模块（Category）

## 1. 查询分类列表

### 请求类型

```graphql
query categories($input: CategoriesInput) {
  categories(input: $input) {
    success
    statusCode
    message
    data {
      items {
        id
        name
        description
        parent {
          id
          name
        }
        order
        visible
      }
      total
      page
      pageSize
    }
  }
}
```

### 参数说明

| 参数名          | 类型    | 必填 | 默认值 | 说明               |
| --------------- | ------- | ---- | ------ | ------------------ |
| showOnlyVisible | Boolean | 否   | false  | 是否仅显示可见分类 |
| page            | Int     | 否   | 1      | 当前页码           |
| pageSize        | Int     | 否   | 20     | 每页数量           |

---

## 2. 查询单个分类详情

### 请求类型

```graphql
query category($id: ID!) {
  category(id: $id) {
    success
    statusCode
    message
    data {
      id
      name
      description
      parent {
        id
        name
      }
      order
      visible
    }
  }
}
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明           |
| ------ | ---- | ---- | -------------- |
| id     | ID   | 是   | 分类的唯一标识 |

---

## 3. 创建分类

### 请求类型

```graphql
mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    success
    statusCode
    message
    data {
      id
      name
      description
      parent {
        id
        name
      }
      order
      visible
    }
  }
}
```

### 参数说明

| 参数名      | 类型   | 必填 | 说明                  |
| ----------- | ------ | ---- | --------------------- |
| name        | String | 是   | 分类名称（唯一）      |
| description | String | 否   | 分类描述              |
| parentId    | ID     | 否   | 父级分类 ID           |
| order       | Int    | 否   | 排序值，越小越靠前    |
| visible     | Bool   | 否   | 是否显示（默认 true） |

---

## 4. 修改分类

### 请求类型

```graphql
mutation updateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    success
    statusCode
    message
    data {
      id
      name
      description
      parent {
        id
        name
      }
      order
      visible
    }
  }
}
```

### 参数说明

| 参数名      | 类型   | 必填 | 说明                |
| ----------- | ------ | ---- | ------------------- |
| id          | ID     | 是   | 要修改的分类 ID     |
| name        | String | 否   | 分类名称（可选）    |
| description | String | 否   | 分类描述            |
| parentId    | ID     | 否   | 父级分类 ID（可选） |
| order       | Int    | 否   | 排序值              |
| visible     | Bool   | 否   | 是否显示            |

---

## 5. 删除分类

### 请求类型

```graphql
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    success
    statusCode
    message
    data # Boolean，是否删除成功
  }
}
```

### 特别说明

- 删除分类时，如果存在子分类，会将其 `parent` 设置为 `null`，并 **不会级联删除子分类**。

---

## 6. 查询分类树结构

### 请求类型

```graphql
query categoryTree {
  categoryTree {
    success
    statusCode
    message
    data {
      id
      name
      description
      order
      visible
      children {
        id
        name
        children {
          id
          name
        }
      }
    }
  }
}
```

### 返回说明

- 返回完整的分类树结构，嵌套形式组织（无限层级支持）。
- 每个节点的 `children` 字段为该分类下的子分类数组。

---

## 🧱 接口统一返回结构

所有接口返回结构如下：

```ts
type Result<T = any> {
  success: boolean
  statusCode: number
  message: string
  data: T
}
```

---

## 📎 附加说明

- 所有分类 ID 均为字符串，前端需正确处理。
- 查询接口统一支持 `populate` 获取父分类信息。
- `toJSON` 自动将 `_id` 转换为 `id` 字段。
- 删除、更新、创建操作均做了错误处理与提示信息返回。
- 如果需要使用分页查询，请传入 `page` 和 `pageSize`，否则返回全部数据。

好的！我帮你写一个简洁的接口文档和对应的测试用例示范，方便你后续开发和维护。

---

# 商品模块接口文档（GraphQL）

## Query

### 1. 查询单个商品 `product`

- **参数**

```graphql
query product($id: ID!) {
  product(id: $id) {
    success
    code
    message
    data {
      _id
      title
      price
      realPrice
      inventory
      visible
      order
      images
      videos
      category {
        _id
        name
        parent {
          _id
          name
        }
      }
    }
  }
}
```

- **说明** 根据商品 ID 查询单个商品详情，包含分类及父分类信息。

---

### 2. 查询商品列表 `products`

- **参数**

```graphql
query products($input: ProductsInput) {
  products(input: { keyword: String, categoryId: ID, visible: Boolean, page: Int, pageSize: Int }) {
    success
    code
    message
    data {
      total
      page
      pageSize
      items {
        _id
        title
        price
        realPrice
        inventory
        visible
        order
        images
        videos
        category {
          _id
          name
          parent {
            _id
            name
          }
        }
      }
    }
  }
}
```

- **说明** 支持按关键字、分类、上下架状态分页查询商品列表。

---

## Mutation

### 3. 新建商品 `createProduct`

- **参数**

```graphql
mutation createProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    success
    code
    message
    data {
      _id
      title
      price
      realPrice
      inventory
      visible
      order
      images
      videos
      category {
        _id
        name
      }
    }
  }
}
```

- **输入类型示例**

```json
{
  "input": {
    "title": "商品标题",
    "price": 100,
    "realPrice": 90,
    "inventory": 50,
    "categoryId": "1234567890abcdef",
    "images": ["url1", "url2"],
    "videos": ["url1"],
    "order": 0,
    "visible": true
  }
}
```

- **说明** 分类可选，若传入分类 ID 会校验是否存在。

---

### 4. 更新商品 `updateProduct`

- **参数**

```graphql
mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    success
    code
    message
    data {
      _id
      title
      price
      realPrice
      inventory
      visible
      order
      images
      videos
      category {
        _id
        name
        parent {
          _id
          name
        }
      }
    }
  }
}
```

- **说明** 可更新商品的任意字段，分类会校验是否存在。

---

### 5. 批量更新商品 `batchUpdateProducts`

- **参数**

```graphql
mutation batchUpdateProducts($input: [BatchUpdateProductInput!]!) {
  batchUpdateProducts(input: $input) {
    success
    code
    message
    data {
      updated {
        _id
        title
        order
      }
      failed {
        productId
        error
      }
    }
  }
}
```

- **说明** 批量更新，单个失败不影响其他商品。

---

### 6. 删除商品 `deleteProduct`

- **参数**

```graphql
mutation deleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    success
    code
    message
    data {
      _id
      title
    }
  }
}
```

---

### 7. 批量删除商品 `batchDeleteProducts`

- **参数**

```graphql
mutation batchDeleteProducts($ids: [ID!]!) {
  batchDeleteProducts(ids: $ids) {
    success
    code
    message
    data {
      deleted {
        id
      }
      failed {
        id
        error
      }
    }
  }
}
```

---

### 8. 商品上下架切换 `toggleProductVisibility`

- **参数**

```graphql
mutation toggleProductVisibility($id: ID!, $visible: Boolean!) {
  toggleProductVisibility(id: $id, visible: $visible) {
    success
    code
    message
    data {
      _id
      visible
    }
  }
}
```

---

### 9. 批量商品上下架切换 `batchToggleProductVisibility`

- **参数**

```graphql
mutation batchToggleProductVisibility($ids: [ID!]!, $visible: Boolean!) {
  batchToggleProductVisibility(ids: $ids, visible: $visible) {
    success
    code
    message
    data {
      updated {
        _id
        visible
      }
      failed {
        productId
        error
      }
    }
  }
}
```

---

### 10. 置顶商品 `setProductTop`

- **参数**

```graphql
mutation setProductTop($id: ID!) {
  setProductTop(id: $id) {
    success
    code
    message
    data {
      _id
      order
    }
  }
}
```

---

### 11. 批量置顶商品 `batchSetProductsTop`

- **参数**

```graphql
mutation batchSetProductsTop($ids: [ID!]!) {
  batchSetProductsTop(ids: $ids) {
    success
    code
    message
    data {
      updated {
        id
      }
      failed {
        id
        error
      }
    }
  }
}
```

# 订单 model

## ✅ 拆分模型方案汇总如下：

### ✅ 1. `Order.js`（订单主表）

```js
import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  itemSnapshotIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItemSnapshot' }], // 商品快照
  shippingInfoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo' }], // 多条物流

  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['UNPAID', 'PAID', 'REFUNDED'],
    default: 'UNPAID',
  },
  shippingStatus: {
    type: String,
    enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
    default: 'PENDING',
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Order', OrderSchema)
```

---

### ✅ 2. `OrderItemSnapshot.js`（商品快照表）

```js
import mongoose from 'mongoose'

const OrderItemSnapshotSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },

  // 快照字段
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // 可为空
  title: { type: String, required: true },
  cover: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('OrderItemSnapshot', OrderItemSnapshotSchema)
```

---

### ✅ 3. `ShippingInfo.js`（物流信息表）

```js
import mongoose from 'mongoose'

const ShippingInfoSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  carrier: { type: String }, // 快递公司
  trackingNumber: { type: String }, // 单号
  status: {
    type: String,
    enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
    default: 'PENDING',
  },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  remark: { type: String }, // 可选说明
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('ShippingInfo', ShippingInfoSchema)
```

---

### ✅ 4. `Address.js`（用户地址表）

```js
import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Address', AddressSchema)
```

---

## ✅ 下一步推荐操作：

我可以帮你接着做：

1. `createOrder`：创建订单时，自动写入快照表、关联主订单
2. `addShippingInfo`：添加物流记录到独立表并关联订单
3. `getOrderDetail`：聚合查询，返回订单 + 快照 + 物流既然你已经设计了模型结构，接下来写接口的顺序可以根据依赖关系和业务
   需求来安排。一般来说，建议按照以下顺序逐步开发，确保前后端能够顺畅对接并逐步实现功能：

### 推荐接口开发顺序：

#### 1. **用户地址相关接口**

订单依赖用户地址，所以首先开发 **地址管理接口**，包括新增、查询、修改、删除等功能。这些接口用于管理用户的收货地址。

**接口示例：**

- `createAddress(input: AddressInput!)` — 新增收货地址
- `updateAddress(id: ID!, input: AddressInput!)` — 更新地址
- `getUserAddresses(userId: ID!)` — 查询用户所有地址
- `deleteAddress(id: ID!)` — 删除地址

#### 2. **订单创建相关接口**

订单是整个业务流程的核心，所以紧接着开发 **订单创建** 接口。订单创建时需要选择地址，并生成商品快照、计算总金额、设置支付
状态等。

**接口示例：**

- `createOrder(input: CreateOrderInput!)` — 创建订单

  - 需要从 `Address` 模型获取地址信息，并将商品快照（OrderItemSnapshot）与订单关联。
  - 需要计算总金额，生成支付状态。

#### 3. **订单商品快照相关接口**

快照是订单的一部分，所以需要开发接口来管理订单中的商品快照。虽然快照在创建订单时会自动生成，但可能有一些后续的查询和管理
需求。

**接口示例：**

- `getOrderItemSnapshots(orderId: ID!)` — 查询订单商品快照列表
- `getOrderItemSnapshot(id: ID!)` — 获取单个商品快照信息

#### 4. **订单留言相关接口**

订单留言通常在订单创建后、支付前或发货前进行。开发 **订单留言接口** 以便用户可以为订单添加留言。

**接口示例：**

- `addOrderMessage(input: AddOrderMessageInput!)` — 新增订单留言
- `getOrderMessages(orderId: ID!)` — 获取订单留言列表

#### 5. **物流信息相关接口**

订单创建后，物流信息（例如配送状态、跟踪编号等）会被记录和更新。开发 **物流信息管理接口**，实现订单的状态追踪。

**接口示例：**

- `createShippingInfo(orderId: ID!, input: ShippingInfoInput!)` — 新增物流信息
- `updateShippingInfo(id: ID!, input: ShippingInfoInput!)` — 更新物流信息
- `getShippingInfo(orderId: ID!)` — 查询订单的物流信息

#### 6. **订单状态更新接口**

订单状态包括支付状态、发货状态等，可以独立写接口来更新状态。通常涉及到支付、发货和签收等操作。

**接口示例：**

- `updatePaymentStatus(orderId: ID!, status: String!)` — 更新支付状态
- `updateShippingStatus(orderId: ID!, status: String!)` — 更新发货状态

#### 7. **订单查询接口**

完成订单和相关信息的管理后，最后开发 **订单查询接口**，支持按条件查询订单、订单详情、商品快照、留言等信息。

**接口示例：**

- `getOrder(id: ID!)` — 获取单个订单详细信息
- `getOrders(userId: ID!, page: Int!, pageSize: Int!)` — 查询用户的订单列表，支持分页

---

### 开发顺序总结：

1. **地址接口**：提供用户收货地址管理功能
2. **订单创建接口**：订单的创建与商品快照生成
3. **订单商品快照接口**：管理订单中的商品信息快照
4. **订单留言接口**：支持用户对订单进行留言
5. **物流信息接口**：管理订单物流信息，追踪发货进度
6. **订单状态接口**：处理支付、发货等订单状态的更新
7. **订单查询接口**：查询订单详情、商品信息、留言和物流状态等

---

### 为什么这样顺序开发？

- **数据依赖顺序**：订单创建依赖地址信息，所以地址接口必须先实现；订单创建还会生成商品快照，快照紧接着进行管理。
- **业务流顺序**：留言和物流信息是订单后期业务的一部分，因此在订单创建和商品快照管理之后开发。
- **查询和状态更新是后期操作**：订单创建、商品快照生成、物流更新和留言基本完成后，再实现订单查询和状态更新功能。

这个代码看起来已经是一个完整的处理地址相关 GraphQL 查询和变更操作的模块了。为了帮助你更好地理解和使用这段代码，以下是一
个详细的文档描述，解释了每个部分的功能以及如何使用。

---

## 地址相关 GraphQL API 文档

### **1. 查询接口：获取用户地址列表**

#### 请求类型：

- **Query**

#### 请求路径：

- `getUserAddresses`

#### 输入参数：

- `userId` (必填): 用户的唯一标识符。
- `page` (必填): 当前页码（分页）。
- `pageSize` (必填): 每页的地址数量。

#### 返回字段：

- `success`: 操作是否成功（布尔值）。
- `statusCode`: 响应状态码。
- `message`: 返回信息。
- `data`: 用户地址数据，包含以下字段：

  - `items`: 地址数组，每个地址包括：

    - `id`: 地址的唯一标识符。
    - `userId`: 所属用户的 ID。
    - `recipientName`: 收货人姓名。
    - `phone`: 收货人电话。
    - `address`: 地址详情。
    - `isDefault`: 是否为默认地址（布尔值）。

  - `total`: 用户地址的总数。
  - `page`: 当前页码。
  - `pageSize`: 每页数量。

#### 响应示例：

```json
{
  "success": true,
  "statusCode": 200,
  "message": "获取用户地址列表成功",
  "data": {
    "items": [
      {
        "id": "1",
        "userId": "12345",
        "recipientName": "张三",
        "phone": "1234567890",
        "address": "北京市朝阳区xx路xx号",
        "isDefault": true
      },
      {
        "id": "2",
        "userId": "12345",
        "recipientName": "李四",
        "phone": "9876543210",
        "address": "上海市浦东新区xx路xx号",
        "isDefault": false
      }
    ],
    "total": 2,
    "page": 1,
    "pageSize": 10
  }
}
```

### **2. 变更接口：删除地址**

#### 请求类型：

- **Mutation**

#### 请求路径：

- `deleteAddress`

#### 输入参数：

- `id` (必填): 地址的唯一标识符。

#### 返回字段：

- `success`: 操作是否成功（布尔值）。
- `statusCode`: 响应状态码。
- `message`: 返回信息。
- `data`: 删除的地址数据。

#### 响应示例：

```json
{
  "success": true,
  "statusCode": 200,
  "message": "删除地址成功",
  "data": {
    "id": "2",
    "userId": "12345",
    "recipientName": "李四",
    "phone": "9876543210",
    "address": "上海市浦东新区xx路xx号",
    "isDefault": false
  }
}
```

### **3. 变更接口：更新地址**

#### 请求类型：

- **Mutation**

#### 请求路径：

- `updateAddress`

#### 输入参数：

- `id` (必填): 地址的唯一标识符。
- `input` (必填): 包含以下字段的对象：

  - `userId` (可选): 用户唯一标识符。
  - `recipientName` (可选): 收货人姓名。
  - `phone` (可选): 收货人电话。
  - `address` (可选): 地址详情。
  - `isDefault` (可选): 是否为默认地址（布尔值）。

#### 返回字段：

- `success`: 操作是否成功（布尔值）。
- `statusCode`: 响应状态码。
- `message`: 返回信息。
- `data`: 更新后的地址数据。

#### 响应示例：

```json
{
  "success": true,
  "statusCode": 200,
  "message": "更新用户地址成功",
  "data": {
    "id": "1",
    "userId": "12345",
    "recipientName": "张三",
    "phone": "1234567890",
    "address": "北京市海淀区xx路xx号",
    "isDefault": true
  }
}
```

### **4. 变更接口：新增地址**

#### 请求类型：

- **Mutation**

#### 请求路径：

- `createAddress`

#### 输入参数：

- `input` (必填): 包含以下字段的对象：

  - `userId` (必填): 用户唯一标识符。
  - `recipientName` (必填): 收货人姓名。
  - `phone` (必填): 收货人电话。
  - `address` (必填): 地址详情。
  - `isDefault` (可选): 是否为默认地址（布尔值）。

#### 返回字段：

- `success`: 操作是否成功（布尔值）。
- `statusCode`: 响应状态码。
- `message`: 返回信息。
- `data`: 新创建的地址数据。

#### 响应示例：

```json
{
  "success": true,
  "statusCode": 200,
  "message": "新增地址成功",
  "data": {
    "id": "3",
    "userId": "12345",
    "recipientName": "王五",
    "phone": "1122334455",
    "address": "广州市天河区xx路xx号",
    "isDefault": false
  }
}
```

### **错误处理：**

- **400**: 请求参数错误。
- **404**: 用户或地址未找到。
- **500**: 服务器内部错误。

### **状态码说明：**

- **200 (OK)**: 请求成功，返回数据。
- **404 (Not Found)**: 请求的资源（如用户或地址）未找到。
- **500 (Internal Server Error)**: 服务器内部错误，通常是由于服务器故障或代码错误引起的。
