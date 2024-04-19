---
slug: liquid-section
title: liquid section 模块
authors: yana
tags: ['section', 'schema', 'shopify']
date: 2024-04-11
draft: true
---

## 目录文件

- templates
  - index.json 存储的是你在整个站点中输入的信息

## schema - 描述页面数据

> 相当于 schema 里面的 data 对象，描述页面中元素的具体使用 schema 是一个 liquid
> 对象，在这个标签中间存储着一个对象

该对象描述这个 section 中的信息

:::tip schema 中主要的定义的是提供给商户可以自定义的数据

:::

```php
{% schema %}
{
  "name": "section's name", // 模板名称
  "type": "section's type", // 模板类型
  "max-blocks": 12, // 限制板块个数
  "settings": [
    // not sure
  ],
  blocks:[
    {
      "name": "section's name",
      "type": "section's type",
      "max-blocks": 12,
      "settings": [
        // not sure
      ],
    }
  ]
}
{% schema %}

```

## 如何渲染

```liquid
{% for block in section.blocks %}
  {{ block.settings.xxxxx }}
{% endfor %}
```
