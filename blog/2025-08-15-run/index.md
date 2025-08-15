---
slug: interviews-run-ready
title: RUN
authors: yana
tags: [RUN]
draft: true
---

# 概念不清晰

- 组件设计模式？
- 声明式编程范式
- 函数式编程
- 虚拟 DOM
- 真实 DOM
- 高阶组件
- 低阶组件
- 单向数据流
- 不理解 useMemo 和 useCallback，其实是不知道 hooks 有什么，又是分别干嘛用的，同时使用上有什么区别
- react query 、reace dom、react router 、redux 分别有什么作用

1. React 只关注 UI 如何渲染，其他（状态管理、路由、数据源）React 不管，项目的构成自由度高

```jsx
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,

  document.getElementById('hello-example')
)
```

> 上面这种类似 XML 的结构会被 babel 编译成合法的 JS 语句调用
>
> 被传入的数据可通过 this.props 在 render() 访问

# 问题汇总

## 更新 state 死循环

外部事件、一次性初始化：用户操作、服务器返回、浏览器环境变化等菜触发的 setState 在 useEffect 中时不会导致死循环，仅在页
面加载（组件挂载）时执行一次，后续不会因为自身的 state 更新而再次执行

```jsx
/* 异步数据加载 */
useEffect(() => {
    fetch('/api/user')
    .then(res => res.json())
    .then(date => setUser(data))
},[]) // 仅在组件挂在时请求一次数据


/* 事件监听 */
useEffect(() => {},[
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

	return () => window.removeEventListener('resize', handleResize)
	// 返回的函数会在组件卸载的时候执行一次
]) // 仅在挂载/卸载时绑定/解绑一次
```

- 80%的场景是用 useState 初始化 state， useEffect 只做 state 更新之后的副作用
- 20%的场景是在 useEffect 中更新 state（但是一定要加上条件判断），确保不会形成循环依赖
- 遇到依赖链过于复杂，抽成自定义 Hook，将状态梳理清除

---

1. 副作用只做副作用，不要在 effect 中无条件更新自己依赖的状态
2. 依赖链明确，必要时判断依赖存在
3. 对象/数组/函数依赖要缓存
4. 复杂链条尽量合并更新或拆成安全的多层 effect
5. 外部事件触发的更新是安全的
