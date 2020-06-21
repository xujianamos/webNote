# 1.Git简介

实际上，Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。

## 1.1git三种状态

Git 有三种状态，你的文件可能处于其中之一：已提交（committed）、已修改（modified）和已暂存（staged）。

`committed`：已提交表示数据已经安全的保存在本地数据库中。 

`modified`：已修改表示修改了文件，但还没保存到数据库中。 

`staged`：已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。  

## 1.2基本的 Git 工作流程

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3.  提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。  

# 2.初始化配置

系统上安装了 Git，你会想要做几件事来定制你的 Git 环境。 每台计算机上只需要配置一次，程序升级时会保留配置信息。  

## 2.1用户信息  

当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：  

```shell
$ git config --global user.name "xxxxx"
$ git config --global user.email 123456@qq.com
```

注意：如果使用了 `--global` 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。

当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有` --global `选项的命令来配置。  

## 2.2检查配置信息

如果想要检查你的配置，可以使用 `git config --list `命令来列出所有 Git 当时能找到的配置。  

```shell
$ git config --list
```

注意：

你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置  。这种情况下，Git 会使用它找到的每一个变量的最后一个配置  

# 3.Git基础

## 3.1获取git仓库

有两种获取 Git 项目仓库的主要方式。 第一种是将已有项目或目录导入为 Git 仓库； 第二种是从其它服务器克隆一个已存在的 Git 仓库。  

### 3.1.1在已存在目录中初始化仓库

如果你打算使用 Git 来对已有项目进行追踪，你需要进入项目目录并输入：  

```shell
git init
```

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是Git 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。  

如果在一个已存在文件的文件夹（而非空文件夹）中进行版本控制，你应该开始追踪这些文件并进行初始提交。  

```shell
# 追踪以.c结尾的文件
$ git add *.c
# 追踪 LICENSE 文件
$ git add LICENSE
# 添加到仓库
$ git commit -m 'initial project version'
```

### 3.1.2克隆现有的仓库  

获得一份已经存在了的 Git 仓库的拷贝 。

Git 克隆的是该 Git 仓库服务器上的几乎所有数据，而不是仅仅复制完成你的工作所需要文件。  

当你执行 git clone 命令的时候，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。 事实上，如果你的服务器的磁盘坏掉了，你通常可以使用任何一个克隆下来的用户端来重建服务器上的仓库  

```shell
$ git clone [url]
# 示例
$ git clone https://github.com/libgit2/libgit2
```

这会在当前目录下创建一个名为 “libgit2” 的目录，并在这个目录下初始化一个 .git 文件夹，从远程仓库拉取下所有数据放入 .git 文件夹，然后从中读取最新版本的文件的拷贝。   

如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以使用如下命令：  

```shell
$ git clone https://github.com/libgit2/libgit2 mylibgit
```

这将执行与上一条命令相同的操作，但目标目录名变为了 mylibgit  

## 3.2记录每次更新到仓库

工作目录下的每一个文件都不外乎这两种状态：已跟踪或未跟踪。  

已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能是未修改，已修改或已放入暂存区。   

工作目录中除已跟踪文件以外的所有其它文件都属于未跟踪文件，它们既不存在于上次快照的记录中，也没有被放入暂存区。  

初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。  

### 3.2.1检查当前文件状态

可以用 git status 命令查看哪些文件处于什么状态  。

如果在克隆仓库后立即使用此命令，会看到类似这样的输出：  

```shell
$ git status
On branch master
nothing to commit, working directory clean
```

这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。  

上面的信息还表明，当前目录下没有出现任何处于未跟踪状态的新文件，否则 Git 会在这里列出来。  

现在，让我们在项目下创建一个新的 README 文件。 如果之前并不存在这个文件，使用 git status 命令，你将看到一个新的未跟踪文件：  

```shell
$ git status
On branch master
Untracked files:
(use "git add <file>..." to include in what will be committed)
README
nothing added to commit but untracked files present (use "git add" to
track)
```

在状态报告中可以看到新建的 README 文件出现在 `Untracked files `下面。  

未跟踪的文件意味着 Git 在之前的快照（提交）中没有这些文件；Git 不会自动将之纳入跟踪范围，除非你明明白白地告诉它“我需要跟踪该文件”。 这样的处理让你不必担心将生成的二进制文件或其它不想被跟踪的文件包含进来。  

