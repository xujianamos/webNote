# 1.入门

## 1.1安装

Sequelize 的使用可以通过 [npm](https://www.npmjs.com/package/sequelize) (或 [yarn](https://yarnpkg.com/package/sequelize)).

```bash
npm install --save sequelize
yarn add sequelize
```

你还必须手动为所选数据库安装驱动程序：

```shell
# 选择以下之一:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
```

## 1.2连接到数据库

要连接到数据库,必须创建一个 Sequelize 实例. 这可以通过将连接参数分别传递到 Sequelize 构造函数或通过传递一个连接 URI 来完成：

```js
const { Sequelize } = require('sequelize');
// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例
// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',// 使用的数据库类型
  storage: 'path/to/database.sqlite'
});
// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',//数据库ip地址
  dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
```

## 1.3测试连接

你可以使用 `.authenticate()` 函数测试连接是否正常：

```js
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```

## 1.4关闭连接

默认情况下,Sequelize 将保持连接打开状态,并对所有查询使用相同的连接. 如果你需要关闭连接,请调用 `sequelize.close()`(这是异步的并返回一个 Promise).

## 1.5记录日志

默认情况下,Sequelize 将记录控制台执行的每个SQL查询. 可以使用 `options.logging` 参数来自定义每次 Sequelize 记录某些内容时将执行的函数. 默认值为 `console.log`,使用该值时仅显示日志函数调用的第一个参数. 例如,对于查询日志记录,第一个参数是原始查询,第二个参数(默认情况下是隐藏的)是 Sequelize 对象.

`options.logging` 的常用值：

```js
const sequelize = new Sequelize('sqlite::memory:', {
  // 选择一种日志记录参数
  logging: console.log,                  // 默认值,显示日志函数调用的第一个参数
  logging: (...msg) => console.log(msg), // 显示所有日志函数调用参数
  logging: false,                        // 禁用日志记录
  logging: msg => logger.debug(msg),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数
  logging: logger.debug.bind(logger)     // 使用自定义记录器的另一种方法,显示所有消息
});
```

## 1.6Promises 和 async/await

Sequelize 提供的大多数方法都是异步的,因此返回 Promises. 它们都是 [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), 因此你可以直接使用Promise API(例如,使用 `then`, `catch`, `finally`).

当然,使用 `async` 和 `await` 也可以正常工作.

# 2.模型基础

