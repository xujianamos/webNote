## 1.git简介

### 1.1 优点

- 大部分操作在本地完成， 不需要联网  
- 与 Linux 命令全面兼容  

### 1.2 git结构

![图像 2](E:%5CwebNote%5CGit%5Cgit.assets%5C%E5%9B%BE%E5%83%8F%202-1581738782844.png)

### 1.3 git和代码托管中心

代码托管中心的目的：维护远程库  

- 局域网环境下

GitLab 服务器  

- 外网环境下

GitHub，码云

### 1.4 本地库和远程库的交互

#### 1.4.1团队内部协作

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5C%E5%9B%BE%E5%83%8F%203-1581741543307.png" alt="图像 3" style="zoom:80%;" />

#### 1.4.2跨团队协作

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5C%E5%9B%BE%E5%83%8F%204.png" alt="图像 4" style="zoom:80%;" />

## 2. git命令行操作

### 2.1本地库初始化

命令：`git init`

注意： .git 目录中存放的是本地库相关的子目录和文件， 不要删除， 也不要胡
乱修改。  

### 2.2 设置签名

作用： 区分不同开发人员的身份
辨析： 这里设置的签名和登录远程库(代码托管中心)的账号、 密码没有任何关
系。  

#### 2.2.1项目级别/仓库级别

- 仅在当前本地库范围内有效

- 命令：

```nginx
git config user.name 用户名
git config user.email 邮箱地址
eg:
git config user.name xujian
git config user.email 2513573453@qq.com
```

查看设置的信息：`cat .git/config`

#### 2.2.2系统用户级别

- 登录当前操作系统的用户范围
- 命令

```nginx
git config --global user.name 用户名
git config --global user.email 邮箱地址
```

查看设置的信息：`cat ~/.gitconfig`

#### 2.2.3 优先级

- 就近原则： 项目级别优先于系统用户级别， 二者都有时采用项目级别
  的签名  
- 如果只有系统用户级别的签名， 就以系统用户级别的签名为准  

- 二者都没有不允许  

### 2.3 基本操作

#### 2.3.1状态查看

- 作用：查看工作区、 暂存区状态  

- 命令：`git status`

#### 2.3.2添加到暂存区

- 作用：将工作区的“新建/修改” 添加到暂存区  
- 命令：`git add 文件名`
- 扩展：也可使用`git add .` 添加所以文件到暂存区

### 2.3.3提交到本地库

- 作用：将暂存区的内容提交到本地库  
- 命令：`git commit -m "提交信息"`

#### 2.3.4查看历史记录

- 作用：查看操作的历史记录。
- 注：必须要执行==提交到本地库==的操作，才会产生历史记录

- 命令：`git log`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215150322866.png" alt="image-20200215150322866" style="zoom:80%;" />

- 注：使用==空格==向下翻页，==b==向上翻页，==q==退出

- 扩展

命令：`git log --pretty=oneline`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215150706360.png" alt="image-20200215150706360" style="zoom:80%;" />

命令：`gitlog --oneline `

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215150900151.png" alt="image-20200215150900151" style="zoom:80%;" />

命令：`git reflog`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215150942288.png" alt="image-20200215150942288" style="zoom:80%;" />

注：HEAD@{移动到当前版本需要多少步}  

#### 2.3.5前进后退

- 本质：通过HEAD指针进行移动来实现版本回退
- 注：必须提交到本地库的文件操作才能实现前进后退

1. 基于索引值操作（推荐）

```nginx
git reset --hard 索引值
eg:
git reset --hard 91d0d11
执行这个命令，此时添加文件d.txt的这个版本就被移除了，回到上一个提交的版本。
```

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215152042202.png" alt="image-20200215152042202" style="zoom:80%;" />

2. 使用^符号：只能后退

```nginx
git reset --hard HEAD^
注：一个^表示后退一步， n 个表示后退 n 步
```

3. 使用~符号：只能后退

```nginx
git reset --hard HEAD~n
注：n代表后退n步
```