### 3.2.2跟踪新文件

使用命令 git add 开始跟踪一个文件。 所以，要跟踪 README 文件，运行：  

```shell
$ git add README
```

此时再运行 git status 命令，会看到 README 文件已被跟踪，并处于暂存状态：  

```shell
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
new file: README
```

只要在 `Changes to be committed` 这行下面的，就说明是已暂存状态。  

如果此时提交，那么该文件在你运行 `git add` 时的版本将被留存在历史记录中。 你可能会想起之前我们使用 `git init` 后就运行了 `git add(files)` 命令，开始跟踪当前目录下的文件。 `git add` 命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件。  

### 3.2.3暂存已修改文件  

现在我们来修改一个已被跟踪的文件。 如果你修改了一个名为 `CONTRIBUTING.md` 的已被跟踪的文件，然后运行 git status 命令，会看到下面内容：  

```shell
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
new file: README
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
modified: CONTRIBUTING.md
```

文件 `CONTRIBUTING.md` 出现在 `Changes not staged for commit` 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。 要暂存这次更新，需要运行 `git add` 命令。  

这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等.

将这个命令理解为“添加内容到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。  

现在让我们运行`git add` 将"CONTRIBUTING.md"放到暂存区，然后再看看 `git status` 的输出：  

```shell
$ git add CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
new file: README
modified: CONTRIBUTING.md
```

现在两个文件都已暂存，下次提交时就会一并记录到仓库。  

假设此时，你想要在 CONTRIBUTING.md 里再加条注释。 重新编辑存盘后，准备好提交。 不过且慢，再运行 git status 看看：  

```shell
$ vim CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
new file: README
modified: CONTRIBUTING.md
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
modified: CONTRIBUTING.md
```

现在 CONTRIBUTING.md 文件同时出现在暂存区和非暂存区。  

实际上 Git 只不过暂存了你运行 git add 命令时的版本。 如果你现在提交，CONTRIBUTING.md 的版本是你最后一次运行git add 命令时的那个版本，而不是你运行 git commit 时，在工作目录中的当前版本。 所以，运行了 gitadd 之后又作了修订的文件，需要重新运行 git add 把最新版本重新暂存起来：  

```shell
$ git add CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
new file: README
modified: CONTRIBUTING.md
```

### 3.2.4状态简览

git status 命令的输出十分详细，但其用语有些繁琐。 Git 有一个选项可以帮你缩短状态命令的输出，这样可以以简洁的方式查看更改。 如果你使用 git status -s 命令或 git status --short 命令，你将得到一种格式更为紧凑的输出。  

```shell
$ git status -s
M README
MM Rakefile
A lib/git.rb
M lib/simplegit.rb
?? LICENSE.txt
```

新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。 你可能注意到了 M 有两个可以出现的位置，出现在右边的 M 表示该文件被修改了但是还没被放入暂存区，出现在靠左边的 M 表示该文件被修改了并被放入了暂存区。 例如，上面的状态报告显示:README 文件在工作区被修改了但是还没有将修改后的文件放入暂存区,lib/simplegit.rb 文件被修改了并已将修改后的文件放入了暂存区。 而 Rakefile 在工作区被修改并提交到暂存区后又在工作区中被修改了，所以在暂存区和工作区都有该文件被修改了的记录。  

### 3.2.5忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以创建一个名为 .gitignore的文件，列出要忽略的文件的模式。 来看一个实际的 .gitignore 例子：  

```shell
$ cat .gitignore
*.[oa]
*~
```

第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的。 第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。 此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。 要养成一开始就设置好.gitignore 文件的习惯，以免将来误提交这类无用的文件。  

> 文件 .gitignore 的格式规范如下：  

- 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
-  匹配模式可以以（/）开头防止递归。
-  匹配模式可以以（/）结尾指定目录。
-  要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反  

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。 星号（\*）匹配零个或多个任意字符；[abc]匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）。 使用两个星号（*）表示匹配任意中间目录，比如 a/**/z 可以匹配 a/z , a/b/z 或 a/b/c/z 等。  

### 3.2.6查看已暂存和未暂存的修改  

