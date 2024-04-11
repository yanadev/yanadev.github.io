---
slug: seo-optimize
title: SEO 性能优化
authors: yana
tags: ['SEO']
date: 2024-04-10
draft: true
---

网站性能测试软件有很多，这里使用 lighthouse cli 作为工具测试

## 安装 lighthouse cli

```shell
npm install -g lighthouse
```

## 选择分析选项

```shell

lighthouse https://yourwebsite.com --only-categories=performance,accessibility,best-practices,seo --view

```

-   --only-categories=performance,accessibility,best-practices,seo 可以指定想要分析的类别

```shell

lighthouse https://yourwebsite.com --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=lighthouse_report.json

```

## 可优化的点

### JS 延迟加载

#### 原生写法

:::tip
原生实现: 页面加载的时候，只加载可视区域内的图片，当用户滚动页面的时候，再去加载其他区域的图片
:::

```js
document.addEventListener('DOMContentLoaded', function () {
    var lazyImages = document.querySelectorAll('img.lazy')
    var lazyImageObserver = new IntersectionObserver(function (
        entries,
        observer
    ) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var lazyImage = entry.target
                lazyImage.src = lazyImage.dataset.src
                lazyImage.classList.remove('lazy')
                lazyImageObserver.unobserve(lazyImage)
            }
        })
    })

    lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage)
    })
})
```

#### 引入三方库

lazyload.js、lozad.js

### 资源文件压缩

#### 图片压缩

-   ImageOptim：ImageOptim 不仅可以用于单个图片的优化，还支持批量处理。您可以将整个文件夹中的图片拖放到 ImageOptim 窗口中，它会自动对所有图片进行优化。

-   TinyPNG / TinyJPG：虽然 TinyPNG 和 TinyJPG 主要是在线服务，但它们也提供了 API 和 Photoshop 插件等功能，可以用于批量处理图片。您可以通过 API 或 Photoshop 插件批量上传和压缩图片。

-   OptiPNG 和 JPEGoptim：OptiPNG 和 JPEGoptim 都是命令行工具，可以通过批处理脚本来批量处理图片。您可以编写简单的脚本，循环遍历文件夹中的所有图片，并对它们进行批量优化。

-   Kraken.io：Kraken.io 提供了一个在线批量处理工具，可以一次性上传多个图片并进行批量优化。您可以在 Kraken.io 网站上使用批量上传功能来处理整个文件夹中的图片。

-   Squoosh：虽然 Squoosh 主要是一个在线工具，但它也提供了批量处理功能。您可以通过拖放方式将多个图片上传到 Squoosh，并一次性对它们进行优化。

### Javascript 优化

1. 减少重复操作、不必要的计算，尽可能重用已计算过的结果

2. 优化 DOM 操作，减少 DOM 操作次数，使用 DocumentFragment 或者一次性更新的方式优化批量 DOM 操作

3. 事件委托，利用时间冒泡机制处理时间，避免直接给每个子元素绑定事件处理函数

4. 合适的数据结构

    :::tip
    使用 Map 或者 Set 来存储唯一值
    :::

5. 部署之前，使用代码压缩工具来压缩和混淆 Javascript，减小文件体积和提高加载速度

### 优秀的响应式

### 限制第三方代码的加载时间和速度

1.  将第三方的代码放在页面底部，使用 async/defer 来异步加载代码

    :::tip
    异步加载
    :::

    ```html
    <script async src="https://third-party.com/third-party.js"></script>
    ```

    :::tip
    延迟加载
    :::

    ```js
    window.addEventListener('DOMContentLoaded', function () {
        var script = document.createElement('script')
        script.src = 'https://third-party.com/third-party.js'
        document.body.appendChild(script)
    })
    ```

2.  资源懒加载

    仅在需要的时候才加载第三方代码，减少首屏加载开销（用户与页面交互时/滚动到特定位置才加载代码）

    ```js
    window.addEventListener('scroll', function () {
        if (isElementInViewport(document.getElementById('lazy-load-element'))) {
            var script = document.createElement('script')
            script.src = 'https://third-party.com/third-party.js'
            document.body.appendChild(script)
            // 停止监听滚动事件，避免重复加载
            window.removeEventListener('scroll', arguments.callee)
        }
    })

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        )
    }
    ```

3.  代码分割

```js
// 使用动态 import 实现代码分割
const button = document.getElementById('loadButton')
button.addEventListener('click', async () => {
    const { func } = await import('./module.js')
    func()
})
```

## 总结：seo 优化关键点

-   清晰的网站结构和链接：使用语义化 HTML 和良好的内部链接构建网站结构。

-   优化页面标题和描述：确保每个页面有相关的标题和描述，吸引用户点击。

-   商品描述和图片优化：充实描述内容，为图片添加适当的 alt 文本。

-   网站速度优化：压缩图片，加速加载速度，提高用户体验。

-   移动友好性：确保网站在移动设备上显示良好，提供良好的移动体验。

## 站点存在的问题分析

### 报告中的数据

```

```
