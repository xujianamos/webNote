## 1.优点

- pnpm 是同类工具速度的将近 2 倍
- node_modules 中的所有文件均链接自单一存储位置
- pnpm 内置了对单个源码仓库中包含多个软件包的支持
- pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问

## 2.安装

```js
npm i -g pnpm
```

升级：

```js
pnpm add -g pnpm
```

以下列表列出了以往的 pnpm 版本和对应支持的 Node.js 版本。

| Node.js    | pnpm 4 | pnpm 5 | pnpm 6 | pnpm 7 |
| ---------- | ------ | ------ | ------ | ------ |
| Node.js 10 | ✔️      | ✔️      | ❌      | ❌      |
| Node.js 12 | ✔️      | ✔️      | ✔️      | ❌      |
| Node.js 14 | ✔️      | ✔️      | ✔️      | ✔️      |
| Node.js 16 | ?️      | ?️      | ✔️      | ✔️      |
| Node.js 18 | ?️      | ?️      | ✔️      | ✔️      |

## 3.命令

| npm 命令        | pnpm 等价命令                                     |
| --------------- | ------------------------------------------------- |
| `npm install`   | [`pnpm install`](https://www.pnpm.cn/cli/install) |
| `npm i <pkg>`   | [`pnpm add `](https://www.pnpm.cn/cli/add)        |
| `npm run <cmd>` | [`pnpm `](https://www.pnpm.cn/cli/run)            |

### 3.1pnpm add <pkg>

安装软件包以及其依赖的任何软件包。 默认情况下，任何新添加的软件包都将作为生产依赖项。

| 命令                 | 含义                                   |
| -------------------- | -------------------------------------- |
| `pnpm add sax`       | 保存到 `dependencies` 配置项下         |
| `pnpm add -D sax`    | 保存到 `devDependencies` 配置项下      |
| `pnpm add -O sax`    | 保存到 `optionalDependencies` 配置项下 |
| `pnpm add -g sax`    | 安装软件包到全局环境中                 |
| `pnpm add sax@next`  | 安装标记为 `next` 的版本               |
| `pnpm add sax@3.0.0` | 安装指定版本 `3.0.0`                   |

### 3.2pnpm install

### 3.3pnpm update

别名：pnpm up

### 3.4pnpm remove

别名： `rm`、`uninstall`、`un`

从 `node_modules` 目录下和 `package.json` 文件中删除软件包。

参数:

- ### --global :  从全局环境中删除指定的软件包。

- ### --save-dev, -D:仅删除 `devDependencies` 中列出的依赖包。

- ### --save-optional, -O:仅删除 `optionalDependencies` 中列出的依赖包。

- ### --save-prod, -P:仅删除 `dependencies` 中列出的依赖包。

### 3.5pnpm link

别名： `ln`

让当前目录下的软件包在系统范围内或其它位置都可访问。

```text
pnpm link <dir>
pnpm link --global
pnpm link --global <pkg>
```

> 参数:

1. --dir <dir>, -C

- **默认值**：当前工作目录
- **类型**：路径（字符串）

将链接的目标位置修改为 `<dir>`。

2. `pnpm link <dir>`

将 `<dir>` 目录下的软件包链接到当前目录下的 node_modules 目录下，或者通过 `--dir` 参数指定的目录下。

3. `pnpm link --global`

将当前工作目录或通过 `--dir` 参数指定的目录下的软件包链接到全局环境下的 `node_modules` 目录下，这样，该软件包就可以被其他软件包通过 `pnpm link --global <pkg>` 的方式引用了。

4. `pnpm link --global <pkg>`

将全局环境下的 `node_modules` 目录中的指定的软件包（`<pkg>`）链接到当前工作目录下（或通过 `--dir` 参数指定的目录下）的 `node_nodules` 目录下。

### 3.6pnpm unlink

断开某个软件包在全局范围内的链接（与 [`pnpm link`](https://www.pnpm.cn/cli/link) 命令的功能相反）。

如果不指定参数的话，所有已经链接的依赖项都将被切断链接。

此命令与 `yarn unlink` 类似，但 pnpm 会在删除外部链接后重新安装此依赖项。

> ## 参数:

1. ### --recursive, -r

断开子目录下的每个软件包中的链接；

### 3.7pnpm import

`pnpm import` 命令用于通过其他软件包管理器的 lockfile 文件生成 `pnpm-lock.yaml`。支持的源文件包括：

- `package-lock.json`
- `npm-shrinkwrap.json`
- `yarn.lock`

### 3.8pnpm rebuild

别名： `rb`

重新构建软件包。

### 3.9pnpm prune

删除不需要的软件包。

> ## 参数:

1. ### --prod

删除在 `devDependencies` 中列出的软件包。

2. ### --no-optional

删除在 `optionalDependencies` 中列出的软件包。

> prune 命令目前不支持在单体仓库（monorepo）中递归执行。如果需要在单体仓库（monorepo）下的 `node_modules` 文件夹中只安装针对生产环境（production）的依赖包的话，可以先删除 `node_modules` 文件夹，然后使用 `pnpm install --prod` 命令重新安装。