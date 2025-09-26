---
slug: fuxi-1
title: 复习
authors: yana
tags: [run]
draft: true
---

## 对 react 的理解，有哪些特性？

react 是一个 JS 库，用来构建用户界面

- 组件化
- 虚拟 dom
- 声明式
- 单项数据流
- hooks

## 真实 DOM 和虚拟 DOM

- 真实 DOM：静态页面、基本不更新、不依赖框架
- 虚拟 DOM：动态页面、更新频繁、依赖框架

## React 的生命周期

主要分三个阶段：

- 挂载（mounting）
- 更新（updating）
- 卸载（unmounting）

通过不同生命周期来**创建、更新、销毁组件**

1. 挂载阶段（组件首次渲染）

- constructor(props) 初始化组件状态和绑定事件
- static getDerivedStateFromProps(nextProps, nextState) 根据新的 props 更新 state
  - 首次挂载及每次 props 发生变化的时候都会调用
  - 替代旧版本的 ComponentWillReceiveProps，这个版本的方法存在的问题是？
- render() 渲染组件 UI，返回 JSX
- componentDidMount() 组件挂载完成后执行，一般用来发起网络请求或初始化第三方库等操作

2. 更新阶段（props 或 state 变化时）

- static getDerivedStateFromProps(nextProps, nextState) 再次根据 props 更新 state
  - 会在每一次 props 或 state 更新时调用
- shouldComponentUpdate(nextProps, nextState) 决定组件是否需要重新渲染
  - 通常用于性能优化，如果返回 false，React 会跳过渲染过程
- render() 渲染更新后的 UI
- getSnapshotBeforeUpdate(prevProps, prevState)
  - 在 DOM 更新之前获取一些信息（如滚动位置等），并将该信息作为 componentdidUpdate() 的第三个参数
- componentDidUpdate(prevProps,prevState, snapshot) 组件更新后执行
  - 一般用来执行副作用操作（如：网络请求、日志记录等）
  - 接受 prevProps 和 prevState，以及来自 getSnapshotBeforeUpdate 的 snapshot 参数

3. 卸载阶段（组件从 DOM 中移除时）

- componentWillUnmount() 组件卸载之前执行，一般用来清理资源，如取消订阅、清除定时器等

---

## 关于 React 16.3+ 引入的新的生命周期方法

getDerivedStateFromProps() 和 getSnapshotBeforeUpdate() 取代了 componentWillReceiveProps() 和 componentWillUpdate()

**为什么会被取代，之前有什么问题？**

- componentWillMount 已弃用，应该避免使用
  - 存在导致**死循环渲染** 或 **异步渲染不透明** 的问题，因此被启用
  - react 设计的目标就是**让生命周期每个过程都能透明、可控**，从而减少不比较的副作用和性能问题
  - 无直接替代的方法，但是官方推荐使用 constructor 和 componentDidMount 来处理初始化逻辑
  - useEffect 用于函数组件中的副作用
  - 这样的设计让 react 的生命周期变得更加简洁、直观和高效，减少不必要的复杂性和潜在问题
- componentWillReceiveProps 已弃用，建议使用 getDrivedStateFromProps
  - 原方法存在
    - 依赖实例，需要通过 this 访问组件实例，可能导致 state 更新的同步问题
    - 名称不明确，无法清晰表达其功能，引发误解
  - 新方法
    - 名称上更明确，清晰表达起功能，即：根据 props 更新 state
    - 静态方法，不依赖组件实例，直接接受 nextProps 和 nextState 作为参数，返回处理后对象
    - state 或者 null（不更新）。更新与否由 react 在渲染阶段判断
- componentWillUpdate 已弃用，建议使用 getSnapshotBeforeUpdate
  - 原方法可能在组件将要更新时被调用，会打断原渲染过程，无法保证更新时所依赖的 state 是最新的
  - 可能会导致状态不一致或 undefined 问题，进而造成 UI 不透明或白屏
  - ————————————————————————————————————————————————————————————————————————————————
  - 新方法更安全，不会打断原渲染过程，而是在 DOM 更新之前获取数据（滚动位置、布局信息等—）
  - 即便原数据被清空，getSnapshotBeforeUpdate 仍能确保返回的数据是最新的
  - 避免 undefined 导致的错误，确保渲染更加可控和一致

## props vs state

- state
  - 组件内部的**私有数据**，由组件控制和管理
  - 可变数据，可以随着组件的生命周期和用户交互发生变化
  - 可以通过 `this.setState()` [类组件] 或者 `useState()` [函数组件] 来更新
  - 组件内部的 state 变化会触发组件的重新渲染
- props
  - 父组件传递给子组件的不可变数据，子组件只能读取，不能直接修改
  - 在子组件内部是只读的，只能通过回调函数来向父组件请求修改，从而间接更新父组件的数据，达到更新 props 的效果

## state、Provider 与 redux 使用场景建议

