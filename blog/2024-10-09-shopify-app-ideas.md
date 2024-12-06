---
slug: shopify-app-ideas
title: Shopify app 开发(ideas)
authors: yana
tags: [shopify, 'app', 'ideas']
draft: true
---

# 商家需求

1. ins 视频或者视频插件
2. 赠品插件（阻塞了加购）
3. 评价插件
4. 物流插件
5. 数据文件 pdf、excel 导出插件（metafileds 数据无法选中）

# 目标（1-3 months）

1. 能用
2. 有人安装
3. 收集数据
4. 做产品

# 插件引流

1. 直接用 **需求点** 命名插件
2. 文案+视频 ----> twitter/youtube(fiverr【free lancer】)

3. chrome 插件配合 + Google SEO
4. shopify 内部广告投放 （app.shopify.com）

# 支付、收款、退款

1. 注册好 PayPal、派安盈、Velo 养号

Velo 推荐码：LING18073C01（各得 20 美金）

选择 Premier-e-Checking 电子账户

2. 有条件用 PayPal 企业号，也可以准备 PayPal 美区
3. 有机会开通香港卡，尽量开通（出海备用）
4. Gumroad、Paddle

# shopify PayPal

1. 每年 shopify app 收入不到 100 万美金，不收取费用
2. 2021/08/01 之后注册成为 shopify app 开发者需要 99 美刀 one-time

# shopify 开发者步骤

## 注册合作伙伴账号

1. 先不缴费，注册开发环境店铺和测试 APP
2. 了解整个生态的一些概念
3. 安装 shopify cli 工具

## 步骤

1. 在 partner 后台(app、主题)注册开发环境专用店铺 stores / add store
2. apps 创建一个 APP : apps / create apps
3. OAuth 授权

# shopify 开发者 概念

1. UI 组件 Polaris（样式统一）
2. GraphQL API（也可以是 Restful）
3. App Bridge（iframe 交互）
4. Admin API（读写 shopify 商店信息，包括产品、库存、订单、发货等）
5. storefont API （打造新的销售渠道、获取商品信息、创建订单等）
6. Liquid： shopify 店铺的模板语言

# 环境

```zsh
brew tap shopify/shopify

brew install shoify-cli

shopify node create
```

> 教程可以在 youtube 上搜索找

# 海外服务部署和托管

> 都有免费额度，先开发产品

- Google Cloud Run（recommend）
- Cloudways
- Vercel
- Vultr (5$ / months)
- Heroku

# 其他平台

1. Slack 插件 slack.com/apps
2. Airtable Marketplace
3. Google Chrome Extensions/Workspace App
4. Zoom App Marketplace
5. Notion market, market.notion.vip

# 提升开发体验

> 使用 vite 实现开发阶段的热加载（Hot Module Replacement）

## 配置 vite 开发服务器

```js
/** vite.config.js */

import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig({
  server: {
    host: 'localhost', // 本地开发服务器地址
    port: 3000, // Vite 开发服务器端口
    https: false, // 可以根据需要启用 https
  },
  plugins: [
    // 使用 `vite-plugin-static-copy` 插件复制资源
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 创建 shopify Proxy 或者 ngrok 隧道

因 shopify 模板无法在本地直接预览，需要将 vite 开发服务器代理到 shopify 本地环境中：

1. ngrok 、 LocalTunnels 等隧道工具
2. shopify cli 提供的 theme serve 命令结合代理

```bash
# 安装 ngrok
brew install ngrok

# 运行 ngrok 并将 vite 暴露出来: 会生成一个 https://abc123.ngrok.io
# 可在开发阶段通过 这个 url 获取开发阶段的资源
ngrok http 3000
```

```liquid
{% if request.host contains 'ngrok.io' %}
  <!-- 开发环境下引入 Vite 开发服务器资源 -->
  <link rel="stylesheet" href="https://abc123.ngrok.io/src/style.css">
  <script type="module" src="https://abc123.ngrok.io/src/main.js"></script>
{% else %}
  <!-- 生产环境下引入构建后的资源 -->
  <link rel="stylesheet" href="{{ 'assets/style.[hash].css' | asset_url }}">
  <script src="{{ 'assets/main.[hash].js' | asset_url }}"></script>
{% endif %}

```
