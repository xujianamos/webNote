# 1.开发环境

1. Node.js
2. Package Manager （npm、yarn、pnpm）

# 2.痛点问题

各成员Node.js版本不统一：守旧派用12.x、保守用14.x、激进用17.x。项目能否正常跑起来全凭天意，在没有 CICD 流水线加持本地 npm run build 的场景下线上风险可想而知。

有人习惯用 npm、有人习惯用 yarn, 代码库里面经常会存在 package-lock.json、yarn.lock文件同时存在的情况。更痛的点还是各种奇奇怪怪问题排查起来没有头绪。

我们要做的就是将问题掐死在源头：锁定 Node.js 版本和包管理器

# 3.锁定项目 Node 版本

通过在package.json中指定engines字段，可限定项目使用的node版本。下面配置仅允许用户使用14或者16的版本。更多的配置可以参考package.json | npm Docs 、semver

```json
  // package.json 
  "engines": {
    "node": "14.x || 16.x"
  },
```

配置之后你会发现，该字段只对yarn生效。那如何对npm也生效呢？在项目根目录下的`.npmrc`文件中增加如下配置

```bash
// .npmrc
engine-strict = true
```

以上配置完成后，npm install 试试吧，错误的 Node.js 将直接退出

# 4.锁定包管理器

利用only-allow工具包、npm scripts 快速实现锁定。

步骤一：在项目中 `npm install -D only-allow`

步骤二：在 package.json 文件中进行配置 `scripts.preinstall` ， 允许输入的值 only-allow npm、only-allow pnpm、only-allow yarn

```json
// package.json
"scripts": {
    "preinstall": "only-allow npm",
    ...
}
```

以上配置完成后，可以再乱用 （yarn、npm、pnpm） 试试