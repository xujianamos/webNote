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

步骤二：在 package.json 文件中进行配置 `scripts.preinstall`

```json
// package.json
"scripts": {
    "preinstall": "npx only-allow npm",
    ...
}
```

允许输入的值：

```js
// vite使用pnpm
"preinstall": "npx only-allow pnpm"
// npm🌰
"preinstall": "npx only-allow npm"
// yarn🌰
"preinstall": "npx only-allow yarn"
```



> `preinstall` 是包安装工具的 **钩子函数**，在上例中作为 install 之前的拦截判断
>
> - preinstall:*install 之前触发*
> - postinstall:*install 之后触发*

# 5.使用钩子函数问题

经过验证，还存在一些问题：npm 和 yarn 对待 preinstall 的调用时机不一致。npm 仅会在当前项目执行安装（即 npm install）时会触发该钩子调用，单独安装某个模块（即 npm install ）时并不会触发；而 yarn 则在这两种情况下都会触发该钩子命令。这样一来，如果想通过该钩子命令去限制 npm 的使用者，就无法达到预期效果了。

preinstall 的执行是在 npm install 之后，这样提示我换用其他 pm 之前，其实已经安装完成了.

目前只能在开发中暂时使用 node v14 的 LTS，对应 npm版本 < 7来解决。