> reset命令的三个参数对比

1. `--soft`参数

   - 仅仅在==本地库==移动 HEAD 指针

   <img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215180726190.png" alt="image-20200215180726190" style="zoom:80%;" />

   - 含义：本地库退后一步。因此文件状态显示为绿色，因为只有本地库退后，但是文件已经执行了git add命令提交到暂存区了。

2. `--mixed`参数

   - 在==本地库==移动 HEAD 指针  
   - 重置==暂存区==  

   <img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215200335433.png" alt="image-20200215200335433" style="zoom:80%;" />

   - 含义：本地库与暂存区后退一步（也就是撤销之前操作）。此时文件状态显示为红色，相当于撤销了git add操作。

3. `--hard`参数

   - 在==本地库==移动 HEAD 指针  
   - 重置==暂存区==  
   - 重置==工作区==  

   <img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215200606538.png" alt="image-20200215200606538" style="zoom:80%;" />

   - 含义：本地库，暂存区，工作区都后退一步。因此在工作区执行的所有操作都会被取消，如新建文件，修改文件等。

#### 2.3.6删除文件并找回

- 前提：删除前， 文件已经提交到了本地库。
- 命令：`git reset –-hard 指针位置`
  - 删除操作已经提交到本地库： 指针位置指向历史记录  
  - 删除操作尚未提交到本地库： 指针位置使用 HEAD  

#### 2.3.7比较文件差异

- `git diff 文件名`

将工作区中的文件和暂存区进行比较  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215202407881.png" alt="image-20200215202407881" style="zoom:80%;" />

- `git diff 本地库中历史版本 文件名   `

将工作区中的文件和本地库历史记录比较  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215202605769.png" alt="image-20200215202605769" style="zoom:80%;" />

- 不带文件名比较多个文件  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215202727003.png" alt="image-20200215202727003" style="zoom:80%;" />

## 3. git分支管理

### 3.1含义

在版本控制过程中， 使用多条线同时推进多个任务。  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215204916904.png" alt="image-20200215204916904" style="zoom:80%;" />

说明：

- hotFix：为热修复分支，主要用于修改bug
- master:主分支，所有次分支都需要合并到此分支上
- feature1:功能分支1，主要用于单独开发一个新的功能
- feature2:功能分支2，主要用于单独开发一个新的功能

### 3.2分支优点

- 同时并行推进多个功能开发， 提高开发效率  

- 各个分支在开发过程中， 如果某一个分支开发失败， 不会对其他分支有任
  何影响。 失败的分支删除重新开始即可。  

### 3.3 分支基本操作

#### 3.3.1 创建分支

```nginx
git branch 分支名
```

#### 3.3.2 查看分支

```nginx
git branch -v
git branch
```

#### 3.3.3 切换分支

```nginx
git checkout 分支名
```

#### 3.3.4 合并分支

- 注：合并分支时，是合并的本地库的内容。因此分支修改后都需要提交到本地库才能进行合并

```nginx
第一步：切换到接受修改的分支（被合并， 增加新内容） 上
git checkout 被合并分支名
第二步：执行 merge 命令
git merge 有新内容分支名
```

#### 3.3.5 解决合并分支冲突

- 产生：不同分支修改同一文件的同一地方，合并时就会产生冲突

![image-20200215212007423](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215212007423.png)

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215211934479.png" alt="image-20200215211934479" style="zoom:100%;" />

- 解决
  - 第一步： 编辑文件， 删除特殊符号  。使用`vim 文件名`命令打开文件
  - 第二步： 把文件修改到满意的程度， 保存退出  
  - 第三步： git add [文件名]  
  - 第四步： git commit -m "日志信息"  
    - 注意： 此时 commit 一定不能带具体文件名  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213044083.png" alt="image-20200215213044083" style="zoom:80%;" />

### 3.4分支管理机制

#### 3.4.1分支创建

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213538607.png" alt="image-20200215213538607" style="zoom:80%;" />

