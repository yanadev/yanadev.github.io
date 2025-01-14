---
slug: github-action-ci
title: 自动化部署脚本
authors: yana
date: 2024-05-06
tags: ['github', 'action', 'yml', 'blog']
draft: true
---

## 通用版本

```yml
name: Deploy Docusaurus Blog to GitHub Pages

on:
  push:
    branches:
      - master # 你可以根据实际情况修改为你想要触发部署的分支

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: 检出仓库
      - name: Checkout repository
        uses: actions/checkout@v2

      # Step 2: 设置 Node.js 版本
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      # Step 3: 安装依赖
      - name: Install dependencies
        run: yarn

      # Step 4: 构建静态文件
      - name: Build static files
        run: yarn build

      # Step 5: 部署到 GitHub Pages
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }} # 使用 GitHub 内置的 GITHUB_TOKEN
          publish_dir: build # 指定构建后的静态文件目录
          user_name: yanadev # 填入你的 GitHub 用户名
          user_email: 1245485816@qq.com # 填入你的邮箱
          commit_message: 'Deploy Docusaurus blog to GitHub Pages'
```

## 需要自定义项目 secret，在账户 setting 中生成 personal access token (classic)

```yml
name: Deploy Docusaurus Blog to GitHub Pages

on:
  push:
    branches:
      - master # 可以根据实际情况修改分支名称

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: yarn

      - name: Build static files
        run: yarn build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: build
          user_name: yanadev
          user_email: 1245485816@qq.com
          commit_message: 'Deploy Docusaurus blog to GitHub Pages'
```
