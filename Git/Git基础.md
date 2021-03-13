## 1.git初始化

### 1.1设置用户信息

当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。

```bash
git config --global user.name "xujian"
git config --global user.email 2513573453@qq.com
```

再次强调，如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事 情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。

```bash
git config  user.name "xujian"
git config  user.email 2513573453@qq.com
```

### 1.2检查配置信息

如果想要检查你的配置，可以使用git config --list命令来列出所有Git当时能找到的配置。

```bash
credential.helper=osxkeychain
user.name=xujian
user.email=2513573453@qq.com
core.excludesfile=/Users/xujian/.gitignore_global
difftool.sourcetree.cmd=opendiff "$LOCAL" "$REMOTE"
difftool.sourcetree.path=
mergetool.sourcetree.cmd=/Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh "$LOCAL" "$REMOTE" -ancestor "$BASE" -merge "$MERGED"
mergetool.sourcetree.trustexitcode=true
commit.template=/Users/xujian/.stCommitMsg
```

## 2.Git 基础

### 2.1获取 Git 仓库

有两种获取 Git 项目仓库的主要方式。 第一种是将已有项目或目录导入为 Git 仓库; 第二种是从其它服务器克隆

一个已存在的 Git 仓库。

#### 2.1.1在已存在目录中初始化仓库

如果你打算使用 Git 来对已有项目进行追踪，你需要进入项目目录并输入:

```bash
git init
```

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。

#### 2.1.2克隆现有的仓库

当你执行 git clone 命令的时候，默认配置 下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。 事实上，如果你的服务器的磁盘坏掉了，你通常 可以使用任何一个克隆下来的用户端来重建服务器上的仓库

克隆仓库的命令是 `git clone [url] `

```bash
git clone https://github.com/libgit2/libgit2
```

这会在当前目录下创建一个名为 “libgit2” 的目录，并在这个目录下初始化一个 .git 文件夹，从远程仓库拉 取下所有数据放入 .git 文件夹，然后从中读取最新版本的文件的拷贝。 如果你进入到这个新建的 libgit2 文 件夹，你会发现所有的项目文件已经在里面了，准备就绪等待后续的开发和使用。 如果你想在克隆远程仓库的 时候，自定义本地仓库的名字，你可以使用如下命令:

```bash
git clone https://github.com/libgit2/libgit2 mylibgit
```

这将执行与上一条命令相同的操作，但目标目录名变为了 mylibgit。

### 2.2记录每次更新到仓库

请记住，你工作目录下的每一个文件都不外乎这两种状态:已跟踪或未跟踪。

已跟踪的文件是指那些被纳入了 版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能是未修改，已修改或已放 入暂存区。 工作目录中除已跟踪文件以外的所有其它文件都属于未跟踪文件，它们既不存在于上次快照的记录 中，也没有被放入暂存区。 初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修 改状态。

#### 2.2.1检查当前文件状态

可以用 git status 命令查看哪些文件处于什么状态。

```bash
git status
  On branch master
  nothing to commit, working directory clean
```

这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。 此外，上面的信 息还表明，当前目录下没有出现任何处于未跟踪状态的新文件，否则 Git 会在这里列出来。 最后，该命令还显示 了当前所在分支，并告诉你这个分支同远程服务器上对应的分支没有偏离。 现在，分支名是 “master”,这是默 认的分支名。

#### 2.2.2跟踪新文件

使用命令 git add 开始跟踪一个文件。

```bash
$ git add README
```

此时再运行git status命令，会看到README文件已被跟踪，并处于暂存状态:

```bash
$ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      new file:   README

```

只要在 Changes to be committed 这行下面的，就说明是已暂存状态。 如果此时提交，那么该文件在你运 行git add时的版本将被留存在历史记录中。你可能会想起之前我们使用git init后就运行了git add (files)命令，开始跟踪当前目录下的文件。 git add命令使用文件或目录的路径作为参数;如果参数是目 录的路径，该命令将递归地跟踪该目录下的所有文件。