- state 组件局部状态

  - 单个组件的内部数据，不需要跨组件共享
  - 状态更新只影响当前组件
  - 简单交互：按钮点击、输入框内容、显示/隐藏状态
  - 推荐场景：

    - 表单输入框的值
    - 开关按钮的状态
    - 显示/隐藏模态框

- Provider(contect API) 全局状态共享

  - 跨多个组件共享的只读数据，且状态变化不频繁
  - 小、中型应用的全局状态管理，适合**静态或者少量动态数据**
  - 适合**不复杂的状态交互，如语言切换、主题切换、登录状态**
  - 推荐场景

    - 应用主题（深浅色模式）
    - 当前登录用户的信息
    - 多语言支持（语言设置）
    - 权限或身份验证信息

- redux 集中式状态管理

  - 大型应用、复杂的数据流管理
  - 状态需要在 **多个页面或者模块** 之间共享，并且经常变化
  - 需要处理复杂的交互逻辑，包括 **一步操作**
  - 适合 **多层级的状态更新**，如购物车、订单状态、全局通知等
  - 推荐场景：

    - 购物车数据（商品添加、删除、数量更新等）
    - 用户信息（用户登录/登出、权限控制）
    - 异步数据（API 请求结果、订单状态）
    - 多步骤表单，涉及多个组件的协同操作

## super() 与 super(props) 区别

super 函数的作用是**执行父类的构造函数**，让子类可以通过 `this.xx` 读取到 父类的 state

- super() 调用父类的构造函数，但是不传递 props。通常父组件没有 props 使用
- super(props) 调用父类的构造函数并且传递 props。**React 推荐的标准做法**
  - 无论父组件是否传递 props，都应该使用 super(props)，确保父类构造函数正常工作，避免潜在错误

## React 中的 setState 执行机制

- 使用对象传递给 setState 会合并状态，而不会覆盖整个状态对象
- setState 是异步的，多次调用时会 批量更新，合并成一次渲染
- 为了避免因异步更新带来的潜在问题，推荐使用函数式 setState，它能够确保状态更新基于 最新的 state，从而保证数据的一致性

---

- React 合成事件中，setState 是异步的，React 会进行批量更新优化
- 原生 DOM 事件和 setTimeout 中，setState 直接同步执行，因为它们不受 React 合成事件的影响

## 事件循环

- 事件循环是 JS 处理异步操作的机制，允许单线程环境下，执行异步任务而不阻塞主线程

  - 同步代码执行栈：立刻执行，按顺序执行在执行栈中
  - 宏任务队列：在每个宏任务完成后优先执行，执行完微任务，才会去执行下一个宏任务
  - 微任务队列：等当前同步代码和微任务执行完后，按顺序从宏任务队列中取出并执行

### 初阶题目

```js
console.log('Start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve()
  .then(() => {
    console.log('Promise 1')
  })
  .then(() => {
    console.log('Promise 2')
  })

console.log('End')
```

- 打印顺序
  - Start
  - End
  - Promise 1
  - Promise 2
  - setTimeout

### 中阶题目

```js
console.log('begins')

setTimeout(() => {
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 1')
  })
}, 0)

new Promise(function (resolve, reject) {
  console.log('promise 2')
  setTimeout(function () {
    console.log('setTimeout 2')
    resolve('resolve 1')
  }, 0)
}).then((res) => {
  console.log('dot then 1')
  setTimeout(() => {
    console.log(res)
  }, 0)
})
```

- 关于 Promise 的回调

  - 遇到 resolve 直接触发了 then
  - 遇到 reject 直接触发了 catch

- 按顺序
- 同步代码 `console.log('begins')`
- 宏任务

```js
setTimeout(() => {
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 1')
  })
}, 0)
```

- 微任务

```js
new Promise(function (resolve, reject) {
  console.log('promise 2')
  setTimeout(function () {
    console.log('setTimeout 2')
    resolve('resolve 1')
  }, 0)
}).then((res) => {
  console.log('dot then 1')
  setTimeout(() => {
    console.log(res)
  }, 0)
})
```

- 首先执行所有同步代码
- 打印： **begins**
- 微任务，打印 **promise 2**
- 遇到宏任务

```js
setTimeout(function () {
  console.log('setTimeout 2')
  resolve('resolve 1')
}, 0)
```

- 微任务完毕执行，下一个宏任务
  - 打印： **setTimeout 1**，计时器内部的同步代码执行完毕，执行微任务
  - 该宏任务内部的微任务，打印 **promise 1**
- 微任务已经清空，执行下一个宏任务
  - 打印： **setTimeout 2**
  - 微任务 resolve('resolve 1')
    - 打印：**dot then 1**
    - 新的宏任务 console.log('resolve 1')
- 下一个宏任务，打印 **resolve 1**

- 最终结果
  - begins
  - promise 2
  - setTimeout 1
  - promise 1
  - setTimeout 2
  - dot then 1
  - resolve 1

### 高阶题目

