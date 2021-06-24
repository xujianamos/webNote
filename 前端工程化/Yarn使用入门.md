# Yarn是什么

“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如[官方文档](http://link.zhihu.com/?target=https%3A//code.facebook.com/posts/1840075619545360)中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用npm时的坑了：

- `npm install`的时候**巨慢**。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。
- 同一个项目，安装的时候**无法保持一致性**。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。

```
"5.0.3",
"~5.0.3",
"^5.0.3"
复制代码
```

“5.0.3”表示安装指定的5.0.3版本，“～5.0.3”表示安装5.0.X中最新的版本，“^5.0.3”表示安装5.X.X中最新的版本。这就麻烦了，常常会出现同一个项目，有的同事是OK的，有的同事会由于安装的版本不一致出现bug。

- 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远**不会注意到实际发生的错误**。

# Yarn的优点

- **速度快** 。速度快主要来自以下两个方面：

1. 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
2. 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。

- 安装**版本统一**：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。
- **更简洁的输出**：npm 的输出信息比较冗长。在执行 npm install  的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
- **多注册来源处理：**所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。
- **更好的语义化**： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。



# 1.安装

- 全局安装 yarn

```bash
npm i yarn -g
```

# 2.基本使用

## 2.1初始化一个新项目

```js
yarn init
```

## 2.2添加依赖包

```js
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

## 2.3将依赖项添加到不同依赖项类别中

别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies` 类别中：

```js
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

**devDependencies、peerDependencies 和 optionalDependencies区别**

在一个Node.js项目中，package.json几乎是一个必须的文件，它的主要作用就是管理项目中所使用到的外部依赖包，同时它也是npm命令的入口文件。

npm 目前支持以下几类依赖包管理：

- dependencies
- devDependencies
- peerDependencies
- optionalDependencies
- bundledDependencies / bundleDependencies

-**dependencies**

应用依赖，或者叫做业务依赖，这是我们最常用的依赖包管理对象！它用于指定应用依赖的外部包，这些依赖是应用发布后正常执行时所需要的，但不包含测试时或者本地打包时所使用的包。

**devDependencies**

开发环境依赖，仅次于dependencies的使用频率！它的对象定义和dependencies一样，只不过它里面的包只用于开发环境，不用于生产环境，这些包通常是单元测试或者打包工具等，例如gulp, grunt, webpack, moca, coffee等。

**peerDependencies**

同等依赖，或者叫同伴依赖，用于指定当前包（也就是你写的包）兼容的宿主版本。如何理解呢？ 试想一下，我们编写一个gulp的插件，而gulp却有多个主版本，我们只想兼容最新的版本，此时就可以用同等依赖（peerDependencies）来指定。

```json
{
  "name": "gulp-my-plugin",
  "version": "0.0.1",
  "peerDependencies": {
    "gulp": "3.x"
  }
}
复制代码
```

**optionalDependencies**

可选依赖，如果有一些依赖包即使安装失败，项目仍然能够运行或者希望npm继续运行，就可以使用optionalDependencies。另外optionalDependencies会覆盖dependencies中的同名依赖包，所以不要在两个地方都写。

**bundledDependencies / bundleDependencies**

打包依赖，bundledDependencies是一个包含依赖包名的数组对象，在发布时会将这个对象中的包打包到最终的发布包里。

## 2.4升级依赖包

```js
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

## 2.5移除依赖包

```js
yarn remove [package]
```

## 2.6安装项目的全部依赖

```js
yarn
或者
yarn install
```



# Yarn和npm命令对比

| npm                            | yarn                      |
| ------------------------------ | ------------------------- |
| npm install                    | yarn                      |
| npm install react --save       | yarn add react            |
| npm uninstall react --save     | yarn remove react         |
| npm install react --save-dev   | yarn add react --dev      |
| npm update --save              | yarn upgrade              |
| npm install [package] --global | yarn global add [package] |