#### 2.2.3暂存已修改文件

现在我们来修改一个已被跟踪的文件。 如果你修改了一个名为 CONTRIBUTING.md 的已被跟踪的文件，然后运 行git status命令，会看到下面内容:

```bash
$ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      new file:   README
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
      modified:   CONTRIBUTING.md
```

文件CONTRIBUTING.md出现在Changes not staged for commit这行下面，说明已跟踪文件的内容发 生了变化，但还没有放到暂存区。 要暂存这次更新，需要运行 git add 命令。 这是个多功能命令:可以用它开 始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。 将这 个命令理解为“添加内容到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。 现在让我们运行 git add将"CONTRIBUTING.md"放到暂存区，然后再看看git status的输出:

```bash
git add CONTRIBUTING.md
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      new file:   README
      modified:   CONTRIBUTING.md

```

现在两个文件都已暂存，下次提交时就会一并记录到仓库。 假设此时，你想要在 CONTRIBUTING.md 里再加条 注释。 重新编辑存盘后，准备好提交。 不过且慢，再运行 git status 看看:

```bash
$ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      new file:   README
      modified:   CONTRIBUTING.md
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
      modified:   CONTRIBUTING.md

```

现在 CONTRIBUTING.md 文件同时出现在暂存区和非暂存区。 这怎么可能呢? 好吧，实际上 Git 只 不过暂存了你运行 git add 命令时的版本。 如果你现在提交，CONTRIBUTING.md 的版本是你最后一次运行 git add 命令时的那个版本，而不是你运行 git commit 时，在工作目录中的当前版本。 所以，运行了 git add之后又作了修订的文件，需要重新运行git add把最新版本重新暂存起来:

```bash
$ git add CONTRIBUTING.md
$ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      new file:   README
      modified:   CONTRIBUTING.md
```

#### 2.2.4忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动生成的文 件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件的模式。 来看一个实际的 .gitignore 例子:

#### 2.2.5查看已暂存和未暂存的修改

git diff将通过文件补丁的格式更加具体地显示哪些行发生了改变

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异。 也就是修改之后还没有暂存起来的变化内 容。

请注意，git diff 本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。 所以有时候你一下子暂 存了所有更新过的文件后，运行git diff后却什么也没有，就是这个原因。

#### 2.2.6提交更新

现在的暂存区域已经准备妥当可以提交了。 在此之前，请一定要确认还有什么修改过的或新建的文件还没有 git add 过，否则提交的时候不会记录这些还没暂存起来的变化。 这些修改过但没有暂存的文件只保留在本地 磁盘。 所以，每次准备提交前，先用 git status 看下，你所需要的文件是不是都已暂存起来了， 然后再运 行提交命令git commit:

```bash
$ git commit
```

这种方式会启动文本编辑器以便输入本次提交的说明。

另外，你也可以在 commit 命令后添加 -m 选项，将提交信息与命令放在同一行，如下所示:

```bash
$ git commit -m "更新内容"
[master 463dc4f] Story 182: Fix benchmarks for speed
   2 files changed, 2 insertions(+)
   create mode 100644 README
```

好，现在你已经创建了第一个提交! 可以看到，提交后它会告诉你，当前是在哪个分支(master)提交的，本 次提交的完整 SHA-1 校验和是什么(463dc4f)，以及在本次提交中，有多少文件修订过，多少行添加和删改 过。

请记住，提交时记录的是放在暂存区域的快照。 任何还未暂存文件的仍然保持已修改状态，可以在下次提交时 纳入版本管理。 每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。

#### 2.2.7跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。 Git 提供了一个跳过使用暂 存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存 起来一并提交，从而跳过git add步骤:

```bash
   $ git status
  On branch master
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
      modified:   CONTRIBUTING.md
  no changes added to commit (use "git add" and/or "git commit -a")
  $ git commit -a -m 'added new benchmarks'
  [master 83e38c7] added new benchmarks
   1 file changed, 5 insertions(+), 0 deletions(-)
```

