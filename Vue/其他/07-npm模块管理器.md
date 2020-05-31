## 1.简介

 `npm`不需要单独安装。在安装Node的时候，会连带一起安装`npm`。但是，Node附带的`npm`可能不是最新版本，最好用下面的命令，更新到最新版本。 

```markdown
npm install npm@latest -g
```

上面的命令中，`@latest`表示最新版本，`-g`表示全局安装。所以，命令的主干是`npm install npm`，也就是使用`npm`安装自己。之所以可以这样，是因为`npm`本身与Node的其他模块没有区别。

然后，运行下面的命令，查看各种信息。

```markdown
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

## 2.npm init

`npm init`用来初始化生成一个新的`package.json`文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。

如果使用了`-f`（代表force）、`-y`（代表yes），则跳过提问阶段，直接生成一个新的`package.json`文件。

```
npm init -y
```

## 3.npm set

 `npm set`用来设置环境变量 

```
npm set init-author-name 'Your name'
npm set init-author-email 'Your email'
npm set init-author-url 'http://yourdomain.com'
npm set init-license 'MIT'
```

 上面命令等于为`npm init`设置了默认值，以后执行`npm init`的时候，`package.json`的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的` ~/.npmrc`文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行`npm config`。 

```
npm set save-exact true
```

 上面命令设置加入模块时，`package.json`将记录模块的确切版本，而不是一个可选的版本范围。 

## 4.npm config

```
npm config set prefix $dir
```

 上面的命令将指定的`$dir`目录，设为模块的全局安装目录。如果当前有这个目录的写权限，那么运行`npm install`的时候，就不再需要`sudo`命令授权了。 

```
npm config set save-prefix ~
```

 上面的命令使得`npm install --save`和`npm install --save-dev`安装新模块时，允许的版本范围从克拉符号（`^`）改成波浪号（`~`），即从允许小版本升级，变成只允许补丁包的升级。 

```
npm config set init.author.name $name
npm config set init.author.email $email
```

 上面命令指定使用`npm init`时，生成的`package.json`文件的字段默认值。 

## 5.npm info

 `npm info`命令可以查看每个模块的具体信息。比如，查看underscore模块的信息。 

```javascript
npm info underscore
{ name: 'underscore',
  description: 'JavaScript\'s functional programming helper library.',
  'dist-tags': { latest: '1.5.2', stable: '1.5.2' },
  repository:
   { type: 'git',
     url: 'git://github.com/jashkenas/underscore.git' },
  homepage: 'http://underscorejs.org',
  main: 'underscore.js',
  version: '1.5.2',
  devDependencies: { phantomjs: '1.9.0-1' },
  licenses:
   { type: 'MIT',
     url: 'https://raw.github.com/jashkenas/underscore/master/LICENSE' },
  files:
   [ 'underscore.js',
     'underscore-min.js',
     'LICENSE' ],
  readmeFilename: 'README.md'}
```

 上面命令返回一个JavaScript对象，包含了underscore模块的详细信息。这个对象的每个成员，都可以直接从info命令查询。 

```
npm info underscore description
JavaScript's functional programming helper library.

npm info underscore homepage
http://underscorejs.org

npm info underscore version
1.5.2
```

## 6.npm search

 `npm search`命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式。 

```
npm search <搜索词>
```

## 7.npm list

 `npm list`命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。 

```
npm list
```

 加上`global`参数，会列出全局安装的模块。 

```
npm list -global
```

 `npm list`命令也可以列出单个模块。 

```
npm list underscore
```

## 8.npm install

### 8.1基本用法

 Node模块采用`npm install`命令安装。 

 每个模块可以==全局安装==，也可以==本地安装==。**全局安装**指的是将一个模块安装到系统目录中，各个项目都可以调用。一般来说，全局安装只适用于工具模块，比如`eslint`和`gulp`。**本地安装**指的是将一个模块下载到当前项目的`node_modules`子目录，然后只有在项目目录之中，才能调用这个模块。 

```javascript
//本地安装
npm install <package name>（包名）

//全局安装
sudo npm install -global <package name>
sudo npm install -g <package name>
```

 `npm install`也支持直接输入Github代码库地址。 

```
npm install git://github.com/package/path.git
npm install git://github.com/package/path.git#0.1.0
```

安装之前，`npm install`会先检查，`node_modules`目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用`-f`或`--force`参数。