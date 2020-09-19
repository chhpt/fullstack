---
id: index
title: Git
---

Git 是一种分布式[版本控制系统](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)，没有了解过 Git 的同学可以去看看[廖雪峰的教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，简单易懂。

## 仓库

```shell
# 创建初始化一个文件夹为 Git 仓库
git init

# 克隆远程 Git 仓库到本地
git clone url

# 查看远程仓库信息
git remote -v

# 添加新的仓库
git remote add origin

# 移除仓库
git remote remove origin
```

## 代码修改

### 添加文件到暂存区

```shell
# 查看工作区状态
git status

# 添加单个文件
git add some.js

# 添加全部文件
git add .
```

### 提交到本地仓库

```shell
git commit -m "commit message"
```

> **建议**：使用 `git commit -am "message"` 命令，可以暂存修改并提交修改，相当于 `git add .` 和 `git commit -m "message"` 的合并。

### 贮藏（Stash）

```shell
# 将当前工作区的修改贮藏
# 如果有未被追踪的文件，需要先使用 git add 命令，才能被贮藏
git stash

# 列出所有的贮藏
git stash list

# 将最近的贮藏恢复到当前工作区（保留贮藏信息）
git stash apply

# 将最近的贮藏恢复到当前工作区，并删除贮藏信息
git stash pop

# 删除所有贮藏
git stash clear
```

### 更新与推送

```shell
# 拉取远程仓库更新
git fetch

# 将远程仓库的更新应用到本地对应的分支中
git pull <remote> <branch>

# 将本地的修改推送到远程
git push <remote> <branch>
```

> `git pull` 指令相当于 `git fetch` + `git merge`。

## 代码版本

```shell
# 查看历史提交信息
git log

# 查看历史提交信息（简介）
git log --pretty=oneline

# 回退到当前最新的提交
git reset --hard HEAD

# 回退到上次提交
git reset --hard HEAD^

# 回退到上 n 次提交
git reset --hard HEAD~n

# 回退到某次提交
git reset --hard commitId

# 丢弃某个文件的修改
git checkout 文件名
```

## 分支

```shell
# 创建分支
git branch 分支名

# 创建并切换
git branch -b 分支名

# 切换分支
git checkout 分支

# 合并某分支到当前分支
git merge

# 删除一个分支（）
git branch -d 分支名

# 强制删除一个分支
git branch -D 分支名

# 删除远程分支
git push origin -d 分支名
```

## 标签

```shell
# 查看本地的 tag
git tag

# 查看远程的 tag
git tag -r

# 给当前版本添加 tag
git tag 标签名

# 删除标签名
git tag -d 标签名

# 删除远程标签
git push origin -d 标签名

# 推送单个 tag 到远程仓库
git push origin 标签名

# 推送所有 tag 到远程仓库
git push origin --tags

# 更新远程 tag 到本地
git pull origin --tags
```

## git remote

https 协议和 ssh 协议不同 ？