提交之前不再需要 git add 文件“CONTRIBUTING.md”了。 这是因为 -a 选项使本次提交包含了 所有修改过的文件。 这很方便，但是要小心;有时这个选项会将不需要的文件添加到提交中。

#### 2.2.8移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除(确切地说，是从暂存区域移除)，然后提交。

可以用git rm命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清 单中了。

如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 “Changes not staged for commit” 部分(也就是 未暂存清单)看到:

```bash
$ rm PROJECTS.md
  $ git status
  On branch master
  Your branch is up-to-date with 'origin/master'.
  Changes not staged for commit:
    (use "git add/rm <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
          deleted:    PROJECTS.md
  no changes added to commit (use "git add" and/or "git commit -a")
```

然后再运行git rm记录此次移除文件的操作:

```bash
git rm PROJECTS.md
  rm 'PROJECTS.md'
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      deleted:    PROJECTS.md
```

下一次提交时，该文件就不再纳入版本管理了。 如果删除之前修改过并且已经放到暂存区域的话，则必须要用 强制删除选项 -f(译注:即 force 的首字母)。 这是一种安全特性，用于防止误删还没有添加到快照的数据， 这样的数据不能被 Git 恢复。

另外一种情况是，我们想把文件从 Git 仓库中删除(亦即从暂存区域移除)，但仍然希望保留在当前工作目录 中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 .gitignore 文件，不小 心把一个很大的日志文件或一堆 .a 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目 的，使用 --cached 选项:

```bash
$ git rm --cached README
```

#### 2.2.9移动文件

Git 并不显式跟踪文件移动操作。 如果在 Git 中重命名了某个文件，仓库中存储的元数 据并不会体现出这是一次改名操作。

既然如此，当你看到 Git 的 mv 命令时一定会困惑不已。 要在 Git 中对文件改名，可以这么做:

```bash
$ git mv file_from file_to
```

它会恰如预期般正常工作。 实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明:

```bash
   $ git mv README.md README
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      renamed:    README.md -> README
```

其实，运行git mv就相当于运行了下面三条命令:

```bash
$ mv README.md README
$ git rm README.md
$ git add README
```

### 2.3查看提交历史

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的 工具是git log命令。

不传入任何参数的默认情况下，git log会按时间先后顺序列出所有的提交，最近的更新排在最上面。正如你 所看到的，这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。

git log 有许多选项可以帮助你搜寻你所要找的提交， 下面我们会介绍几个最常用的选项。 其中一个比较有用的选项是 -p，它会显示每次提交所引入的差异。 与此同时，你也可以使用 -2 选项来仅显示

最近的两次提交:

```bash
$ git log -p -2
```

每次提交的简略统计信息，可以使用 --stat 选项:

```bash
$git log --stat
```

--stat 选项在每次提交的下面列出所有被修改过的文件、有多少文件被修改了以及被修改过 的文件的哪些行被移除或是添加了。 在每次提交的最后还有一个总结。

另一个非常有用的选项是 --pretty。 这个选项可以使用不同于默认格式的方式展示提交历史。 这个选项有一 些内建的子选项供你使用。 比如 oneline 会将每个提交放在一行显示，在浏览大量的提交时非常有用。 另外还 有 short，full 和 fuller 选项，它们展示信息的格式基本一致，但是详尽程度不一:

```bash
$ git log --pretty=oneline
  ca82a6dff817ec66f44342007202690a93763949 changed the version number
  085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 removed unnecessary test
  a11bef06a3f659402fe7563abf99ad00de2209e6 first commit
```

### 2.4撤消操作

在任何一个阶段，你都有可能想要撤消某些操作。 这里，我们将会学习几个撤消你所做修改的基本工具。 注 意，有些撤消操作是不可逆的。 这是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有的几个 地方之一。

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 --amend 选 项的提交命令尝试重新提交:

```bash
$ git commit --amend
```

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改(例如，在上次提交后马上执行了 此命令)，那么快照会保持不变，而你所修改的只是提交信息。

文本编辑器启动后，可以看到之前的提交信息。 编辑后保存会覆盖原来的提交信息。

```bash
$ git commit -m 'initial commit'
  $ git add forgotten_file
  $ git commit --amend
```

最终你只会有一个提交——第二次提交将代替第一次提交的结果。

#### 2.4.1取消暂存的文件

接下来的两个小节演示如何操作暂存区域与工作目录中已修改的文件。 这些命令在修改文件状态的同时，也会 提示如何撤消操作。 例如，你已经修改了两个文件并且想要将它们作为两次独立的修改提交，但是却意外地输 入了 git add * 暂存了它们两个。 如何只取消暂存两个中的一个呢? git status 命令提示了你:

```bash
$ git add *
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      renamed:    README.md -> README
      modified:   CONTRIBUTING.md
```

在 “Changes to be committed” 文字正下方，提示使用 git reset HEAD <file>... 来取消暂存。 所 以，我们可以这样来取消暂存 CONTRIBUTING.md 文件:

```bash
   $ git reset HEAD CONTRIBUTING.md
  Unstaged changes after reset:
  M   CONTRIBUTING.md
  $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      renamed:    README.md -> README
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
      modified:   CONTRIBUTING.md

```

这个命令有点儿奇怪，但是起作用了。 CONTRIBUTING.md 文件已经是修改未暂存的状态了。

#### 2.4.2撤消对文件的修改

如果你并不想保留对 CONTRIBUTING.md 文件的修改怎么办? 你该如何方便地撤消修改——将它还原成上次提 交时的样子(或者刚克隆完的样子，或者刚把它放入工作目录时的样子)?幸运的是，git status也告诉了 你应该如何做。 在最后一个例子中，未暂存区域是这样:

```bash
Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working
  directory)
      modified:   CONTRIBUTING.md
```

它非常清楚地告诉了你如何撤消之前所做的修改。 让我们来按照提示执行:

```bash
 $ git checkout -- CONTRIBUTING.md
 $ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
      renamed:    README.md -> README
```

可以看到那些修改已经被撤消了。

> 你需要知道git checkout -- [file]是一个危险的命令，这很重要。你对那个文 IMPORTANT 件做的任何修改都会消失——你只是拷贝了另一个文件来覆盖它。 除非你确实清楚不想
>
> 要那个文件了，否则不要使用这个命令。

如果你仍然想保留对那个文件做出的修改，但是现在仍然需要撤消，我们将会在 Git 分支 介绍保存进度与分支;

这些通常是更好的做法。

记住，在 Git 中任何 已提交的 东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 --amend 选 项覆盖的提交也可以恢复(阅读 数据恢复 了解数据恢复)。 然而，任何你未提交的东西丢失后很可能再也找不 到了。

### 2.5远程仓库的使用

#### 2.5.1查看远程仓库

如果想查看你已经配置的远程仓库服务器，可以运行 git remote 命令。它会列出你指定的每一个远程服务器 的简写。 如果你已经克隆了自己的仓库，那么至少应该能看到 origin ——这是 Git 给你克隆的仓库服务器的默认 名字:

```bash
$ git clone https://github.com/schacon/ticgit
  Cloning into 'ticgit'...
  remote: Reusing existing pack: 1857, done.
  remote: Total 1857 (delta 0), reused 0 (delta 0)
  Receiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.
  Resolving deltas: 100% (772/772), done.
  Checking connectivity... done.
  $ cd ticgit
  $ git remote
  origin
```

你也可以指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。

```bash
   $ git remote -v
  origin  https://github.com/schacon/ticgit (fetch)
  origin  https://github.com/schacon/ticgit (push)
```

