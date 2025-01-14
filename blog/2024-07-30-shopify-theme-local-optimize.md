---
slug: shopify-theme-local-optimize
title: Shopify开发流程优化
authors: yana
tags: [shopify, 'local', 'optimize']
draft: true
---

# 性能优化

## 页面加载速度

1. 图片懒加载

```html
<img src="large-image.jpg" loading="lazy" alt="Description" />
```

2. 资源压缩 vite.config.js

```js
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser', // 使用 Terser 压缩 JS
    cssCodeSplit: true, // CSS 代码拆分
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'vue'], // 例如将第三方库分开打包
        },
      },
    },
  },
})
```

## 减少请求

1. 合并多个 CSS 和 JS 文件，减少请求数量

2. 使用 SVG，使用 SVG 而不是位图，SVG 文件体积更小，更支持高分辨率

# 代码组织

## liquid 模板优化

### 逻辑分离

将复杂的逻辑从 Liquid 模板中分离到 Javascript 文件中，简化模板代码

### 片段重用

使用 Liquid 片段 `{% include 'snippet' %}` 重用模板代码，减少冗余

```liquid
{% include 'header' %}
{% include 'footer' %}
```

### 优化条件渲染

优化 Liquid 模板中的条件渲染，避免过多的嵌套条件

# 样式组织

## 组件化

将样式按组件组织，确保每个组件有自己的样式文件

```lua
src/
├── assets/
│   ├── styles/
│   │   ├── components/
│   │   │   ├── button.css
│   │   │   └── header.css
│   │   ├── base.css
│   │   └── main.css
└── main.js
```

## 变量和混入

```css
/* src/assets/styles/variables.css */
:root {
  --primary-color: #3490dc;
  --secondary-color: #ffed4a;
}
```

# 开发流程优化

## 本地开发

:::info

server 服务器只是一次尝试，发现还是需要 ruby 来自定义一些 filter 的开发

短时间内没法做，因此实际工作中还是无法真正提升开发体验

或许得创建 独立的 shopify app 用插件形式来操作主题更为灵活

如果依赖 shopify 的 liquid 来渲染 html 结构，几乎得重写 shopify 中的 filter 功能，需要斟酌

:::

使用 Vite 和 Express 创建本地开发环境，尽量减少对 Shopify 服务器的依赖

```js
// Express server setup
const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))

app.listen(3000, () => {
  console.log('Local server running on http://localhost:3000')
})
```

## 热重载

确保开发环境支持热重载，以便快速查看更改效果

```js
// vite.config.js
export default defineConfig({
  server: {
    hot: true, // 启用热重载
  },
})
```

## 测试和验证

### 跨浏览器测试

使用工具 BrowserStack 进行跨浏览器测试，确保不同浏览器和设备上的表现一致

### 性能测试

使用工具 Lighthouse 分析页面性能，并根据建议来进行优化

# 部署和发布

## 自动化部署

使用 CI/CD 工具（如 Github Action 或者 GitLab CI）来自动化构建和部署流程，确保每次提交都经过测试和优化

```yaml
# GitHub Actions 示例
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        run: npm run deploy
```

## 版本控制

在发布新版本之前，确保所有变更都经过版本控制，并根据需要进行标记