再次修改 README 文件后暂存，然后编辑 CONTRIBUTING.md 文件后先不暂存， 运行 status 命令将会看到 :

```shell
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
modified: README
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
modified: CONTRIBUTING.md
```

要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 git diff：  

```shell
$ git diff
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 8ebb991..643e24f 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -65,7 +65,8 @@ branch directly, things can get messy.
Please include a nice description of your changes when you submit your
PR;
if we have to read the whole diff to figure out why you're contributing
in the first place, you're less likely to get feedback and have your
change
-merged in.
+merged in. Also, split your changes into comprehensive chunks if your
patch is
+longer than a dozen lines.
If you are starting to work on a particular area, feel free to submit a
PR
that highlights your work in progress (and note in the PR title that it's
```

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异。 也就是修改之后还没有暂存起来的变化内容。  

若要查看已暂存的将要添加到下次提交里的内容，可以用 git diff --staged 命令。 这条命令将比对已暂存文件与最后一次提交的文件差异：  

```shell
$ git diff --staged
diff --git a/README b/README
new file mode 100644
index 0000000..03902a1
--- /dev/null
+++ b/README
@@ -0,0 +1 @@
+My Project
```

请注意，git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。 所以有时候你一下子暂存了所有更新过的文件后，运行 git diff 后却什么也没有，就是这个原因。  

像之前说的，暂存 CONTRIBUTING.md 后再编辑，可以使用 git status 查看已被暂存的修改或未被暂存的修改。 如果我们的环境（终端输出）看起来如下：  

```shell
$ git add CONTRIBUTING.md
$ echo '# test line' >> CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
modified: CONTRIBUTING.md
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
modified: CONTRIBUTING.md
```

现在运行 git diff 看暂存前后的变化：  

```shell
$ git diff
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 643e24f..87f08c8 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -119,3 +119,4 @@ at the
## Starter Projects
See our [projects
list](https://github.com/libgit2/libgit2/blob/development/PROJECTS.md).
+# test line
```

然后用 git diff --cached 查看已经暂存起来的变化：（--staged 和 --cached 是同义词）  

```shell
$ git diff --cached
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 8ebb991..643e24f 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -65,7 +65,8 @@ branch directly, things can get messy.
Please include a nice description of your changes when you submit your
PR;
if we have to read the whole diff to figure out why you're contributing
in the first place, you're less likely to get feedback and have your
change
-merged in.
+merged in. Also, split your changes into comprehensive chunks if your
patch is
+longer than a dozen lines.
If you are starting to work on a particular area, feel free to submit a
PR
that highlights your work in progress (and note in the PR title that it's
```

### 3.2.7提交更新

现在的暂存区域已经准备妥当可以提交了。 在此之前，请一定要确认还有什么修改过的或新建的文件还没有git add 过，否则提交的时候不会记录这些还没暂存起来的变化。 这些修改过但没有暂存的文件只保留在本地磁盘。 所以，每次准备提交前，先用 git status 看下，你所需要的文件是不是都已暂存起来了， 然后再运行提交命令 git commit：  

```shell
git commit
```

这种方式会启动文本编辑器以便输入本次提交的说明。   

另外，你也可以在 commit 命令后添加 -m 选项，将提交信息与命令放在同一行，如下所示：  

```shell
$ git commit -m "Story 182: Fix benchmarks for speed"
[master 463dc4f] Story 182: Fix benchmarks for speed
2 files changed, 2 insertions(+)
create mode 100644 README
```

现在你已经创建了第一个提交！ 可以看到，提交后它会告诉你，当前是在哪个分支（master）提交的，本次提交的完整 SHA-1 校验和是什么（463dc4f），以及在本次提交中，有多少文件修订过，多少行添加和删改过。  

请记住，提交时记录的是放在暂存区域的快照。 任何还未暂存文件的仍然保持已修改状态，可以在下次提交时纳入版本管理。 每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。  

### 3.2.8跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。  

Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：  

```shell
$ git status
On branch master
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
modified: CONTRIBUTING.md
no changes added to commit (use "git add" and/or "git commit -a")
$ git commit -a -m 'added new benchmarks'
[master 83e38c7] added new benchmarks
1 file changed, 5 insertions(+), 0 deletions(-)
```

