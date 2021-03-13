## 1.git初始化

## 1.1设置用户信息

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

## 1.2检查配置信息

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

