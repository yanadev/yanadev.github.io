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
|   ├── settings_data.json 中 current 是已经选择的所有的 sections 的配置
|   └── settings_schema.json liquid 中的全局对象 settings 对象可以访问 setting_schema.json 文件中定义的所有变量
├── layout  布局文件（默认情况下是 theme.liquid）
├── locales  主题翻译文件
├── sections  可复用的模块
├── snippets  可重用 liquid（类似组件）
└── templates  模板文件（登录页、订单页、结账页）
    └── customers
```

:::tip

config 中定义全局变量

- settings 可以访问到 settings_schema.json 中定义的变量

section 模块注意事项：

- 只有静态的 section 才能通过 {{section 'section name'}} 引入
- 动态的 section 只能通过在 index.liquid 中引入 content_for_index 才可以在 json
  中引用

关于 schema 中可以定义的属性：

- name 展示的名字
- class 额外添加在 section 的 p 标签上的样式
- settings 这里的 id 在该 section 中十一唯一的，可以通过
  `{{sections.settings.[id]}}` 来获得对应的 settings

关于 blocks

- tag 指定该部分的 html 标签
- blocks 可以增删重排的容器，必须有 name 和 type（type 可由主题开发者自定义任何
  值）
- limit 限制单个模块的总个数
- max_blocks 可限制最大模块数
- presets section 的默认配置
- default 可定义默认配置

关于 snippets：比 section 更小的代码块(**主要是提高代码复用率**)

templates 定义了 header 与 footer 之间的内容，会动态替换 layout 中的
content_for_layout

config.yml 包含主题配置

:::

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

## snippet 引入

```liquid
{% render 'snippet-file-name', class: 'w-10' %}
```
