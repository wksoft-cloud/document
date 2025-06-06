# document

✨ 开发知识库

# prisma 常用操作

##### 1. 生成数据库对应文件

`pnpm prisma migrate dev --name init`

##### 2. 生成 client 格式 给 prisma 调用

`pnpm prisma generate`

⚠️注意 ：服务器中需要使用 `npx  prisma generate` 命令安装

##### 3. 运行网页版数据库管理器

`pnpm prisma studio`

#### nest 生成文件命令

` pnpm nest g res <team>`

# debian 安装 nodejs 环境

### 安装 nvm

`sudo apt update`

`sudo apt list --upgradable`

`sudo apt-get install curl gnupg2 -y`

`sudo curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`

`source ~/.bashrc`

`nvm --version`

`nvm install node`

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

### 域名证书 SSL 配置

Certbot

```
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

在 nginx 中配

 ```
  location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri $uri/ =404;
    }

```

重新加载

```
sudo nginx -t  # 测试配置文件是否正确
sudo systemctl reload nginx  # 重新加载Nginx

```

自动续期

```
   sudo certbot renew --dry-run
```

# debian 配置 github

### 安装 git

`sudo apt install git`

### 在服务器中配置 ssh 证书，用于从 github 账户中 clone 项目

```
ssh-keygen -t ed25519 -C "antonin.chenying@gmail.com"
```

### 获取密钥并存储到 github 中

```
cat ~/.ssh/id_ed25519.pub
```

### 在服务器中克隆项目

```
 git clone git@github.com:wokesoft/serverless.git
```

# mac 端获取 泛域名 SSL 证书

在 mac 上获取通配符证书

1. 安装

`brew install python`

`python3 -m venv myenv`

`source myenv/bin/activate`

`pip install certbot certbot-dns-aliyun`

`chmod 600 config/dns/aliyun.ini`
`chmod 600 config/dns/cli.ini`

` sudo certbot certonly \
--dns-aliyun-credentials config/dns/aliyun.ini \
--config config/dns/cli.ini \
-d "wksoft.cloud" -d "*.wksoft.cloud" -d "*.ft.wksoft.cloud" -d "*.ftadmin.wksoft.cloud"
`

`deactivate`

`sudo cat  ` 查看即可

`openssl ec -in config/dns/privkey.pem -out rsa_key.pem` 转 rsa 密钥

sudo certbot certonly --manual -d "*.wksoft.cloud" -d "wksoft.cloud" --preferred-challenges dns


# 微信支付库配置

```
$ ./node_modules/.bin/wxpay crt \
-m 1683861869 \
-s 3E5B7A4FC88F2916BC379C54AB6F9193F16E93B5 \
-f apiclient_key.pem \
-k NCtU4tvbHCDA0iK9c56AZd65DzmSChen \
-o .
```
