---
slug: alibaba-server-build
title: 搭建部署云服务器
authors: yana
tags: [alibaba, server, nginx, node]
draft: true
---

# 总览

本教程适用于 Ubuntu 20.04 / 22.04，主要包含以下内容：
✅ 购买并配置阿里云服务器（ECS）
✅ 使用 SSH 连接服务器
✅ 安装 Node.js、PM2、Nginx
✅ 上传并部署 React 项目
✅ 使用 Nginx 反向代理 & 配置 HTTPS

# 🚀 第 1 步：购买阿里云 ECS 服务器

1. 登录阿里云 👉 [阿里云官网](https://www.aliyun.com/)

2. 进入 ECS 控制台，选择 创建实例

   ![image-20250210114611498](image-20250210114611498.png)

   ![image-20250210114650381](image-20250210114650381.png)

   ![image-20250210115330826](image-20250210115330826.png)

   ![image-20250210115539017](image-20250210115539017.png)

:::info

计费方式：按量付费 or 包年包月（长期用推荐包年包月）
地域：选择靠近你的目标用户的地区
实例类型：2 核 4G（最少）
操作系统：Ubuntu 22.04 LTS（推荐）
存储：默认 40GB SSD
带宽：固定公网 IP，1-5 Mbps
:::

3. 创建完成后，进入 ECS 控制台，找到服务器公网 IP

```zsh
x.xxx.xx.xx
```

![image-20250210120015830](image-20250210120015830.png)

![image-20250210120159074](image-20250210120159074.png)

# 🖥 第 2 步：连接服务器

## 方式1：直接通过阿里云登录到服务器

![image-20250210163215517](image-20250210163215517.png)

![image-20250210163320114](image-20250210163320114.png)

![image-20250210163355913](image-20250210163355913.png)

会开启一个网页直接登录到服务器

![image-20250210163512319](image-20250210163512319.png)

## 方式2：Windows（使用 Xshell / PuTTY）

1. 下载 Xshell
2. 使用 SSH 连接

```zsh
ssh root@你的服务器IP
```

3. 输入密码

   ![image-20250210163830536](image-20250210163830536.png)



# 📦 第 3 步：安装 Node.js、PM2、Nginx

1. 更新服务器

```zsh
# 更新 linux 系统本地软件包索引并更新所有可以升级的软件包
apt update && apt upgrade -y
```

​	![image-20250210164330422](image-20250210164330422.png)

![image-20250210164616732](image-20250210164616732.png)

![image-20250210164639518](image-20250210164639518.png)

![image-20250210165116654](image-20250210165116654.png)

2. 安装 Node.js（使用 nvm）

```zsh
# 安装 nvm
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
# 让上面的安装更改立即生效，无需推出终端
source ~/.bashrc

# 安装 node LTS 长期支持版本
nvm install --lts
node -v  # 检查是否安装成功
```

![image-20250210164820927](image-20250210164820927.png)

3. 安装 PM2（管理 Node.js 进程）

```zsh
# 更新 npm
npm install -g npm
# 安装 PM2 管理 node 进程
npm install -g pm2
# 设置 pm2 开机自启
pm2 startup
# 冻结进程,当服务器重启的时候， pm2 会自动恢复这些进程
pm2 save
```

![image-20250210165621914](image-20250210165621914.png)

![image-20250210170720824](image-20250210170720824.png)

![image-20250210170741668](image-20250210170741668.png)

4. 安装 Nginx

```zsh
# 更新 nginx，直接点击回车键 enter 继续就行
apt install nginx -y
# 启用 nginx 服务 
systemctl enable nginx
# 启动 nginx
systemctl start nginx
nginx -v # 检查版本
```

![image-20250210171602836](image-20250210171602836.png)

# 📂 第 4 步：上传 React 项目

## 方式 1：使用 Git

1. 安装 Git

```sh
apt install git -y
```

​	![image-20250210174556540](image-20250210174556540.png)

2. 克隆你的 React 项目

```zsh
cd /var/www
git clone https://github.com/your-repo.git my-react-app
cd my-react-app
```

3. 安装依赖 & 构建

```zsh
npm install
npm run build
```

## 方式 2：使用 SCP（适合无 Git 的情况）

本地运行（Mac / Linux 终端 或 Windows Git Bash）：

```zsh
scp -r ./my-react-app root@你的服务器 IP:/var/www/my-react-app
```

# 🚀 第 5 步：使用 PM2 启动 React

1. 进入构建目录

```zsh
cd /var/www/my-react-app/next
# 我这里项目打包出来的目录是 next，如果你的是 dist，需要修改一下
```

2. 使用 serve 启动 React

```zsh
npm install -g serve
pm2 start serve --name react-app -- -s -l 3000
pm2 save
```

4. 设置开机自启

```zsh
pm2 startup
```

# 🌐 第 6 步：配置 Nginx 反向代理

1️⃣ 创建 Nginx 配置

```zsh
nano /etc/nginx/sites-available/react-app
```

2️⃣ 添加以下内容

```sh
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3️⃣ 启用配置

```sh
ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
nginx -t # 检查配置是否正确
systemctl restart nginx
```

# 🔒 第 7 步：配置 HTTPS（可选）

1️⃣ 安装 Certbot（免费 SSL 证书）

```zsh
apt install certbot python3-certbot-nginx -y
```

2️⃣ 申请 HTTPS 证书

```zsh
certbot --nginx -d your-domain.com
```

如果成功，Nginx 配置会自动更新，网站会支持 HTTPS。
3️⃣ 配置自动续期

```zsh
certbot renew --dry-run
```

# ✅ 最终测试

1. 在浏览器输入：

```zsh
http://你的服务器IP

# 或
https://your-domain.com
```

你应该能看到你的 React 项目成功运行！🎉

2. 检查 PM2 进程是否正常

```zsh
pm2 list
```

如果 react-app 进程是 online，说明项目在运行。
