---
slug: shopify-github-action
title: shopify项目设置自动化部署
authors: yana
tags: [shopify, 'github/action']
---

## Question

1. 原生的 shopify 主题开发中引入了 `tailwind`、`webpack` 等编译工具，本地开发的时候控制台一直告警
2. 在根目录中引入除了主题文件以外的其他文件时，无法使用 `shopify theme push` 等 shopify/cli 工具来预览在线开发主题
3. 有时候在网页编辑器中修改主题之后,直接用 `shopify theme pull` 来拉取主题,会直接覆盖/移除本地其他重要文件
4. 开发和用户环境有冲突，开发期间，shopify 店铺有数据增减，与 shopify 店铺直连的分支会接收来自店铺的一些更新，这部分更新
   需要可以更新到开发分支

## 解决方案

1. 维护一个单独的目录来存放主题文件，支持上传、下拉主题文件
2. 创建 action 自动化部署来清理出一个干净的分支同步 shopify 店铺当前在线主题
3. 同时在 dev 项目的 shopify 文件夹中维护另一个 github 地址来更新最新的 main 分支

## 具体操作

### 创建 Github Actions 工作流

github 仓库中，根目录中创建 `.github/workflows/sync-shopify-to-main.yml` 目录

```yaml
name: Sync Shopify Folder to Main

on:
  push:
    branches:
      - dev

jobs:
  sync-shopify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout dev branch
        uses: actions/checkout@v2
        with:
          ref: dev

      - name: Copy Shopify folder
        run: |
          mkdir shopify_copy
          cp -R ./shopify/* shopify_copy/

      - name: Checkout main branch
        uses: actions/checkout@v2
        with:
          ref: main
          persist-credentials: false

      - name: Copy files to main
        run: |
          cp -R shopify_copy/* .

      - name: Configure git
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'

      - name: Commit changes
        run: |
          git add .
          git commit -m "Sync Shopify folder from dev branch"
          git push origin main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

1. 触发条件：工作流在 dev 分支有推送事件时触发
2. Checkout dev 分支：使用 actions/checkout@v2 操作从 dev 分支检出代码
3. 复制 Shopify 文件夹：将./shopify 文件夹中的所有内容复制到一个临时目录 shopify_copy 中
4. Checkout main 分支：再次使用 actions/checkout@v2 操作，这次检出 main 分支，并取消 persist-credentials 以防止凭证问题
5. 复制文件到 main：将 shopify_copy 中的内容复制到当前工作目录（即 main 分支的根目录）
6. 配置 Git：设置 Git 用户信息，以便 GitHub Actions 机器人能够提交更改
7. 提交更改：添加、提交并推送更改到 main 分支。这里使用了 GitHub 提供的 GITHUB_TOKEN，该令牌由 GitHub Actions 自动提供，
   并在运行工作流时注入到环境中