```js
async function async1() {
  console.log('async1 start')
  await async2() // 最难的点就是要识别，这里虽然写着 await，但是其实就是一个同步的函数，只有后面的语句是微任务
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')
```

1. async1 执行时，首先打印 async1 start。

2. 然后 await async2() 执行：

   - async2 只是同步执行并打印 async2，但是因为 async2 被 await 调用，await 将会等待 async2 返回的 已解决的 Promise。
   - 因此，await 会把后续的代码（console.log("async1 end")）推入微任务队列，而不继续同步执行。

3. 微任务队列：await async2() 会把 async1 后续的代码推入微任务队列（即：console.log("async1 end")）。

4. 执行同步代码：然后继续执行其他同步代码，例如 console.log("script start") 和 console.log("promise1")。

5. 微任务执行：所有同步代码执行完后，微任务队列会优先执行，其中首先执行 Promise.then() 的回调（打印 promise2），然后执行
   async1 中的后续代码（打印 async1 end）。

6. 宏任务执行：最后，宏任务队列中的 setTimeout 执行，打印 setTimeout。

## 宏任务

- 定时器
- UI 事件回调
- 网络请求
- ...

## 微任务

- Promise 相关的回调
  - Promise.then()
  - Promise.catch()
  - Promise.finally()
- MutationObserver 监听 DOM 变动的 API，会将回调放入微任务队列
- queueMicrotask() 显式将回调函数放入微任务队列，确保在挡墙同步代码执行完毕后立刻执行

## 事件循环解题关键

1. 事件循环中的核心是：同步代码、微任务、宏任务的执行顺序。

2. async 函数的后续代码总是会推入 微任务队列，无论是异步还是同步操作。

3. Promise 的 resolve 或 reject 才会触发回调，其他时候是同步执行的

# Promise

## 核心考点

1. 状态与链式调用：理解“Promise 三态只改变一次”，以及链式返回值
2. 微任务队列：为什么 Promise.then 总是优先于 setTimeout
3. 错误穿透：catch 捕获后返回值如何传下去
4. 静态方法：Promise.all、race、any、allSettled 的区别
5. async/await 对应关系：本质还是 Promise

## Promise 本质：是一个表示异步操作最终结果的对象（完成 or 失败）

- Pending（等待中）：初始状态，还没有完成 or 失败
- Fulfilled（已完成）：异步操作成功完成
- Rejected（已拒绝）：异步操作失败

- 只是值的容器，只会返回一个值 or 一个 Error
- **状态只能改变一次**，一旦从 Pending -> Fulfilled/Rejected 就不能再变了

## Promise 与回调函数的区别

- 回调函数容易出现“回调地狱”，不易链式处理
  - 什么是回调地狱？
- Promise 可以链式调用，便于写顺序清晰的异步代码
- Promise 让错误处理更集中（`.catch`）

## 基本使用

- 创建 Promise

```js
const p = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true
    if (success) resolve('成功结果')
    else reject('失败返回')
  }, 1000)
})
```

- 消费 Promise
- **`.then` 可以链式调用，每一个 `.then` 的返回值都会被下一步接收**

```js
p.then((result) => {
  console.log('处理成功：', result)
}).catch((error) => {
  console.log('处理失败：', error)
})
```

- Promise 链式调用
  - `.then` 的回调可以返回一个普通值，下一个 `.then` 接受这个值
  - `.then` 的回调可以返回 Promise，下一个 `.then` 会等待它完成

```js
Promise.resolve(1)
  .then((x) => x + 1) // 2
  .then((x) => x * 2) // 4
  .then(console.log) // 输出 4
```

```js
Promise.resolve(1)
  .then((x) => Promise.resolve(x + 2))
  .then(console.log)
```

## Promise 静态方法

- Promise.resolve(value) 立刻返回一个已完成的 Promise，等价于 new Promise(resolve => resolve(value))
- Promise.reject(reason) 立刻返回一个已拒绝的 Promise，模拟错误
- Promise.all([p1,p2,...]) 所有成功才成功，任意失败即拒绝
- Promise.allSettled([p1,p2,...]) 等待所有完成，返回每个状态，失败成功都收集
- Promise.race([p1,p2,...]) 谁先成功用谁的结果，包括成功或失败
- Promise.any([p1,p2,...]) 谁先成功就用谁，全部失败才 reject

这些方法之间有什么差异？一般是在什么场景下使用？

> 笔试或面试题：区别 all 和 race、any、allSettled

# 回调地狱 Callback Hell

多层嵌套回调函数导致的代码混乱、难读、难维护情况

- 层层嵌套：“金字塔”结构
- 错误处理分散，每一层都要写 if(err)
- 逻辑顺序难读，很难直管看到执行顺序

```js
doA((err, resA) => {
  if (err) return handleErr(err)
  doB(resA, (err, resB) => {
    if (err) return handleErr(err)
    doC(resB, (err, resC) => {
      if (err) return handleErr(err)
      console.log(resC)
    })
  })
})
```
