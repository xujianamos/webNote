## 1.快速开始

### 1.1简介

PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

### 1.2安装

```bash
npm install -g pm2
# or
npm install pm2@latest -g
# or
yarn global add pm2
```

### 1.3目录介绍

pm2安装好后，会自动创建下面目录。看文件名基本就知道干嘛的了，就不翻译了。

- `$HOME/.pm2` will contain all PM2 related files
- `$HOME/.pm2/logs` will contain all applications logs
- `$HOME/.pm2/pids` will contain all applications pids
- `$HOME/.pm2/pm2.log` PM2 logs
- `$HOME/.pm2/pm2.pid` PM2 pid
- `$HOME/.pm2/rpc.sock` Socket file for remote commands
- `$HOME/.pm2/pub.sock` Socket file for publishable events
- `$HOME/.pm2/conf.js` PM2 Configuration

### 1.4启动项目

挑我们最爱的express应用来举例。一般我们都是通过`npm start`启动应用，其实就是调用`node ./bin/www`。那么，换成pm2就是

注意，这里用了`--watch`参数，意味着当你的express应用代码发生变化时，pm2会帮你重启服务，多贴心。

```
pm2 start ./bin/www --watch
```

## 2.常用命令

### 2.1启动

参数说明：

- `--watch`：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
- `-i --instances`：启用多少个实例，可用于负载均衡。如果`-i 0`或者`-i max`，则根据当前机器核数确定实例数目。
- `--ignore-watch`：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如`--ignore-watch="test node_modules "some scripts""`
- `-n --name`：应用的名称。查看应用信息的时候可以用到。
- `-o --output <path>`：标准输出日志文件的路径。
- `-e --error <path>`：错误输出日志文件的路径。
- `--interpreter <interpreter>`：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。

```bash
pm2 start app.js --watch -i 2
```

### 2.2重启

```bash
pm2 restart app.js
```

### 2.3停止

停止特定的应用。可以先通过`pm2 list`获取应用的名字（--name指定的）或者进程id。

```bash
pm2 stop app_name|app_id
```

如果要停止所有应用，可以

```bash
pm2 stop all
```

### 2.4删除

类似`pm2 stop`，如下

```bash
pm2 stop app_name|app_id
pm2 stop all
```

### 2.5查看进程状态

```bash
pm2 list
```

### 2.6查看某个进程的信息

```bash
[root@iZ94wb7tioqZ pids]# pm2 describe 0
Describing process with id 0 - name oc-server
┌───────────────────┬──────────────────────────────────────────────────────────────┐
│ status            │ online                                                       │
│ name              │ oc-server                                                    │
│ id                │ 0                                                            │
│ path              │ /data/file/qiquan/over_the_counter/server/bin/www            │
│ args              │                                                              │
│ exec cwd          │ /data/file/qiquan/over_the_counter/server                    │
│ error log path    │ /data/file/qiquan/over_the_counter/server/logs/app-err-0.log │
│ out log path      │ /data/file/qiquan/over_the_counter/server/logs/app-out-0.log │
│ pid path          │ /root/.pm2/pids/oc-server-0.pid                              │
│ mode              │ fork_mode                                                    │
│ node v8 arguments │                                                              │
│ watch & reload    │                                                             │
│ interpreter       │ node                                                         │
│ restarts          │ 293                                                          │
│ unstable restarts │ 0                                                            │
│ uptime            │ 87m                                                          │
│ created at        │ 2016-08-26T08:13:43.705Z                                     │
└───────────────────┴──────────────────────────────────────────────────────────────┘
```

## 3.配置文件

### 3.1简单说明

- 配置文件里的设置项，跟命令行参数基本是一一对应的。
- 可以选择`yaml`或者`json`文件，就看个人洗好了。
- `json`格式的配置文件，pm2当作普通的js文件来处理，所以可以在里面添加注释或者编写代码，这对于动态调整配置很有好处。
- 如果启动的时候指定了配置文件，那么命令行参数会被忽略。（个别参数除外，比如--env）

### 例子

```json
{
  "name"        : "fis-receiver",  // 应用名称
  "script"      : "./bin/www",  // 实际启动脚本
  "cwd"         : "./",  // 当前工作路径
  "watch": [  // 监控变化的目录，一旦变化，自动重启
    "bin",
    "routers"
  ],
  "ignore_watch" : [  // 从监控目录中排除
    "node_modules", 
    "logs",
    "public"
  ],
  "watch_options": {
    "followSymlinks": false
  },
  "error_file" : "./logs/app-err.log",  // 错误日志路径
  "out_file"   : "./logs/app-out.log",  // 普通日志路径
  "env": {
      "NODE_ENV": "production"  // 环境参数，当前指定为生产环境
  }
}
```

## 4.自动重启

```bash
pm2 start app.js --watch
```

这里是监控整个项目的文件，如果只想监听指定文件和目录，建议通过配置文件的`watch`、`ignore_watch`字段来设置。

## 5.环境切换

在实际项目开发中，我们的应用经常需要在多个环境下部署，比如开发环境、测试环境、生产环境等。在不同环境下，有时候配置项会有差异，比如链接的数据库地址不同等。

