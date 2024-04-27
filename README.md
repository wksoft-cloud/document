# template

✨ 模板

### 命令行说明

- `web:dev` web端开发
- `web:ssr` web端ssr打包
- `web:build` web端静态打包
- `api:dev` api端开发
- `api:build` api端打包

### 目录结构

```
|-- template
    |-- config ---------------------------------------------- 文件配置
    |-- packages -------------------------------------------- 项目包
        |-- web --------------------------------------------- PC 端的项目（包含前后端）
        |-- api --------------------------------------------- 后端接口（包含前后端）
```

### web 端配置与说明

web 端使用 [nuxtjs](https://nuxt.com/) 进行开发,具体配置可参考文档。

在此基础上，我们增接了默认配置

- [Pinia](https://pinia.vuejs.org/)
- [ElementPlus](https://element-plus.org/zh-CN/)
- [Tailwindcss](https://tailwindcss.com/)

以上项目已经进行了 ssr 配置，可直接使用

### api 端配置与说明

api 端使用 [nestjs](https://docs.nestjs.com/) 进行开发

在此基础上，我们增加了默认配置及部分常用模块

- 错误拦截且按照格式统一回复
- JWT 认证及拦截
- Prisma 默认配置

### 其他配置

#### prisma 常用操作

##### 1. 生成数据库对应文件

`pnpm prisma migrate dev --name init`

##### 2. 生成 client 格式 给 prisma 调用

`pnpm prisma generate`

⚠️注意 ：服务器中需要使用 `npx  prisma generate` 命令安装

##### 3. 运行网页版数据库管理器

`pnpm prisma studio`

#### nest 生成文件命令

` pnpm nest g res <team>`

### debian 安装 nvm

`sudo apt update`

`sudo apt list --upgradable`

`sudo apt-get install curl gnupg2 -y`

`sudo curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`

`sudo source ~/.bashrc`

`sudo nvm --version`

`sudo nvm install node`


### 安装 nginx

`sudo apt install nginx`

`sudo systemctl start nginx`

检查配置

```
  nginx -t
```

重启

```
  systemctl reload nginx
```

### 安装 pnpm 与 pm2

`npm install -g pnpm`

`npm install pm2 -g`


### SSL 配置

1. Certbot

```
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo apt install --only-upgrade certbot python3-certbot-nginx


mkdir -p /var/www/html/.well-known/acme-challenge/
echo "Test file content" > /var/www/html/.well-known/acme-challenge/testfile

sudo chmod -R 755 /var/www/html/.well-known

```

申请证书

```
sudo certbot --nginx -d web1.snailshellsoft.com -d web2.snailshellsoft.com

```

2. 在 nginx 中配

 ```
  location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri $uri/ =404;
    }

```

3. 重新加载

```
sudo nginx -t  # 测试配置文件是否正确
sudo systemctl reload nginx  # 重新加载Nginx

```

4. 自动续期

 ```
   sudo certbot renew --dry-run
   ```

