## 1.创建连接

### 1.1点击主工具栏上的“连接”按钮，然后从列表中选择“MongoDB ...”

<img src="https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617161542714.png" alt="image-20200617161542714" style="zoom:80%;" />

### 1.2在“新建连接”对话框的“连接名”字段中输入名称

![image-20200617161727523](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617161727523.png)

你可以点击“测试连接”按钮来测试连接。

如果需要，你还可以通过点击“URI”按钮获取服务器的 URI－即 mongodb://localhost:27017/。

### 1.3点击“确定”按钮关闭对话框并创建连接。连接将出现在左侧的连接列表中。

## 2.创建数据库

通过我们的连接，现在可以创建一个新的数据库了。

步骤：

1. 双击连接列表中的连接以打开数据库连接。此时图标由灰色变为红色，表示打开成功。
2. 接下来，右击连接名，然后选择“创建数据库...”。

![image-20200617162153705](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617162153705.png)

3. 您可以在弹出的对话框中提供数据库名。完成后，点击“确定”按钮关闭对话框并创建新数据库。

![image-20200617162315312](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617162315312.png)

在幕后，Navicat 使用了 MongoDB 的“use”命令来创建数据库。数据库将出现在左侧连接列表中的当前连接下。

## 3.创建集合

现在，我们将添加一个集合。集合是一组 MongoDB 文档，相当于 DBMS 的表。它存在于单个数据库中。通常，集合中的所有文档有相关目的或是某种方面相似。

步骤：

1. 如果点击数据库名左侧的箭头展开“数据库”对象，你将看到所有数据库中的对象，包括集合：

![image-20200617162953071](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617162953071.png)

此外，点击“数据库”对象或其任何对象将，可在启用数据库对象工具栏上适用的命令，特别是新建集合、导入向导和导出向导按钮：

![image-20200617163105880](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617163105880.png)

2. 点击“新建集合”按钮。这将出现一个新的无标题集合选项卡：

![image-20200617163202208](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617163202208.png)

3. 点击无标题集合选项卡上的“保存”按钮，然后在提示中输入集合名。新集合将添加到数据库浏览器中“集合”对象下：

![image-20200617163346966](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617163346966.png)

![image-20200617163427976](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617163427976.png)

![image-20200617163447728](https://gitee.com/xuxujian/webNoteImg/raw/master/mongoDB/image-20200617163447728.png)

