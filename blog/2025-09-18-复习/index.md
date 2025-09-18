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