对于这种场景，pm2也是可以很好支持的。首先通过在配置文件中通过`env_xx`来声明不同环境的配置，然后在启动应用时，通过`--env`参数指定运行的环境。

### 5.1环境配置声明

首先，在配置文件中，通过`env`选项声明多个环境配置。简单说明下：

- `env`为默认的环境配置（生产环境），`env_dev`、`env_test`则分别是开发、测试环境。可以看到，不同环境下的`NODE_ENV`、`REMOTE_ADDR`字段的值是不同的。
- 在应用中，可以通过`process.env.REMOTE_ADDR`等来读取配置中生命的变量。

```bash
  "env": {
    "NODE_ENV": "production",
    "REMOTE_ADDR": "http://www.example.com/"
  },
  "env_dev": {
    "NODE_ENV": "development",
    "REMOTE_ADDR": "http://wdev.example.com/"
  },
  "env_test": {
    "NODE_ENV": "test",
    "REMOTE_ADDR": "http://wtest.example.com/"
  }
```

### 5.2启动指明环境

假设通过下面启动脚本（开发环境），那么，此时`process.env.REMOTE_ADDR`的值就是相应的 http://wdev.example.com/ ，可以自己试验下。

```bash
pm2 start app.js --env dev
```

## 6.负载均衡

命令如下，表示开启三个进程。如果`-i 0`，则会根据机器当前核数自动开启尽可能多的进程。

```bash
pm2 start app.js -i 3 # 开启三个进程
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程
```

## 7.日志查看

除了可以打开日志文件查看日志外，还可以通过`pm2 logs`来查看实时日志。这点对于线上问题排查非常重要。

比如某个node服务突然异常重启了，那么可以通过pm2提供的日志工具来查看实时日志，看是不是脚本出错之类导致的异常重启。

```bash
pm2 logs
```

## 8.指令tab补全

运行`pm2 --help`，可以看到`pm2`支持的子命令还是蛮多的，这个时候，自动完成的功能就很重要了。

运行如下命令。恭喜，已经能够通过tab自动补全了。细节可参考[这里](http://pm2.keymetrics.io/docs/usage/auto-completion/)。

```bash
pm2 completion install
source ~/.bash_profile
```

## 9.开机自动启动

可以通过`pm2 startup`来实现开机自启动。细节可[参考](http://pm2.keymetrics.io/docs/usage/startup/)。大致流程如下

1. 通过`pm2 save`保存当前进程状态。
2. 通过`pm2 startup [platform]`生成开机自启动的命令。（记得查看控制台输出）
3. 将步骤2生成的命令，粘贴到控制台进行，搞定。

## 10.传入node args

直接上例子，分别是通过命令行和配置文件。

命令行：

```bash
pm2 start app.js --node-args="--harmony"
```

配置文件：

```json
{
  "name" : "oc-server",
  "script" : "app.js",
  "node_args" : "--harmony"
}
```

### 实例说明

假设是在`centos`下，那么运行如下命令，搞定。强烈建议运行完成之后，重启机器，看是否设置成功。

```bash
[root@iZ94wb7tioqZ option_analysis]# pm2 save
[root@iZ94wb7tioqZ option_analysis]# pm2 startup centos
[PM2] Generating system init script in /etc/init.d/pm2-init.sh
[PM2] Making script booting at startup...
[PM2] /var/lock/subsys/pm2-init.sh lockfile has been added
[PM2] -centos- Using the command:
      su -c "chmod +x /etc/init.d/pm2-init.sh; chkconfig --add pm2-init.sh"

[PM2] Done.
[root@iZ94wb7tioqZ option_analysis]# pm2 save
[PM2] Dumping processes
```

## 11.监控(monitor)

运行如下命令，查看当前通过pm2运行的进程的状态。

```bash
pm2 monit
```

看到类似输出

```bash
[root@oneday-dev0 server]# pm2 monit
⌬ PM2 monitoring (To go further check out https://app.keymetrics.io) 
                                       [                              ] 0 %
⌬ PM2 monitoring (To go further check o[|||||||||||||||               ] 196.285 MB  

 ● fis-receiver                        [                              ] 0 %
[1] [fork_mode]                        [|||||                         ] 65.773 MB  

 ● www                                 [                              ] 0 %
[2] [fork_mode]                        [|||||                         ] 74.426 MB  

 ● oc-server                           [                              ] 0 %
[3] [fork_mode]                        [||||                          ] 57.801 MB  

 ● pm2-http-interface                  [                              ] stopped
[4] [fork_mode]                        [                              ] 0 B   

 ● start-production
[5] [fork_mode]
```

## 12.内存使用超过上限自动重启

如果想要你的应用，在超过使用内存上限后自动重启，那么可以加上`--max-memory-restart`参数。（有对应的配置项）

```bash
pm2 start big-array.js --max-memory-restart 20M
```

## 13.更新pm2

```bash
$ pm2 save # 记得保存进程状态
$ npm install pm2 -g
$ pm2 update
```

## 14.pm2 + nginx

无非就是在nginx上做个反向代理配置，直接贴配置。

```bash
upstream my_nodejs_upstream {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name my_nodejs_server;
    root /home/www/project_root;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_max_temp_file_size 0;
        proxy_pass http://my_nodejs_upstream/;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
```