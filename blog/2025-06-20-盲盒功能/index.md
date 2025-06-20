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

# 功能需求汇总

## 1. 用户登录模块

- 支持手机号+验证码登录
- 验证码校验（5 分钟有效期、未使用）
- 验证码状态标记为已用
- 登录时查询用户，无则自动创建新用户
- 登录成功后生成 JWT token，7 天有效期
- 返回统一格式响应（success, statusCode, message, data）

## 2. 验证码模块

- 验证码校验接口，生产环境禁用查询接口
- 查询接口支持根据手机号查询验证码（开发环境使用）
- 验证码过期逻辑（超过 5 分钟即过期）
- 验证码错误、已用等异常处理

## 3. 统一响应结构

- ExtendedResultType 定义，带 success、statusCode、message、data
- 成功/失败返回统一结构
- 支持动态 data 字段（自定义类型）

## 4. 数据模型

- User 模型定义及映射（手机号、昵称、头像、角色、状态等）
- Code（验证码）模型定义及查询

## 5. JWT Token 生成与验证

- 生成 JWT Token，载入用户 ID 和手机号
- Token 有效期配置为 7 天

## 6. 单元测试框架集成

- 使用 Jest 进行单元测试
- 模拟外部依赖（checkCode、User、jsonwebtoken）
- 测试覆盖登录成功、验证码校验失败等关键路径

## 7. 项目结构规范

- graphql 文件夹存放类型与解析器
- utils 文件夹存放工具函数（验证码校验、统一结果包装）
- models 文件夹存放 mongoose 模型定义
- routes/controllers 管理接口和路由逻辑（如果有）

---

# 用户模块

| 序号 | 功能模块     | 功能描述                                                                                                                                 | 状态            | 备注                        |
| ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------- |
| 1    | 用户登录模块 | - 手机号+验证码登录<br>- 验证码校验（5 分钟有效）<br>- 验证码使用状态更新<br>- 查询或创建用户<br>- JWT 生成 7 天有效期<br>- 统一响应结构 | 已完成          | 返回 token 和 user 简化信息 |
| 2    | 验证码模块   | - 验证码校验接口<br>- 生产环境禁用查询接口<br>- 验证码过期与错误处理                                                                     | 已完成          | 开发环境支持查询验证码      |
| 3    | 统一响应结构 | - ExtendedResultType 定义<br>- 统一 success/statusCode/message/data 返回格式                                                             | 已完成          | 支持自定义 data 类型        |
| 4    | 数据模型     | - User 模型定义（手机号、昵称等字段）<br>- Code 模型定义（验证码存储）                                                                   | 已完成          | mongoose 实现               |
| 5    | JWT Token    | - 生成 JWT Token<br>- 配置有效期 7 天<br>- 载入 userId 和 phone                                                                          | 已完成          | 用于用户鉴权                |
| 6    | 单元测试     | - Jest 集成<br>- 模拟依赖（checkCode、User、jwt）<br>- 覆盖登录成功和失败                                                                | 进行中/部分完成 | 需逐步完善更多测试用例      |
| 7    | 项目结构     | - graphql 存放类型和解析器<br>- utils 存放工具<br>- models 存放 mongoose 模型                                                            | 已完成          | 目录结构清晰合理            |

好的，下面是分类模块软删除与恢复功能的完整**接口文档示例**，你可以直接用作接口说明或后台管理文档。

---

# 分类模块接口文档（软删除 + 恢复）

---

## 一、数据模型（Category）

| 字段      | 类型     | 说明                         |
| --------- | -------- | ---------------------------- |
| id        | ID       | 分类唯一标识                 |
| name      | String   | 分类名称                     |
| desc      | String   | 分类描述                     |
| parent    | ID       | 父级分类 ID，null 为一级分类 |
| visible   | Boolean  | 是否对外显示                 |
| deleted   | Boolean  | 是否被软删除（删除状态）     |
| createdAt | DateTime | 创建时间                     |

---

## 二、GraphQL 接口说明

### 1. 查询所有分类

```graphql
query Categories($includeDeleted: Boolean) {
  categories(includeDeleted: $includeDeleted) {
    id
    name
    desc
    parent
    visible
    deleted
  }
}
```

- **参数**

| 参数名         | 类型    | 必填 | 说明                             |
| -------------- | ------- | ---- | -------------------------------- |
| includeDeleted | Boolean | 否   | 是否包含已删除的分类，默认 false |

- **返回**

所有满足条件的分类列表，默认只返回未删除的分类。

---

### 2. 软删除分类

```graphql
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
```

- **参数**

| 参数名 | 类型 | 必填 | 说明                |
| ------ | ---- | ---- | ------------------- |
| id     | ID   | 是   | 需要软删除的分类 ID |

- **返回**

`true` 表示成功软删除，`false` 或错误信息表示失败。

---

### 3. 恢复已删除分类

```graphql
mutation RestoreCategory($id: ID!) {
  restoreCategory(id: $id) {
    id
    name
    deleted
  }
}
```

- **参数**

| 参数名 | 类型 | 必填 | 说明              |
| ------ | ---- | ---- | ----------------- |
| id     | ID   | 是   | 需要恢复的分类 ID |

- **返回**

恢复后的分类对象，`deleted` 字段应为 `false`。

---

## 三、业务逻辑说明

- **软删除**：实际并未从数据库删除分类，而是将 `deleted` 字段设置为 `true`，避免数据丢失。
- **恢复**：将 `deleted` 字段重新设置为 `false`，恢复分类正常状态。
- **查询**：默认只返回 `deleted: false` 的分类，后台管理时可以传入 `includeDeleted: true` 查询所有分类。
- **关联数据**：软删除分类后，相关商品依旧保留分类关联，但在前端应过滤不可见分类。恢复分类时应检查关联数据状态。

---

## 四、示例请求与响应

### 查询未删除分类示例

```graphql
query {
  categories {
    id
    name
    deleted
  }
}
```

响应：

```json
{
  "data": {
    "categories": [
      { "id": "1", "name": "家具", "deleted": false },
      { "id": "2", "name": "电子产品", "deleted": false }
    ]
  }
}
```

---

### 查询所有分类（含已删除）

```graphql
query {
  categories(includeDeleted: true) {
    id
    name
    deleted
  }
}
```

响应：

```json
{
  "data": {
    "categories": [
      { "id": "1", "name": "家具", "deleted": false },
      { "id": "3", "name": "过期分类", "deleted": true }
    ]
  }
}
```

---

### 软删除分类示例

```graphql
mutation {
  deleteCategory(id: "3")
}
```

响应：

```json
{
  "data": {
    "deleteCategory": true
  }
}
```

---

### 恢复分类示例

```graphql
mutation {
  restoreCategory(id: "3") {
    id
    name
    deleted
  }
}
```

响应：

```json
{
  "data": {
    "restoreCategory": {
      "id": "3",
      "name": "过期分类",
      "deleted": false
    }
  }
}
```

---

## 五、注意事项

- 软删除分类不会物理删除数据，便于恢复与追溯。
- 关联的商品需在业务层做分类状态过滤，避免显示已删除分类。
- 删除后应确保前端不可访问该分类，恢复后恢复访问权限。
- 后台管理端建议提供“回收站”功能，方便查看和恢复已删除分类。

---

如果你需要我帮你写一份更详细的接口测试用例文档或者前端调用示例，也可以告诉我！
