---
slug: shopify-headless-project-init（quick start）
title: Build a shopify headless project
authors: yana
tags: [shopify, 'headless']
---

# 环境要求

- Node.js v16.20+
- npm v8.19+
- shopify 店铺中安装插件
  - [Hydrogen channel](https://apps.shopify.com/hydrogen?shpxid=999374c6-D8F0-4BB8-1F04-F8F6CA66C827)

# 创建项目

```zsh
npm create @shopify/hydrogen@latest -- --quickstart
```

:::info

- `--quickstart` 是一个快速配置选项，如果需要自定义项目，可直接运行 `npm create @shopify/hydrogen@latest`

# 等待安装

:::

```zsh
Need to install the following packages:
@shopify/create-hydrogen@5.0.11

           │
│  You'll need to restart your terminal session to make `h2` alias available.                                                          │
│                                                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯



▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
Installing dependencies. This could take a few minutes ...
```

# 项目配置信息

```text
Shopify:   Mock.shop
Language:  JavaScript
Routes:
  • Home (/ & /:catchAll)
  • Page (/pages/:handle)
  • Cart (/cart/* & /discount/*)
  • Products (/products/:handle)
  • Collections (/collections/*)
  • Policies (/policies & /policies/:handle)
  • Blogs (/blogs/*)
  • Account (/account/*)
  • Search (/search)
  • Robots (/robots.txt)
  • Sitemap (/sitemap.xml & /sitemap/:type/:page.xml)
```

# 启动项目

```zsh
cd hydrogen-quickstart
shopify hydrogen dev
```

# 店铺设置

## 进入店铺后台

### 创建自定义 app

1. `settings/Apps and sale channels ` / `Develop apps` / `Allow custom app development` / `Crea an app`
2. 输入 app 名称，e.g. xxx store
3. 我们需要可以完全控制整个店铺，因此 admin API 和 stroefront API 都需配置
4. `overview` / `Config Admin API scopeds` / select all access / `API credentials` / `install app` / `install`
5. 你会得到以下数据


[未完待续...]