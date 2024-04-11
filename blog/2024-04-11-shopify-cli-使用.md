---
slug: shopify-cli-use
title: \@shopify/cli 使用
authors: yana
date: 2024-01-11
tags: ['shopify', 'tool']
draft: true
---

## 首次登录

```shell

shopify theme dev --store <your-store-name>

eg: shopify theme dev --store xxx.myshopify.com

```

随后就会打开一个网页链接，要求你登陆账号，才能继续后续操作
登录成功之后，会在控制台显示当前状态 `logged in`
可以 `ctrl+c` 推出当前进程

## 切换店铺账号操作

如果需要在账户之间切换，可先注销当前用户之后，在重新登录

```shell
shopify auth logout
```

## 查看当前登陆账号信息

```shell
shopify theme info
## 执行该命令会列出你当前登录的店铺信息
```

```shell
$ shopify theme info
THEME CONFIGURATION
Store                  na2demo.myshopify.com
Development Theme ID   Not set

TOOLING AND SYSTEM
Shopify CLI    3.58.2
OS             windows-amd64
Shell          E:\develop\Git\usr\bin\bash.exe
Node version   v18.20.1
Ruby version   3.2.3
```

## theme 常用命令

```shell
shopify theme dev 本地预览（热更新）
shopify theme check 分析 code 是否有误
shopify theme list 列出所有主题
shopify theme open 返回线上可预览的链接
shopify theme pull 拉取主题
shopify theme push 上传主题覆盖原主题
shopify theme share 上传主题（以新主题的形式上传）
shopify theme publish 发布主题
shopify theme package 将本地主题打包成可上传的 zip 格式
shopify theme delete  从商店中删除主题
shopify theme info 查看本地主题的运行环境
```

## 一个小案例

```shell
# 退出登录 如果已经登录了账户，需要切换（可选）
shopify auth logout

# 登录账户
shopify dev --store <your-store-name>

# 主题拉取：执行之后会出出先一个theme列表让你选择，你可以选择想要拉取的主题
## 会在当前的执行目录中，直接存放拉取来的代码
shopify theme pull

# 本地运行预览
shopify theme dev

# 开发完毕之后，可以执行查看线上的预览链接
shopify theme open

# 如果不想覆盖当前的主题，想要重新创建一个主题副本（新主题）
shopify theme share

# 更新覆盖主题
shopify theme push
```

> 至此 theme 项目已经可以在本地运行了

## git 存储

```shell
# 初始化 git
git init

# 在 github 上创建新的仓库
# 获取仓库地址之后连接远程仓库
git remote add origin <your-github-repo-address>

# 本地提交代码、合并分支
git add .
git commit -m 'init: init project'

# your-branch-name 换成你在编辑的分支名称
git pull origin <your-branch-name>

# 拉取远程分支
git pull --allow-unrelated-histories origin <your-branch-name>

# 合并之后重新 commit 一下，提交代码
git commit -m 'update: merge'
git push origin <your-branch-name>
```
