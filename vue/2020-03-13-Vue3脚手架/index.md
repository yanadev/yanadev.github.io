---
slug: Vue3.0脚手架
title: Vue3.0脚手架
tags: [Vue, 脚手架]
authors: yana
---

## Vue 脚手架基本用法

快速生成 Vue 项目基础架构

```js
- 安装 3.x 版本的 Vue 脚手架
npm install -g @vue/cli
// 或者 cnpm i @vue/cli -g
- 检查安装成功与否（脚手架版本号）
vue -V 
// @vue/cli 4.2.3
```

## 基于 3.x 版本的脚手架创建 vue 项目

```js
// 法一：交互式命令行
vue create my-project
// 法二：图形化界面
vue ui
// 基于 2.x 的旧版本创建
npm install -g @vue/cli-init
vue init webpack my-project
```

## 图形化界面

![image-20200313172500044](./image-20200313172500044.png)

![image-20200313172710912](./image-20200313172710912.png)

![image-20200313172754560](./image-20200313172754560.png)

![image-20200313173051395](./image-20200313173051395.png)

![image-20200313173228996](./image-20200313173228996.png)

![image-20200313173331684](./image-20200313173331684.png)

![image-20200313173852182](./image-20200313173852182.png)

## Vue 脚手架生成地项目结构分析

![image-20200313174425820](./image-20200313174425820.png)

## 通过 package.json 配置项目（不推荐）

![image-20200313175953548](./image-20200313175953548.png)

![image-20200313180147133](./image-20200313180147133.png)

## 通过单独的配置文件配置项目 （推荐）

![image-20200313180422786](./image-20200313180422786.png)