如果你的远程仓库不止一个，该命令会将它们全部列出。 例如，与几个协作者合作的，拥有多个远程仓库的仓 库看起来像下面这样:

```bash
$ git remote -v
  bakkdoor  https://github.com/bakkdoor/grit (fetch)
  bakkdoor  https://github.com/bakkdoor/grit (push)
 cho45 https://github.com/cho45/grit (fetch)
cho45 https://github.com/cho45/grit (push)
defunkt https://github.com/defunkt/grit (fetch)
defunkt https://github.com/defunkt/grit (push)
koke git://github.com/koke/grit.git (fetch)
koke git://github.com/koke/grit.git (push)
origin git@github.com:mojombo/grit.git (fetch)
origin git@github.com:mojombo/grit.git (push)
```

#### 2.5.2添加远程仓库

运 行git remote add <shortname> <url>添加一个新的远程Git仓库，同时指定一个你可以轻松引用的简 写:

```bash
$ git remote
  origin
  $ git remote add pb https://github.com/paulboone/ticgit
  $ git remote -v
  origin  https://github.com/schacon/ticgit (fetch)
  origin  https://github.com/schacon/ticgit (push)
  pb  https://github.com/paulboone/ticgit (fetch)
  pb  https://github.com/paulboone/ticgit (push)
```

现在你可以在命令行中使用字符串 pb 来代替整个 URL。 例如，如果你想拉取 Paul 的仓库中有但你没有的信 息，可以运行git fetch pb:

```bash
   $ git fetch pb
  remote: Counting objects: 43, done.
  remote: Compressing objects: 100% (36/36), done.
  remote: Total 43 (delta 10), reused 31 (delta 5)
  Unpacking objects: 100% (43/43), done.
  From https://github.com/paulboone/ticgit
   * [new branch]      master     -> pb/master
   * [new branch]      ticgit     -> pb/ticgit
```

现在 Paul 的 master 分支可以在本地通过 pb/master 访问到——你可以将它合并到自己的某个分支中，或者如 果你想要查看它的话，可以检出一个指向该点的本地分支。

#### 2.5.3从远程仓库中抓取与拉取

就如刚才所见，从远程仓库中获得数据，可以执行:

```bash
$ git fetch [remote-name]
```

这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支 的引用，可以随时合并或查看。

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所 以，git fetch origin会抓取克隆(或上一次抓取)后新推送的所有工作。必须注意git fetch命令会将 数据拉取到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工 作。

如果你有一个分支设置为跟踪一个远程分支(阅读下一节与Git分支了解更多信息)，可以使用git pull命 令来自动的抓取然后合并远程分支到当前分支。 这对你来说可能是一个更简单或更舒服的工作流程;默认情况 下，git clone命令会自动设置本地master分支跟踪克隆的远程仓库的master分支(或不管是什么名字的默 认分支)。运行git pull通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

#### 2.5.4推送到远程仓库

当你想分享你的项目时，必须将其推送到上游。 这个命令很简单:git push [remote-name] [branch- name]。 当你想要将 master 分支推送到 origin 服务器时(再次说明，克隆时通常会自动帮你设置好那两个 名字)，那么运行这个命令就可以将你所做的备份到服务器:

```bash
 $ git push origin master
```

只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。 当你和其他人在同一时 间克隆，他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。 你必须先将他们的工作拉 取下来并将其合并进你的工作后才能推送。

#### 2.5.5查看某个远程仓库

如果想要查看某一个远程仓库的更多信息，可以使用 git remote show [remote-name] 命令。 如果想以 一个特定的缩写名运行这个命令，例如 origin，会得到像下面类似的信息:

 ```bash
$ git remote show origin
	remote origin

  Fetch URL: https://github.com/schacon/ticgit

  Push URL: https://github.com/schacon/ticgit

  HEAD branch: master

  Remote branches:

   master                tracked

   dev-branch              tracked

  Local branch configured for 'git pull':

   master merges with remote master

  Local ref configured for 'git push':

   master pushes to master (up to date)
 ```

