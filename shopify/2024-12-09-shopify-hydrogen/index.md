---
slug: shopify-hydrogen
title: Shopify Hydrogen
tags: [Shopify, Hydrogen]
authors: yana
draft: true
---

[toc]

# Headless Shopify 项目

〉 前后端分离，通过 API 获取商品、订单等，通过前端技术（React、nextjs）渲染和展示

1. 在 partner 账户中创建 store，通过创建 custom app 来获取 storefront API 来获取 token、API URL
2. 使用 React 或者 Next.js 来构建前端项目

```zsh
# next 项目 ----> SSR 渲染
npx create-next-app@latest my-headless-shopify-store
cd my-headless-shopify-store

```

```zsh
#  graphql 和 @apollo/client（用于处理 GraphQL 请求）：
npm install @apollo/client graphql

```

3. storefront API 连接前端项目

```js
/** lib/apollo.js  */
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-shop-name.myshopify.com/api/2024-10/graphql.json', // 使用你的 Shopify API URL
    headers: {
      Authorization: `Bearer your-storefront-access-token`, // 使用你的 Access Token
    },
  }),
  cache: new InMemoryCache(),
})

export default client
```

4. 创建一个页面显示产品

```js
import { useQuery, gql } from '@apollo/client'
import client from '../lib/apollo'

const GET_PRODUCTS = gql`
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          variants(first: 5) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, { client })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Shopify Products</h1>
      <ul>
        {data.products.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.title}</h2>
            <p>{node.descriptionHtml}</p>
            <ul>
              {node.variants.edges.map(({ node: variant }) => (
                <li key={variant.id}>
                  {variant.title}: {variant.priceV2.amount} {variant.priceV2.currencyCode}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

5. 配置并部署前端项目

# 环境要求

```zsh
node 16.20+
npm v8.19+
店铺 Hydrogen Channel
```

# 创建项目

```zsh
# 快速搭建项目
npm create @shopify/hydrogen@latest -- --quickstart
```

```zsh
➜  shopify npm create @shopify/hydrogen@latest -- --quickstart
(node:95941) ExperimentalWarning: CommonJS module /opt/homebrew/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /opt/homebrew/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Need to install the following packages:
@shopify/create-hydrogen@5.0.11
Ok to proceed? (y) y


> npx
> create-hydrogen --quickstart

(node:99159) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
╭─ info ───────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│  You'll need to restart your terminal session to make `h2` alias available.                          │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯




╭─ success ────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│  Storefront setup complete!                                                                          │
│                                                                                                      │
│    Shopify:   Mock.shop                                                                              │
│    Language:  JavaScript                                                                             │
│    Routes:                                                                                           │
│      • Home (/ & /:catchAll)                                                                         │
│      • Page (/pages/:handle)                                                                         │
│      • Cart (/cart/* & /discount/*)                                                                  │
│      • Products (/products/:handle)                                                                  │
│      • Collections (/collections/*)                                                                  │
│      • Policies (/policies & /policies/:handle)                                                      │
│      • Blogs (/blogs/*)                                                                              │
│      • Account (/account/*)                                                                          │
│      • Search (/search)                                                                              │
│      • Robots (/robots.txt)                                                                          │
│      • Sitemap (/sitemap.xml & /sitemap/:type/:page.xml)                                             │
│                                                                                                      │
│  Next steps                                                                                          │
│                                                                                                      │
│    • Run `cd hydrogen-quickstart && npm run dev`                                                     │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

# 启动项目(本地启动)

```zsh
cd hydrogen-quickstart && npm run dev
```

:::info

以下命令中的 shopify 只是我创建的根目录文件名称

:::

```zsh

➜  shopify cd hydrogen-quickstart && npm run dev

> hydrogen-quickstart@2024.10.1 dev
> shopify hydrogen dev --codegen

 warn  Route discovery/manifest behavior is changing in React Router v7
┃ You can use the `v3_lazyRouteDiscovery` future flag to opt-in early.
┃ -> https://remix.run/docs/en/2.13.1/start/future-flags#v3_lazyRouteDiscovery
┗
 warn  Data fetching is changing to a single fetch in React Router v7
┃ You can use the `v3_singleFetch` future flag to opt-in early.
┃ -> https://remix.run/docs/en/2.13.1/start/future-flags#v3_singleFetch
┗

Environment variables injected into MiniOxygen:

SESSION_SECRET   from local .env

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help


╭─ success ────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│  View Hydrogen app: http://localhost:3000/                                                           │
│                                                                                                      │
│  View GraphiQL API browser:                                                                          │
│  http://localhost:3000/graphiql                                                                      │
│                                                                                                      │
│  View server network requests:                                                                       │
│  http://localhost:3000/subrequest-profiler                                                           │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯


╭─ warning ────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│  [Codegen] [warn] Route discovery/manifest behavior is changing in React Router v7                   │
│                                                                                                      │
│  ┃ You can use the `v3_lazyRouteDiscovery` future flag to opt-in early.                              │
│  ┃ -> https://remix.run/docs/en/2.13.1/start/future-flags#v3_lazyRouteDiscovery                      │
│  ┗                                                                                                   │
│  [warn] Data fetching is changing to a single fetch in React Router v7                               │
│  ┃ You can use the `v3_singleFetch` future flag to opt-in early.                                     │
│  ┃ -> https://remix.run/docs/en/2.13.1/start/future-flags#v3_singleFetch                             │
│  ┗                                                                                                   │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

╭─ info ───────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│  In Hydrogen's `createStorefrontClient`:                                                             │
│                                                                                                      │
│  storeDomain missing, defaulting to mock.shop                                                        │
│                                                                                                      │
│  Next steps                                                                                          │
│    • Run `h2 link` to link your store.                                                               │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

   GET  200  render  /  1909ms
   GET  204  loader  /products/beanie  1578ms  [products.$handle]
   GET  204  loader  /products/beanie  897ms  [products.$handle]
   GET  200  loader  /products/beanie  9ms  [root]
   GET  200  loader  /products/beanie  1399ms  [products.$handle]
   GET  204  loader  /products/women-crewneck  1420ms  [products.$handle]
   GET  200  loader  /products/women-crewneck  6ms  [root]
   GET  200  loader  /products/women-crewneck  576ms  [products.$handle]
   GET  404  render  /__comp---theme-blog-list-pagea-6-a-7ba.js  616ms  prefetch
   GET  404  render  /plugin---algorithmb-1-f-040.js  599ms  prefetch
   GET  404  render  /content---algorithm-0-c-3-3ac.js  559ms  prefetch
   GET  404  render  /content---algorithma-0-b-af8.js  968ms  prefetch
   GET  404  render  /sidebar---algorithm-8-fa-2e7.js  978ms  prefetch
   GET  404  render  /content---algorithmd-65-e29.js  1013ms  prefetch
   GET  404  render  /content---algorithm-53-c-178.js  1647ms  prefetch
   GET  404  render  /__props---algorithm-13-c-2c9.js  943ms  prefetch
   GET  404  render  /content---algorithmab-0-9fd.js  1136ms  prefetch
   GET  404  render  /plugin---docsaba-d7c.js  793ms  prefetch
   GET  404  render  /__comp---theme-docs-root-5-e-9-0b6.js  809ms  prefetch
   GET  404  render  /__props---docs-005-788.js  580ms  prefetch
   GET  404  render  /__comp---theme-doc-item-178-a40.js  563ms  prefetch
   GET  404  render  /__comp---theme-doc-roota-94-67a.js  592ms  prefetch
   GET  404  render  /plugin---vue-88-a-a8d.js  565ms  prefetch
   GET  404  render  /__comp---theme-doc-version-roota-7-b-5de.js  992ms  prefetch
   GET  404  render  /content---docs-introf-84-2b4.js  1061ms  prefetch
   GET  404  render  /content---vuea-3-e-3ca.js  622ms  prefetch
   GET  404  render  /sidebar---vuee-68-bc3.js  672ms  prefetch
   GET  404  render  /content---vue-25-c-abb.js  698ms  prefetch
   GET  404  render  /content---vue-32-b-c38.js  682ms  prefetch
   GET  404  render  /content---vueea-4-7bc.js  598ms  prefetch
   GET  404  render  /content---vue-6-c-1-db4.js  645ms  prefetch
   GET  404  render  /content---vue-7-ec-c85.js  601ms  prefetch
   GET  404  render  /content---vuebff-0cf.js  584ms  prefetch
   GET  404  render  /content---vuecf-8-4a6.js  569ms  prefetch
   GET  404  render  /content---vue-2-d-3-263.js  569ms  prefetch
   GET  404  render  /content---vue-2-e-8-b84.js  566ms  prefetch
   GET  404  render  /__props---vuef-0-b-dab.js  594ms  prefetch
   GET  404  render  /plugin---archive-369-3bf.js  567ms  prefetch
   GET  200  loader  /products/women-crewneck  4ms  [root]  prefetch
   GET  404  render  /sidebar---authors-814-ac0.js  590ms  prefetch
   GET  404  render  /content---tags-app-8-af-d1a.js  587ms  prefetch
   GET  404  render  /content---tags-local-703-14d.js  560ms  prefetch
   GET  404  render  /content---tags-local-066-02d.js  568ms  prefetch
   GET  404  render  /content---tags-error-784-5d7.js  579ms  prefetch
   GET  404  render  /content---tags-action-95-a-e2a.js  568ms  prefetch
   GET  404  render  /content---tags-express-41-c-f79.js  554ms  prefetch
   GET  200  loader  /products/women-crewneck  7ms  [root]  prefetch
   GET  404  render  /content---tags-liquidddc-200.js  561ms  prefetch
   GET  200  loader  /products/women-crewneck  1006ms  [products.$handle]  prefetch
   GET  404  render  /content---tags-shopify%EF%BC%8Cthemekit-827-e14.js  582ms  prefetch
   GET  200  loader  /products/women-crewneck  843ms  [products.$handle]
   GET  404  render  /content---tags-shopify-2-ad-c32.js  578ms  prefetch
   GET  200  loader  /products/women-crewneck  595ms  [products.$handle]  prefetch
   GET  404  render  /content---tags-github-action-40-e-d7b.js  1304ms  prefetch
   GET  404  render  /__props---1-a-1-4cc.js  629ms  prefetch
   GET  200  loader  /products/women-crewneck  2ms  [root]  prefetch
   GET  404  render  /__comp---theme-blog-post-pageccc-cab.js  618ms  prefetch
   GET  200  loader  /products/women-crewneck  528ms  [products.$handle]
   GET  404  render  /blogMetadata---shopify-authors-373-64d.js  589ms  prefetch
   GET  404  render  /plugin---shopifyc-91-119.js  581ms  prefetch
   GET  404  render  /sidebar---shopifyecf-acf.js  559ms  prefetch
   GET  200  loader  /products/women-crewneck  583ms  [products.$handle]  prefetch
   GET  404  render  /content---shopify-shopify-710-8d5.js  677ms  prefetch
   GET  404  render  /content---shopify-2024-12-09-shopify-hydrogen-767-e0f.js  626ms  prefetch
   GET  200  loader  /products/women-crewneck  4ms  [root]  prefetch
   GET  404  render  /blogMetadata---chore-authors-151-4ee.js  597ms  prefetch
   GET  404  render  /plugin---choreb-73-42a.js  577ms  prefetch
   GET  200  loader  /products/women-crewneck  539ms  [products.$handle]
   GET  404  render  /sidebar---chore-09-a-64a.js  567ms  prefetch
   GET  404  render  /content---chore-webpack-2-f-7-baa.js  653ms  prefetch
   GET  200  loader  /products/women-crewneck  624ms  [products.$handle]  prefetch
   GET  404  render  /plugin---frontend-705-754.js  597ms  prefetch
   GET  404  render  /sidebar---frontendaa-7-7eb.js  562ms  prefetch
   GET  404  render  /content---frontende-90-45c.js  540ms  prefetch
   GET  404  render  /content---frontend-775-210.js  563ms  prefetch
   GET  200  loader  /products/women-crewneck  550ms  [products.$handle]
   GET  404  render  /content---frontend-25-e-ded.js  617ms  prefetch
   GET  200  loader  /products/women-crewneck  12ms  [root]  prefetch
   GET  404  render  /content---frontend-1-e-8-726.js  601ms  prefetch
   GET  404  render  /__props---frontendea-1-e72.js  560ms  prefetch
   GET  404  render  /content---shopifyb-2-f-039.js  575ms  prefetch
   GET  404  render  /content---shopify-373-cf7.js  563ms  prefetch
   GET  404  render  /__props---shopify-99-e-795.js  578ms  prefetch
   GET  200  loader  /products/women-crewneck  6ms  [root]  prefetch
   GET  404  render  /blogMetadata---react-authorsec-1-a77.js  558ms  prefetch
   GET  200  loader  /products/women-crewneck  605ms  [products.$handle]  prefetch
   GET  404  render  /plugin---react-493-92e.js  565ms  prefetch
   GET  404  render  /sidebar---react-500-48e.js  589ms  prefetch
   GET  404  render  /content---react-react-4-b-9-f1d.js  601ms  prefetch
   GET  200  loader  /products/women-crewneck  517ms  [products.$handle]
   GET  200  loader  /products/women-crewneck  674ms  [products.$handle]  prefetch
   GET  200  loader  /products/women-crewneck  5ms  [root]  prefetch
   GET  200  loader  /products/women-crewneck  564ms  [products.$handle]
   GET  200  loader  /products/women-crewneck  2ms  [products.$handle]  prefetch
   GET  200  loader  /products/women-crewneck  3ms  [root]  prefetch
   GET  200  loader  /products/women-crewneck  586ms  [products.$handle]  prefetch
   GET  404  render  /runtime_main.9a2889b4f2652fd0.hot-update.json  1799ms
   GET  404  render  /shopify/intro  1267ms
   GET  200  loader  /products/women-crewneck  5ms  [products.$handle]  prefetch
   GET  200  loader  /products/women-crewneck  2ms  [root]  prefetch
  POST  200  action  /cart  1020ms  [cart]
   GET  200  loader  /products/women-crewneck  6ms  [root]
   GET  200  loader  /products/women-crewneck  5ms  [products.$handle]

```

:::info

View Hydrogen app: http://localhost:3000/

View GraphiQL API browser: http://localhost:3000/graphiql

View server network requests: http://localhost:3000/subrequest-profiler

---

项目启动成功之后，会默认开启 3000 端口

http://localhost:3000/ 可以本地预览 app

http://localhost:3000/graphiql 可以预览 graphiql API

http://localhost:3000/subrequest-profiler 预览网络请求过程

:::

# 安装 hydrogen 插件(关联店铺前必做)

1. 首先在 store 中 安装 hydrogen app

![image-20241211001347444](image-20241211001347444.png)

2. 输入邮箱获取免费使用
3. 配置 hydrogen 插件

​ ![image-20241211001754596](image-20241211001754596.png)

![image-20241211001923743](image-20241211001923743.png)

![image-20241211002035719](image-20241211002035719.png)

# 获取并设置环境变量

```.env
# 命令行中执行 `openssl rand -base64 32` 获得
SESSION_SECRET="foobar"

# 店铺域名 xxx.shopify.com
PUBLIC_STORE_DOMAIN="nf89.shopify.com"

# hydrogen 插件中获取
PUBLIC_STOREFRONT_ID="nf89"

# storefront api token
PUBLIC_STOREFRONT_API_TOKEN=""

# admin api token
PRIVATE_STOREFRONT_API_TOKEN=[TOKEN]

# settings/customer Accounts 中启动 enable customer Accounts ，即可获得一个 client_id
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=[ID]

# 将 hydrogen 中id替换到目标位置
PUBLIC_CUSTOMER_ACCOUNT_API_URL=https://shopify.com/[ID]
```

![image-20241211005852734](image-20241211005852734.png)

![image-20241211010112305](image-20241211010112305.png)

![image-20241211010343146](image-20241211010343146.png)

# 关联店铺

```zsh
# 更新 shopify/cli 脚手架
npm install @shopify/cli@latest
#  将 hydrogen 项目关联到 store
npx shopify hydrogen link
```

接着在命令行中任意按下一个键盘，网页中登陆授权登陆脚手架

```zsh
 hydrogen-quickstart git:(main) npx shopify hydrogen link
(node:59003) ExperimentalWarning: CommonJS module /opt/homebrew/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /opt/homebrew/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
💡 Version 3.71.4 available! Run `npm install @shopify/cli@latest`
?  Select a shop to log in to:

>  nf89 (nf89.myshopify.com)
   My Store (ipvvmm-ri.myshopify.com)
   Quickstart (c73cafdf) (quickstart-c73cafdf.myshopify.com)
   mang-he (mang-he.myshopify.com)
```

:::info

登陆成功选择你要连接的 store

:::

# 创建店铺

1. 登陆 partner.shopify.com 之后，点击 stores 创建一个测试店铺，店铺创建成功之后会直接跳转到这个店铺的后台
   `admin.shopify.com/store/nf89`

![image-20241210224551851](image-20241210224551851.png)![image-20241210224617899](image-20241210224617899.png)

![image-20241210225031276](image-20241210225031276.png)

2. 设置支持自定义 app

![image-20241210225922495](image-20241210225922495.png)

![image-20241210225947371](image-20241210225947371.png)

3. 创建 app 获取 storefront API 和 amdin API 所需 token 和密钥【用于后续项目设置环境变量】

![image-20241210230031686](image-20241210230031686.png)

![image-20241210230309617](image-20241210230309617.png)

4. 获取 admin API ，勾选所有的权限之后，安装 app

![image-20241210230423614](image-20241210230423614.png)

![image-20241210230956494](image-20241210230956494.png)

![image-20241210231152493](image-20241210231152493.png)

![image-20241210231218351](image-20241210231218351.png)

![image-20241210231514019](image-20241210231514019.png)

> token(admin)
>
> xxxxxx

> API key
>
> xxxxxx
>
> API secret key
>
> xxxxx

5. Storefront API 配置

   ![image-20241210232840021](image-20241210232840021.png)

   ![image-20241210233021453](image-20241210233021453.png)

   ![image-20241210233536411](image-20241210233536411.png)