#### 3.4.2分支切换

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213606772.png" alt="image-20200215213606772" style="zoom:80%;" />

#### 3.4.3分支提交版本

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213702558.png" alt="image-20200215213702558" style="zoom:80%;" />

#### 3.4.4分支合并

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213732473.png" alt="image-20200215213732473" style="zoom:80%;" />![image-20200215213750415](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213750415.png)

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215213814249.png" alt="image-20200215213814249" style="zoom:80%;" />

### 3.5分支实战

#### 3.5.1编写代码前创建分支

- 适用于编写代码前就已经创建了子分支

```nginx
//1.编写代码前操作
git branch  查看分支
git checkout -b rights  创建rights分支，并且切换到此分支上
git branch	查看分支
git push -u origin rights	第一次推送需要带 -u 参数，rights为云端分支。也就是第一次云端创建此分支

//2.编写完成代码操作
git branch 	查看分支
git add .	提交所有修改到暂存区
git commit -m '提交信息'	提交所有到本地库
git push	推送子分支到远端仓库

//3.合并到主分支
git checkout master		切换到主分支
git merge rights		将子分支rights 合并到主分支上
git branch	查看分支
git push	推送主分支到远端仓库
```

#### 3.5.2编写后创建分支

- 适用于在master主分支上编写业务代码，并没有创建子分支

```nginx
//1.迁移代码操作
git branch
执行下一步操作后，其他分支的所有代码的修改都迁移到此分支，相当于将代码剪切到user分支
git checkout -b user
git branch
git status
git add .
git commit -m '提交信息'

//2.推送子分支到云端
git branch
git push -u origin user

//3.合并到主分支
git checkout master
git merge user
git push
```

## 4.GitHub

### 4.1创建远程库地址别名

```nginx
//查看当前所有远程地址别名
git remote -v 
//创建地址别名
git remote add 别名 远程地址
```

注：远程地址可以是`https`格式，也可以是`ssh`格式

### 4.2推送

#### 4.2.1 https格式推送

```nginx
git push 地址别名 推送分支名
```

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215214841617.png" alt="image-20200215214841617" style="zoom:80%;" />

#### 4.2.2 ssh格式推送

- ssh设置

```nginx
//进入当前用户的家目录
	cd ~
//删除.ssh 目录
	rm -rvf .ssh
//运行命令生成.ssh 密钥目录
	ssh-keygen -t rsa -C 2513573453@qq.com(为邮箱地址)
//进入.ssh 目录查看文件列表
	cd .ssh
	ls -lF
//查看 id_rsa.pub 文件内容
	cat id_rsa.pub
//复制 id_rsa.pub 文件内容， 登录 GitHub， 点击用户头像→Settings→SSH and GPG keys

//New SSH Key
//输入复制的密钥信息
//回到 Git bash 创建远程地址别名
git remote add origin_ssh git@github.com:xujianamos/test.git
//推送文件进行测试
```

- 推送测试

```nginx
//地址别名：为ssh格式的地址别名
git push 地址别名 推送分支名
```

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215215408162.png" alt="image-20200215215408162" style="zoom:80%;" />

### 4.3克隆

- 命令：`git clone 远程地址`

- 注：远程地址为https和ssh都可以

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215215749271.png" alt="image-20200215215749271" style="zoom:80%;" />

- 效果
  - 完整的把远程库下载到本地  
  - 创建 origin 远程地址别名  ：因此可以使用`git push`命令 直接推送到远程
  - 初始化本地库  ：本地也会有`.git`的隐藏文件，里面有设置的详细信息

推送本地库到远程：

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215225606803.png" alt="image-20200215225606803" style="zoom:80%;" />![image-20200215230302002](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215230302002.png)

查看本地库信息：

![image-20200215230315433](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215230315433.png)

### 4.4 团队成员邀请

- 注意：是针对某一个仓库进行成员邀请。因此需要点开仓库进行设置

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215231601685.png" alt="image-20200215231601685" style="zoom:80%;" />