它同样会列出远程仓库的 URL 与跟踪分支的信息。 这些信息非常有用，它告诉你正处于 master 分支，并且如 果运行 git pull，就会抓取所有的远程引用，然后将远程 master 分支合并到本地 master 分支。 它也会列出拉取 到的所有远程引用。

#### 2.5.6远程仓库的移除与重命名

如果想要重命名引用的名字可以运行 git remote rename 去修改一个远程仓库的简写名。 例如，想要将 pb 重命名为paul，可以用git remote rename这样做:

```bash
$ git remote rename pb paul
  $ git remote
  origin
  paul
```

值得注意的是这同样也会修改你的远程分支名字。 那些过去引用 pb/master 的现在会引用 paul/master。 如果因为一些原因想要移除一个远程仓库——你已经从服务器上搬走了或不再想使用某一个特定的镜像了，又或

者某一个贡献者不再贡献了——可以使用git remote rm:

```bash
   $ git remote rm paul
  $ git remote
  origin
```

### 2.6打标签

#### 2.6.1列出标签

 Git 中列出已有的标签是非常简单直观的。 只需要输入 git tag:

```bash
$ git tag
  v0.1
  v1.3
```

这个命令以字母顺序列出标签;但是它们出现的顺序并不重要。

你也可以使用特定的模式查找标签。 例如，Git 自身的源代码仓库包含标签的数量超过 500 个。 如果只对 1.8.5

系列感兴趣，可以运行:

```bash
$ git tag -l 'v1.8.5*'
  v1.8.5
  v1.8.5-rc0
  v1.8.5-rc1
  v1.8.5-rc2
  v1.8.5-rc3
  v1.8.5.1
  v1.8.5.2
  v1.8.5.3
  v1.8.5.4
  v1.8.5.5
```

#### 2.6.2创建标签

Git 使用两种主要类型的标签:轻量标签(lightweight)与附注标签(annotated)。 一个轻量标签很像一个不会改变的分支——它只是一个特定提交的引用。

然而，附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的;其中包含打标签者的名字、电子 邮件地址、日期时间;还有一个标签信息;并且可以使用 GNU Privacy Guard (GPG)签名与验证。 通常建议 创建附注标签，这样你可以拥有以上所有信息;但是如果你只是想用一个临时的标签，或者因为某些原因不想要保存那些信息，轻量标签也是可用的。

1. 附注标签

在 Git 中创建一个附注标签是很简单的。 最简单的方式是当你在运行 tag 命令时指定 -a 选项:

```bash
$ git tag -a v1.4 -m "my version 1.4"
  $ git tag
  v0.1
  v1.3
v1.4
```

-m 选项指定了一条将会存储在标签中的信息。 如果没有为附注标签指定一条信息，Git 会运行编辑器要求你输 入信息。

通过使用git show命令可以看到标签信息与对应的提交信息:

```bash
$ git show v1.4
  tag v1.4
  Tagger: Ben Straub <ben@straub.cc>
  Date:   Sat May 3 20:19:12 2014 -0700
  my version 1.4
  commit ca82a6dff817ec66f44342007202690a93763949
  Author: Scott Chacon <schacon@gee-mail.com>
  Date:   Mon Mar 17 21:52:11 2008 -0700
      changed the version number
```

输出显示了打标签者的信息、打标签的日期时间、附注信息，然后显示具体的提交信息。

2. 轻量标签

另一种给提交打标签的方式是使用轻量标签。 轻量标签本质上是将提交校验和存储到一个文件中——没有保存 任何其他信息。 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字:

```bash
$ git tag v1.4-lw
  $ git tag
  v0.1
  v1.3
  v1.4
  v1.4-lw
  v1.5
```

这时，如果在标签上运行 git show，你不会看到额外的标签信息。 命令只会显示出提交信息:

```bash
   $ git show v1.4-lw
  commit ca82a6dff817ec66f44342007202690a93763949
  Author: Scott Chacon <schacon@gee-mail.com>
  Date:   Mon Mar 17 21:52:11 2008 -0700
      changed the version number
```

#### 2.6.3后期打标签

你也可以对过去的提交打标签。 假设提交历史是这样的:

```bash
$ git log --pretty=oneline
  15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
  a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
  0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
  6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
  0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
  4682c3261057305bdd616e23b64b0857d832627b added a todo file
  166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
  9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
  964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
  8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```

现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “updated rakefile” 提交。 你可以在之后补上标签。 要 在那个提交上打标签，你需要在命令的末尾指定提交的校验和(或部分校验和):

```bash
$ git tag -a v1.2 9fceb02
```

可以看到你已经在那次提交上打上标签了:

```bash
   $ git tag
  v0.1
  v1.2
  v1.3
  v1.4
  v1.4-lw
  v1.5
  $ git show v1.2
  tag v1.2
  Tagger: Scott Chacon <schacon@gee-mail.com>
  Date:   Mon Feb 9 15:32:16 2009 -0800
  version 1.2
  commit 9fceb02d0ae598e95dc970b74767f19372d61af8
  Author: Magnus Chacon <mchacon@gee-mail.com>
  Date:   Sun Apr 27 20:43:35 2008 -0700
      updated rakefile
```

#### 2.6.4共享标签

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到 共享服务器上。 这个过程就像共享远程分支一样——你可以运行 git push origin [tagname]。

```bash
$ git push origin v1.5
  Counting objects: 14, done.
  Delta compression using up to 8 threads.
  Compressing objects: 100% (12/12), done.
  Writing objects: 100% (14/14), 2.05 KiB | 0 bytes/s, done.
  Total 14 (delta 3), reused 0 (delta 0)
  To git@github.com:schacon/simplegit.git
   * [new tag]         v1.5 -> v1.5
```

如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。 这将会把所有不在远程仓库 服务器上的标签全部传送到那里。

```bash
   $ git push origin --tags
  Counting objects: 1, done.
  Writing objects: 100% (1/1), 160 bytes | 0 bytes/s, done.
  Total 1 (delta 0), reused 0 (delta 0)
  To git@github.com:schacon/simplegit.git
   * [new tag]         v1.4 -> v1.4
   * [new tag]         v1.4-lw -> v1.4-lw
```

现在，当其他人从仓库中克隆或拉取，他们也能得到你的那些标签。

#### 2.6.5删除标签

要删除掉你本地仓库上的标签，可以使用命令git tag -d <tagname>。例如，可以使用下面的命令删除掉 一个轻量级标签:

```bash
$ git tag -d v1.4-lw
  Deleted tag 'v1.4-lw' (was e7d5add)
```

应该注意的是上述命令并不会从任何远程仓库中移除这个标签，你必须使用git push <remote> :refs/tags/<tagname> 来更新你的远程仓库:

```bash
$ git push origin :refs/tags/v1.4-lw
  To /git@github.com:schacon/simplegit.git
   - [deleted]         v1.4-lw
```

#### 2.6.6检出标签

如果你想查看某个标签所指向的文件版本，可以使用git checkout命令，虽然说这会使你的仓库处于“分离 头指针(detacthed HEAD)”状态——这个状态有些不好的副作用:

在“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化，但你的新提交将不属于任何 分支，并且将无法访问，除非确切的提交哈希。因此，如果你需要进行更改——比如说你正在修复旧版本的错 误——这通常需要创建一个新分支:

```bash
$ git checkout -b version2 v2.0.0
  Switched to a new branch 'version2'
```

当然，如果在这之后又进行了一次提交，version2 分支会因为这个改动向前移动，version2 分支就会和 v2.0.0 标签稍微有些不同，这时就应该当心了。

## 3.Git 分支