提交之前不再需要 git add 文件“CONTRIBUTING.md”了。 这是因为 -a 选项使本次提交包含了所有修改过的文件。 这很方便，但是要小心；有时这个选项会将不需要的文件添加到提交中。  

### 3.2.9移除文件  

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。  

可以用 git rm 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。  

如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 “Changes not staged forcommit” 部分（也就是 未暂存清单）看到：  

```shell
$ rm PROJECTS.md
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
(use "git add/rm <file>..." to update what will be committed)
(use "git checkout -- <file>..." to discard changes in working
directory)
deleted: PROJECTS.md
no changes added to commit (use "git add" and/or "git commit -a")
```

然后再运行 git rm 记录此次移除文件的操作：  

```shell
$ git rm PROJECTS.md
rm 'PROJECTS.md'
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
deleted: PROJECTS.md
```

下一次提交时，该文件就不再纳入版本管理了。 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f（译注：即 force 的首字母）。 这是一种安全特性，用于防止误删还没有添加到快照的数据，这样的数据不能被 Git 恢复。  

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 .gitignore 文件，不小心把一个很大的日志文件或一堆 .a 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 --cached 选项：  

```shell
$ git rm --cached README
```

git rm 命令后面可以列出文件或者目录的名字，也可以使用 glob 模式。 比方说：  

```shell
$ git rm log/\*.log
```

注意到星号 * 之前的反斜杠 \， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。此命令删除 log/ 目录下扩展名为 .log 的所有文件。 类似的比如：  

```shell
$ git rm \*~
```

该命令为删除以 ~ 结尾的所有文件。  

### 3.2.10移动文件  

要在 Git 中对文件改名，可以这么做：  

```shell
$ git mv file_from file_to
```

示例：

```shell
$ git mv README.md README
$ git status
On branch master
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
renamed: README.md -> README
```

其实，运行 git mv 就相当于运行了下面三条命令：  

```shell
$ mv README.md README
$ git rm README.md
$ git add README
```

如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式结果都一样。 两者唯一的区别是，mv 是一条命令而另一种方式需要三条命令，直接用 git mv 轻便得多。 不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件名，再添加新的文件名。  

## 3.3查看提交历史

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 git log 命令。  

```shell
$ git log
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700
changed the version number
commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 16:40:33 2008 -0700
removed unnecessary test
commit a11bef06a3f659402fe7563abf99ad00de2209e6
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 10:31:28 2008 -0700
first commit
```

不传入任何参数的默认情况下，git log 会按时间先后顺序列出所有的提交，最近的更新排在最上面。  

git log 有许多选项可以帮助你搜寻你所要找的提交， 下面我们会介绍几个最常用的选项。  

其中一个比较有用的选项是 -p，它会显示每次提交所引入的差异。 与此同时，你也可以使用 -2 选项来仅显示最近的两次提交：  

```shell
$ git log -p -2
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700
changed the version number
diff --git a/Rakefile b/Rakefile
index a874b73..8f94139 100644
--- a/Rakefile
+++ b/Rakefile
@@ -5,7 +5,7 @@ require 'rake/gempackagetask'
spec = Gem::Specification.new do |s|
s.platform = Gem::Platform::RUBY
s.name = "simplegit"
- s.version = "0.1.0"
+ s.version = "0.1.1"
s.author = "Scott Chacon"
s.email = "schacon@gee-mail.com"
s.summary = "A simple gem for using Git in Ruby code."
commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 16:40:33 2008 -0700
removed unnecessary test
diff --git a/lib/simplegit.rb b/lib/simplegit.rb
index a0a60ae..47c6340 100644
--- a/lib/simplegit.rb
+++ b/lib/simplegit.rb
@@ -18,8 +18,3 @@ class SimpleGit
end
end
-
-if $0 == __FILE__
- git = SimpleGit.new
- puts git.show
-end
\ No newline at end of file
```

该选项除了显示基本信息之外，还附带了每次 commit 的变化。 当进行代码审查，或者快速浏览某个搭档提交的 commit 所带来的变化的时候，这个参数就非常有用了。 你也可以为 git log 附带一系列的总结性选项。比如你想看到每次提交的简略统计信息，可以使用 --stat 选项：  