当点击第四步操作时，会显示下面图

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215232108854.png" alt="image-20200215232108854" style="zoom:80%;" />

关键：==xujianamos==通过其他方式把邀请链接发送给==aaaabz==， `aaaabz` 登录自己的 GitHub
账号， 访问邀请链接  ,点击同意即可加入团队成员

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200215232720159.png" alt="image-20200215232720159" style="zoom:80%;" />

### 4.5拉取

#### 4.5.1 拉取操作

1. `git fetch`操作

- 作用：拉取远程仓库 的内容，但不修改本地仓库的内容。只是单纯拉取下来
- 命令：`git fetch [远程库地址别名] [远程分支名]`

拉取示例：

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216114651767.png" alt="image-20200216114651767" style="zoom:80%;" />

2. `git merge`操作

- 作用：将远程拉取下来的分支合并到本地分支上
- 命令：`git merge [远程库地址别名/远程分支名] `

- 注意：地址别名和分支名之间是`/`

示例

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216115238656.png" alt="image-20200216115238656" style="zoom:80%;" />

3. `git pull `操作

- 作用：相当于同时执行了`git fetch`和`git merge`操作

- 命令：`git pull [远程库地址别名] [远程分支名] `

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216121157193.png" alt="image-20200216121157193" style="zoom:80%;" />

4. 使用场景

- 当所做的修改比较简单，远程分支与本地分支不会存在冲突时，使用`git pull`操作

- 如果修改复杂，为了慎重，建议先使用`git fetch`先抓取下来，再使用`git merge `进行合并

#### 4.5.2拉取冲突

1. 产生原因：团队协作不同人员对同一地方修改后，抢先一步提交到远程库中。其他人此时推送将会失败

2. 解决要点：

- 如果不是基于 GitHub 远程库的最新版所做的修改， 不能推送， 必须先拉取。  
- 拉取下来后如果进入冲突状态， 则按照==分支冲突解决== 操作解决即可。  

### 4.6跨团队合作

1. 其他团队成员`fork`远程仓库代码

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216122622509.png" alt="image-20200216122622509" style="zoom:80%;" />

2. 查看fork的信息

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216122749910.png" alt="image-20200216122749910" style="zoom:80%;" />

3. 克隆到本地，然后推送到远程仓库
4. 将修改提交到fork来源仓库

5. 点击 `pull requests`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216123159483.png" alt="image-20200216123159483" style="zoom:80%;" />

6. 新建 `pull requests`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216123258616.png" alt="image-20200216123258616" style="zoom:80%;" />



7. 创建`pull requests`

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216123708530.png" alt="image-20200216123708530" style="zoom:50%;" />



8. 发送请求

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216123946287.png" alt="image-20200216123946287" style="zoom:50%;" />

9. 其他团队成员点击仓库的`pull requests`，查看成员发送过来的消息进行交流（点击发送的消息才能进入代码审核页面）。审核代码

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216125326376.png" alt="image-20200216125326376" style="zoom:80%;" />

10. 合并代码

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216124809905.png" alt="image-20200216124809905" style="zoom:80%;" />

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216125602126.png" alt="image-20200216125602126" style="zoom:80%;" />

11. 将远程库修改拉取到本地  

## 5.Gitlab 服务器搭建过程

### 5.1介绍

- 为局域网下的远程库

- 官网地址：`https://about.gitlab.com/  `

- 安装说明：`https://about.gitlab.com/installation/  `

- 下载RPM包链接：`https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-10.8.2-ce.0.el7.x86_64.rpm  `

- gitlab最新版下载地址：`https://packages.gitlab.com/gitlab/gitlab-ce/`

- ```nginx
  注：gitlab-ce 社区版 ；gitlab-ee是企业版，收费
  ```

### 5.2安装

1. 使用==Xftp 5==工具上传gitlab rpm包到centos7系统的`/opt`下面存放

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216164831958.png" alt="image-20200216164831958" style="zoom:80%;" />

