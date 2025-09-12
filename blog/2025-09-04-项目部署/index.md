---
slug: aliyun-publish
title: 项目部署
authors: yana
tags: [部署]
draft: true
---

# 数据库

可以选择用本地的 mongodb 也可以选择云端的 mongodb atlas

## 注册 MongoDB Atlas

1. 打开 MongoDB Atlas 官网 https://www.mongodb.com/products/platform/atlas-database?utm_source=chatgpt.com
2. 注册账号（Google / 邮箱都行）
3. 创建一个免费 Shared Cluster（M0）：
   - 区域选离你用户近的（延迟低）
   - 免费版 512MB，足够小型盲盒项目

## 创建数据库用户

1. 在 Atlas 左侧导航选择 Database Access → Add New Database User
2. 设置用户名 / 密码，注意保存
3. 权限选择 Read and write to any database（开发用）

## 配置 IP 白名单

- 左侧导航选择 Network Access → Add IP Address

- 可以先填 0.0.0.0/0（允许任意 IP 访问，开发阶段方便）
  - ⚠️ 上线可改成你服务器的固定 IP，提高安全性

## 4️⃣ 获取连接字符串

1. 在 Cluster → Connect → Connect your application

2. 复制 MongoDB URI，示例：

```php
mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/<dbname>?retryWrites=true&w=majority
```

3. 替换：

```text
<username> → 你的数据库用户名

<password> → 密码

<dbname> → 默认数据库名字，比如 surprise-gift
```

## 项目中使用

.env 文件中

```ini
DATABASE_URL=mongodb+srv://youruser:yourpass@cluster0.abcd.mongodb.net/surprise-gift?retryWrites=true&w=majority
JWT_SECRET=supersecret
```

server.js 文件中

```js
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Atlas connected')
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })
```

## 本地开发 + 云端数据库切换

- 开发阶段： .env 用 mongodb://localhost:27017/your-project
- 上线阶段: .env 用 Atlas URI

```js
const dbURL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL_CLOUD : process.env.DATABASE_URL_LOCAL

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
```

## 额外建议

- 免费版 512MB → 小项目够用
- 数据安全：

  - 上线后不要用 0.0.0.0/0 白名单
  - Atlas 自带备份和加密

- 如果用户量大 → 可以升级付费版

# 长期项目部署

VPS + Node.js (PM2 常驻进程) + Nginx (反向代理 + HTTPS)

## 准备 vps

- 购买云服务器（阿里云、腾讯云、aws、GCP 都可），建议 1 核 2G 起步
- 系统推荐 Ubuntu20.04/22.04

## 安装基础环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 node LTS（推荐18或者20）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 检查版本
node -v
npm -v

# 安装 git
sudo apt install git -y
```

## 部署项目

```bash
# 克隆项目 替换成自己的仓库地址
git clone http://github.com/repo/your-project.git

cd your-project

# 安装依赖
npm install

# 配置环境变量
nano .env   # 写入 DATABASE_URL, JWT_SECRET 等

# ctrl + o 保存，ctrl + x 退出编辑
```

## 使用 PM2 管理进程

1. 安装 PM2

```bash
sudo npm install -g pm2
```

2. 启动项目

```bash
pm2 start server.js --name your-project
```

3. 设置开机自启

```bash
pm2 startup
pm2 save
```

4. 查看日志

```bash
pm2 logs your-project
```

## 安装 nginx 做反向代理

```bash
sudo apt install nginx -y
```

编辑配置文件

```bash
sudo nano /etc/nginx/sites-available/your-project
```

> 写入文件

**正式环境，有域名的写法**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;  # 你的 Node.js 服务端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

**测试环境，无域名有 IP 的写法**

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:4000;  # 你的 Node.js 服务端口，端口匹配项目中设置的启动端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

启用并重启

```bash
sudo ln -s /etc/nginx/sites-available/your-project /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 配置 HTTPS

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

自动续签（默认就有定时任务）：

```bash
sudo certbot renew --dry-run
```

## 最终效果

```text

访问 http://yourdomain.com/graphql → 会被自动跳转到 https://yourdomain.com/graphql。

PM2 保证服务挂了自动重启。

Nginx 提供域名解析和 HTTPS。
```
