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

- 使用对象传递给 setState 会 合并状态，而不会覆盖整个状态对象。
- setState 是异步的，多次调用时会 批量更新，合并成一次渲染。
- 为了避免因异步更新带来的潜在问题，推荐使用函数式 setState，它能够确保状态更新基于 最新的 state，从而保证数据的一致性。
