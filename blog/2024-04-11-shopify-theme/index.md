---
slug: shopify-theme
title: shopify 主题开发
authors: yana
tags: ['shopify']
date: 2024-04-11
draft: true
---

## 目录结构

```text
.
├── assets 所有资源（图像、CSS、JS）
├── config  主题配置文件
├── layout  布局文件
├── locales  翻译
├── sections  liquid、json
├── snippets  可重用 liquid（类似组件）
└── templates  模板文件（登录页、订单页、结账页）
    └── customers
```

TD:

1. 怎么初始化到实现一个模板
2. 看一遍 tailwind 语法
3. 制定脚手架项目
4. 主题开发需要考虑的自定义参数定义
    - 自定义颜色，怎么设置到标签上
    - 仅针对当前的原型去做考虑，不做过多的延展

## 文件引入

### 引入样式文件（两种方式）

```liquid
{% comment %} 适用于：同步引入的资源 {% endcomment %}
{{ 'base.css' | asse_url | stylesheet_tag }}

{% comment %} 适用于：需要对资源做 async / defer 处理 {% endcomment %}
<link rel="stylesheet" href="{{ 'base.css' | asse_url }}" />
```

## global.js 中可以自定义标签、引入三方库

```js
customeElements.define('tag-name', TagFile)
```

## snippet yinru

```liquid
{% render 'snippet-file-name', class: 'w-10' %}
```
