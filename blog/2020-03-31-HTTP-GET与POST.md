---
slug: http-get-post
title: HTTP - GET 与 POST
tags: [GET,POST,HTTP]
authors: yana
---

## 汇总post

|               |                             GET                              |                             POST                             |
| :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 后退按钮/刷新 |                             无害                             |    数据会被重新提交（浏览器应该改制用户数据会被重新提交）    |
|     书签      |                         可收藏为书签                         |                        不可收藏为书签                        |
|     缓存      |                           能被缓存                           |                           不能缓存                           |
|   编码类型    |              application/x-www-form-urlencoded               | application/x-www-form-urlencoded或multipart/form-data。为二进制数据使用多重编码 |
|     历史      |                    参数保存在浏览器历史中                    |                  参数不会保存在浏览器历史中                  |
|   数据长度    |             有限制，URL 的最大长度时 2048 个字符             |                            无限制                            |
|   数据类型    |                      只允许 ASCII 字符                       |                   无限制，也允许二进制数据                   |
|    安全性     | 与 POST 相比，GET 安全性较差，因为发送的的数据是 URL 的一部分。发送密码或其他敏感信息时不要使用 GET ! |                    数据不会显示在 URL 中                     |
|    可见性     |               数据在 URL 中对所有人都是可见的                |                    数据不会显示在 URL 中                     |

## 应用场景中的区别

GET 参数通过 URL 传递，POST 放在Request Body（请求体）

URL 中传送的参数是有长度限制的，而 Request Body 没有（**浏览器对 URL 长度有限制，并不是 http 协议对 get 请求参数的限制**）

GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息

GET 请求参数会被完整的保留在浏览器的历史记录里，而 POST 中的参数不会被保留

GET 请求只能进行 url 编码，而 POST 支持多种编码方式

GET 请求会被浏览器`主动 cache`，而 POST 不会，除非手动设置

GET 请求产生的 URL 地址可以被 bookmark（书签：登记 url），而 POST 不可以

GET 在浏览器 回退/刷新 时是无害的，而 POST 会再次提交请求

## 本质

两者并无区别，都是 HTTP 协议中发送请求的方法

HTTP 是基于 TCP/IP 的关于数据如何在万维网中通信的协议，底层是 TCP/IP，即 GET/POST 都是TCP 链接

GET 请求也可以带 request body ，但不能保证一定被接收到（服务器处理方式不同）；同样，POST 请求也可以在 URL 地址中传参数

:::tip GET 请求产生一个 TCP 数据包；POST 请求产生两个 TCP 数据包
:::

GET 请求：浏览器会把 HttpHeader 和 data 一并发出，服务器响应 200 （返回数据）

POST请求：浏览器先发送 header ，服务器响应 100continue，再发送data，服务器响应 200 ok（返回数据）

## 总结

1. GET 与 POST 都有自己的语义，不能随便混用

2. 网络环境好的时候：发一次包的时间和发两次包的时间 差别 基本可以无视；

   网络环境查的时候，发两次 TCP 在验证数据包完整性上，有非常大的优点。

3. 并不是所有浏览器都会在 POST 中发送两次包，Firefox 就之发送一次

[参考博文](https://www.cnblogs.com/songanwei/p/9387815.html)
