---
slug: v-clock/text/html 使用区别
title: v-clock/text/html 使用区别
tags: [vue, v-clock, v-text, v-html]
authors: yana
---

## v-cloak、v-text、v-html区别

1. 使用 v-cloak 能解决插值表达时闪烁的问题，默认 v-text 没有闪烁问题
2. v-text 会覆盖元素中原本的内容，但是 插值表达式 只会替代自己的占位符
3. v-html 可以输出渲染HTML标签

```html
<div id="app">
  <p v-cloak>+++++++++++ {{ msg }} +++++++++++++++++</h1>
  <!-- +++++++++++ 123 +++++++++++++++++ -->

  <p v-cloak=>+++++++++++ {{ msg3 }} +++++++++++++++++</h1>
  <!-- +++++++++++ <del>我被删了</del> +++++++++++++++++ -->

  <p v-text="msg2">我是p标签</p>
  <!-- 1456 -->
  <p v-text="">我是p标签</p>
  <!-- 我是p标签 -->
  <p v-text="msg3">我是p标签</p>
  <!-- <del>我被删了</del> -->

  <p v-html="msg3"></p>
  <!--成功渲染出 <del></del> 标签-->
 </div>
 <script>
 var vm = new Vue({
  el: '#app',
  data: {
   msg: '123',
   msg2: '1456',
   msg3: '<del>我被删了</del>'
  }
 })
 </script>
```

## vue-cloak解决插值表达式闪烁问题

当网络加载慢时，Vue.js 还没有加载完成，如果页面上使用了插值表达式，源码就会直接在页面上显示出来，只有当 vue.js 都加载出来，才会显示插入的内容

> v-claok 会保存在元素上知道关联实例编译结束，结合CSS样式:`[v-cloak] {display: none;}` `在内容还没有加载出来时`将标签隐藏

```html
<div id="app">
 <h1 v-cloak>{{ msg }}</h1>
</div>
<script>
var vm = new Vue({
 el: '#app',
 data: {
  msg: '123'
 } 
})
</script>
```

:::tip 注意事项:

- @import 加载的 CSS 文件时在在 DOM 完全加载后，才会进行加载
- 如果将[v-cloak]卸载 @import 加载的CSS文件中，就会导致页面仍然闪烁
- 为避免这种情况，将[v-cloak]写在 link 引入的 CSS 中，或者写一个内联CSS样式既可以解决问题
:::