2. 在opt目录下新建脚本文件

脚本内容为：

```nginx
sudo rpm -ivh /opt/gitlab-ce-10.8.2-ce.0.el7.x86_64.rpm
sudo yum install -y curl policycoreutils-python openssh-server
sudo lokkit -s http -s ssh
sudo yum install postfix
##下面两行表示：使用 Postfix 发送邮件
sudo service postfix start
sudo chkconfig postfix on

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
sudo EXTERNAL_URL="http://gitlab.example.com" 
```

![image-20200216165805146](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216165805146.png)

注意：需要有root权限才能编辑

3. 修改文件的执行权限：让文件可执行

![image-20200216165950475](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216165950475.png)

4. 执行脚本
   - 安装完后需要重启系统

![image-20200216170124374](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216170124374.png)

5. 初始化配置 gitlab  

   - 命令：`gitlab-ctl reconfigure  `

   - 安装时间较长

6. 启动 gitlab 服务  

   - 命令：`gitlab-ctl start  `

   - 扩展：停止服务为`gitlab-ctl stop  `。重启服务为` gitlab-ctl restart`

7. 浏览器访问  

访问 Linux 服务器 IP 地址即可， 如果想访问 EXTERNAL_URL 指定的域名还需要配置
域名服务器或本地 hosts 文件。  

如果无法访问，需要关闭Linux系统的防火墙或者只开放指定端口号

![image-20200216170917838](E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216170917838.png)

8. 设置密码

初次登录时需要为 gitlab 的 root 用户设置密码。  

<img src="E:%5CwebNote%5CGit%5Cgit.assets%5Cimage-20200216171107224.png" alt="image-20200216171107224" style="zoom:80%;" />

- 注意：Linux系统还需要修改静态地址

### 5.3 Gitlab使用

#### 5.3.1 修改仓库地址

```bash
vim /etc/gitlab/gitlab.rb

# 将13行的	external_url 'http://gitlab.example.com'
# 改为		external_url 'http://172.17.100.11'

# 重建配置，使其生效。重启命令不会使配置生效
gitlab-ctl reconfigure
```

### 5.3.n Gitlab备份与恢复

-  修改备份目录

```bash
# GitLab备份的默认目录是 /var/opt/gitlab/backups ，如果想改备份目录，可修改/etc/gitlab/gitlab.rb：
gitlab_rails['backup_path'] = '/data/backups' 
gitlab-ctl reconfigure
```

-  备份命令

```
gitlab-rake gitlab:backup:create
```

该命令会在备份目录（默认：/var/opt/gitlab/backups/）下创建一个tar压缩包xxxxxxxx_gitlab_backup.tar，其中开头的xxxxxx是备份创建的时间戳，这个压缩包包括GitLab整个的完整部分。

- 自动备份

```bash
# 通过任务计划crontab 实现自动备份
# 每天2点备份gitlab数据
0 2 * * * /usr/bin/gitlab-rake gitlab:backup:create
```

- 备份保留7天

```bash
# 可设置只保留最近7天的备份，编辑配置文件 /etc/gitlab/gitlab.rb
# 数值单位：秒
gitlab_rails['backup_keep_time'] = 604800 
gitlab-ctl reconfigure
```

- 恢复

```bash
/var/opt/gitlab/backups/1499244722_2017_07_05_9.2.6_gitlab_backup.tar
```

停止 unicorn 和 sidekiq ，保证数据库没有新的连接，不会有写数据情况。

```bash
# 停止相关数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

# 指定恢复文件，会自动去备份目录找。确保备份目录中有这个文件。
# 指定文件名的格式类似：1499242399_2017_07_05_9.2.6，程序会自动在文件名后补上：“_gitlab_backup.tar”
# 一定按这样的格式指定，否则会出现 The backup file does not exist! 的错误
gitlab-rake gitlab:backup:restore BACKUP=1499242399_2017_07_05_9.2.6

# 启动Gitlab
gitlab-ctl start 
```

