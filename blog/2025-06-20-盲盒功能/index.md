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

以下是你提供的 GraphQL 接口代码的完整接口文档，适用于前端使用及后端接口对接说明，结构参照你之前的登录与验证码模块文档风
格整理。

---

# 接口文档 — 分类管理模块（Category）

## 1. 查询分类列表

### 请求类型

```graphql
query categories($input: categoriesInput!) {
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

### 返回示例

```json
{
  "data": {
    "categories": {
      "success": true,
      "statusCode": 200,
      "message": "分类查询成功",
      "data": {
        "items": [
          {
            "id": "60f7c3bd4a3c2b0012345678",
            "name": "家具",
            "description": "所有家具类商品",
            "parent": null,
            "order": 1,
            "visible": true
          }
        ],
        "total": 1,
        "page": 1,
        "pageSize": 20
      }
    }
  }
}
```

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
mutation createCategory($input: createCategoryInput!) {
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

| 参数名      | 类型    | 必填 | 默认值 | 说明                  |
| ----------- | ------- | ---- | ------ | --------------------- |
| name        | String  | 是   | -      | 分类名称              |
| description | String  | 否   | -      | 分类描述              |
| parentId    | ID      | 否   | null   | 父级分类 ID（可为空） |
| order       | Int     | 否   | 0      | 排序字段，越小越靠前  |
| visible     | Boolean | 否   | true   | 是否显示              |

---

## 4. 更新分类

### 请求类型

```graphql
mutation updateCategory($input: updateCategoryInput!) {
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

| 参数名      | 类型    | 必填 | 说明        |
| ----------- | ------- | ---- | ----------- |
| id          | ID      | 是   | 分类 ID     |
| name        | String  | 否   | 分类名称    |
| description | String  | 否   | 分类描述    |
| parentId    | ID      | 否   | 父级分类 ID |
| order       | Int     | 否   | 排序值      |
| visible     | Boolean | 否   | 是否可见    |

---

## 5. 删除分类

### 请求类型

```graphql
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    success
    statusCode
    message
    data {
      id
      name
    }
  }
}
```

### 参数说明

| 参数名 | 类型 | 必填 | 说明    |
| ------ | ---- | ---- | ------- |
| id     | ID   | 是   | 分类 ID |

### 特殊说明

- 删除分类时，会**自动断开子分类的父级关联**（即设置其 `parent = null`）。