```shell
$ git log --stat
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700
changed the version number
Rakefile | 2 +-
1 file changed, 1 insertion(+), 1 deletion(-)
commit 085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 16:40:33 2008 -0700
removed unnecessary test
lib/simplegit.rb | 5 -----
1 file changed, 5 deletions(-)
commit a11bef06a3f659402fe7563abf99ad00de2209e6
Author: Scott Chacon <schacon@gee-mail.com>
Date: Sat Mar 15 10:31:28 2008 -0700
first commit
README | 6 ++++++
Rakefile | 23 +++++++++++++++++++++++
lib/simplegit.rb | 25 +++++++++++++++++++++++++
3 files changed, 54 insertions(+)
```

正如你所看到的，--stat 选项在每次提交的下面列出所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了。 在每次提交的最后还有一个总结。  

另一个非常有用的选项是 --pretty。 这个选项可以使用不同于默认格式的方式展示提交历史。 这个选项有一些内建的子选项供你使用。 比如 oneline 会将每个提交放在一行显示，在浏览大量的提交时非常有用。 另外还有 short，full 和 fuller 选项，它们展示信息的格式基本一致，但是详尽程度不一：  

```shell
$ git log --pretty=oneline
ca82a6dff817ec66f44342007202690a93763949 changed the version number
085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 removed unnecessary test
a11bef06a3f659402fe7563abf99ad00de2209e6 first commit
```

但最有意思的是 format，可以定制要显示的记录格式。 这样的输出对后期提取分析格外有用 — 因为你知道输出的格式不会随着 Git 的更新而发生改变：  

```shell
$ git log --pretty=format:"%h - %an, %ar : %s"
ca82a6d - Scott Chacon, 6 years ago : changed the version number
085bb3b - Scott Chacon, 6 years ago : removed unnecessary test
a11bef0 - Scott Chacon, 6 years ago : first commit
```

git log --pretty=format 常用的选项 列出了常用的格式占位符写法及其代表的意义。  

| 选项 | 说明                                        |
| ---- | ------------------------------------------- |
| %H   | 提交的完整哈希值                            |
| %h   | 提交的简写哈希值                            |
| %T   | 树的完整哈希值                              |
| %t   | 树的简写哈希值                              |
| %P   | 父提交的完整哈希值                          |
| %p   | 父提交的简写哈希值                          |
| %an  | 作者名字                                    |
| %ae  | 作者的电子邮件地址                          |
| %ad  | 作者修订日期（可以用 --date= 选项定制格式） |
| %ar  | 作者修订日期，按多久以前的方式显示          |
| %cn  | 提交者（committer）的名字                   |
| %ce  | 提交者的电子邮件地址                        |
| %cd  | 提交日期                                    |
| %cr  | 提交日期（距今多长时间）                    |
| %s   | 提交说明                                    |

### 3.3.1限制输出长度  

实际上，你可以使用类似 -<n> 的选项，其中的 n 可以是任何整数，表示仅显示最近的 n 条提交。 不过实践中这个选项不是常用，因为 Git 默认会将所有的输出传送到分页程序中，所以你一次只会看到一页的内容。  

但是，类似 --since 和 --until 这种按照时间作限制的选项很有用。 例如，下面的命令会列出最近两周的所有提交：  

```shell
$ git log --since=2.weeks
```

该命令可用的格式十分丰富——可以是类似 "2008-01-15" 的具体的某一天，也可以是类似 "2 years 1 day3 minutes ago" 的相对日期。  

还可以过滤出匹配指定条件的提交。 用 --author 选项显示指定作者的提交，用 --grep 选项搜索提交说明中的关键字。 （请注意，如果你要同时对作者和提交说明进行过滤，就必须添加 --all-match 选项，否则该命令将会匹配满足其中任意一个条件的提交）  

另一个非常有用的过滤器是 -S，它接受一个字符串参数，并且只会显示那些添加或删除了该字符串的提交。 假设你想找出添加或删除了对某一个特定函数的引用的提交，可以调用：  

```shell
$ git log -Sfunction_name
```

最后一个很实用的 git log 选项是路径（path）， 如果只关心某些文件或者目录的历史提交，可以在 git log选项的最后指定它们的路径。 因为是放在最后位置上的选项，所以用两个短划线（--）隔开之前的选项和后面限定的路径名。  

