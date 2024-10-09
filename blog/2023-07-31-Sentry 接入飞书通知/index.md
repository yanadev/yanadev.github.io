---
slug: sentry-link-feishu
title: Sentry 接入飞书通知
authors: yana
tags: [sentry, 监控]
---

## 概览

总共分三个步骤：

1. 通过飞书机器人助手设置 **webhook 触发器**，发起一个 HTTP 请求，触发群组机器人群内消息通知
2. 启动 sentry webhook 通知，并设置对应 webhook 地址为 **飞书触发器的 webhook 地址**
3. 设置 sentry alert 信息，开启消息通知到 webhook，**因为 sentry 类型限制，默认设置下，同类型的预警 5 分钟内不通知，仅显
   示在后台**

## 创建飞书机器人指令

![image-20230731085551205](./image-20230731085551205.png)

![image-20230731085703969](./image-20230731085703969-0765035.png)

![image-20230731085818226](./image-20230731085818226.png)

![image-20230731090017719](./image-20230731090017719.png)

## 设置并获取指令 webhook 地址（该 webhook 地址用于 sentry 后台 webhook 设置）

![image-20230731090045453](./image-20230731090045453.png)

:::tip 将以下 JSON 填写到 触发器 JSON 中，**暴露 sentry 传递的对象变量给下游的操作** :::

```json
{
  "event": {
    "exception": {
      "values": [
        {
          "stacktrace": {
            "frames": []
          }
        }
      ]
    },
    "type": "Error",
    "title": "Event Title",
    "user": {
      "data": {
        "time": "",
        "environment": ""
      }
    }
  },
  "level": "error",
  "project": "payssion-dashboard-frontend",
  "url": ""
}
```

![image-20230731090703960](./image-20230731090703960.png)

:::tip 复制该 webhook 地址并保存 :::

![image-20230731090828006](./image-20230731090828006.png)

## sentry 后台：启动项目 webhook 通知，并将上面获得的 webhook 地址设置到对应的 webhook 设置中

![image-20230731091306780](./image-20230731091306780.png)

![image-20230731091211422](./image-20230731091211422.png)

![image-20230731091533486](./image-20230731091533486.png)

![image-20230731091712665](./image-20230731091712665.png)

## 开启后台 webhook 警告，新增警报规则开启 webhook 通知

![image-20230731091829942](./image-20230731091829942.png)

![image-20230731091942331](./image-20230731091942331.png)

![image-20230731092052935](./image-20230731092052935.png)

![image-20230731092332504](./image-20230731092332504.png)

![image-20230731092401679](./image-20230731092401679.png)

![image-20230731092421356](./image-20230731092421356.png)

![image-20230731092537243](./image-20230731092537243.png)

## 设置飞书机器人指令发起 HTTP 请求通知群组机器人

![image-20230731092756326](./image-20230731092756326.png)

![image-20230731092816374](./image-20230731092816374.png)

![image-20230731092941230](./image-20230731092941230.png)

:::tip 在请求体中输入一下 JSON，并手动替换其中的变量

- event.user.data.time
- project
- event.type
- event.tile
- event.exception.values[0].stacktrace.frames
- event.user.data.environment
- url :::

```json
{
  "msg_type": "post",
  "content": {
    "post": {
      "zh_cn": {
        "title": "event.user.data.time 【 project 】异常通知：",
        "content": [
          [
            {
              "tag": "text",
              "text": "【 event.type 】event.tile"
            }
          ],
          [
            {
              "tag": "text",
              "text": "event.exception.values[0].stacktrace.frames"
            }
          ],
          [
            {
              "tag": "text",
              "text": "【环境】："
            },
            {
              "tag": "text",
              "text": "event.user.data.environment"
            }
          ],
          [
            {
              "tag": "text",
              "text": "【操作】："
            },
            {
              "tag": "a",
              "text": "查看详情",
              "href": "url"
            }
          ]
        ]
      }
    }
  }
}
```

![image-20230731093912749](./image-20230731093912749.png)
