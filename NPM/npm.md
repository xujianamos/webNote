## 1.cnpm

遇到npm无法下载资源时，使用cpm

### 1.1下载

```bash
# npm install -g cnpm --registry=https://registry.npm.taobao.org
```



### 1.2使用

```bash
# cnpm init -y
# cnpm install electron --save-dev
# npx electron -v
```

## 2.`.npmrc`配置

 .npmrc配置如下可以安装electron

```bash
registry=http://registry.npm.taobao.org/
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
electron_custom_dir=8.0.0
```

