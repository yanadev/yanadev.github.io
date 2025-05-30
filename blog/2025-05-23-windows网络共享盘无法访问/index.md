---
slug: windows-share-issues
title: windows网络共享盘无法访问问题
authors: yana
tags: [windows]
---

# windows 网络共享盘无法访问问题

1. 可以在网络看到局域网中的其他主机，双击连接会显示以下错误信息

![无法访问共享盘](image-9.png)

# 解决

## step1. 首先确保当前网络/属性 是否安装了多播协议

> 如果显示的属性中已经有了可靠多播协议，那么就不需要执行以下的操作

1. 打开网络和共享中心

![网络和共享中心](image.png)

2. 右键查看当前网络连接属性

![右键查看当前网络连接属性](image-1.png)

3. 为当前网络客户端安装协议

![为当前网络客户端安装协议](image-2.png)

4. 选择协议并添加

![选择协议并添加](image-3.png)

5. 安装多播协议

![安装多播协议](image-4.png)

6. 出现这个协议表示安装成功

![出现这个协议表示安装成功](image-5.png)

一般到这里，就可以正常访问共享盘了

`win+r` 快捷键输出共享盘地址 `\\192.168.x.xx\`

如果输入访问还是报错 `你不能访问此共享文件夹，因为你组织的安全策略阻止未经身份验证的来宾访问`

![无法访问共享盘，因为组织的安全策略阻止](image-10.png)

## step2 修改组织安全策略修复 "组织的安全策略阻止未经身份验证的来宾访问"

1. `win + r` 输入 `gpedit.msc`

![进入本地组策略编辑器](image-6.png)

2. 找到“启用不安全的来宾登录”设置

![启用不安全的来宾登录](image-7.png)

3. 双击将该配置从 “未配置” 修改为 “已启用”

![双击修改配置为“已启用”](image-8.png)
