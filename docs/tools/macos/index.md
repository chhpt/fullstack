---
id: index
title: Mac Dev
---


## Homebrew

[Homebrew](https://brew.sh/)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 终端

### iTerm2

```bash
brew cask install iterm2
```

**或安装包**

[iTerm2 - macOS Terminal Replacement](https://www.iterm2.com/index.html)

### oh my zsh

[robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 插件

#### autojump

```bash
brew install autojump

添加到 .zshrc 文件中
```

#### zsh-syntax-highlighting

[zsh-users/zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

plugins=(zsh-syntax-highlighting)
```

#### zsh-autosuggestions

[zsh-users/zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

plugins=(zsh-autosuggestions)
```

#### zsh-completions

[zsh-users/zsh-completions](https://github.com/zsh-users/zsh-completions)

```bash
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
```

#### 移除 Terminal Last Login 显示

创建

```bash
~/.hushlogin
```

#### 设置快捷键

1. 删除一个单词

```bash
# linux
Ctrl + W

# 通过 iterm2 设置，Preference/Profiles/Keys
# 新建 快捷键 Action => Send Hex Code：0x1b 0x7f
```

2. 删除整行

```bash
# linux
Ctrl + U

# 通过 iterm2 设置，Preference/Profiles/Keys
# 新建 快捷键 Action => Send Hex Code：0x15
```

#### 窗口设置

**Preference/General/Working Directory**

1. 新建窗口目录
2. 新 Tab 目录
3. Split Panel 目录

#### alias

```bash
alias gc="git clone"
alias dev="yarn run dev"
alias dkps="docker ps"
alias dkst="docker stats"
alias dkrm="docker rm"
alias dkrmi="docker rmi"
alias dkpsa="docker ps -a"
alias dkimgs="docker images"
alias dkcpup="docker-compose up -d"
alias dkcpdown="docker-compose down"
alias dkcpstart="docker-compose start"
alias dkcpstop="docker-compose stop"
```

### 二，字体

#### fira code 字体

[tonsky/FiraCode](https://github.com/tonsky/FiraCode)

#### 解决 macOS Mojave 上字体发虚的问题。

部分应用

```bash
defaults write com.microsoft.VSCode.helper CGFontRenderingFontSmoothingDisabled -bool NO
```

全局

```bash
defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO
```

## Node

使用 nvm 安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

[nvm-sh/nvm](https://github.com/nvm-sh/nvm)

使用 Node 安装包：[https://nodejs.org/en/](https://nodejs.org/en/)

## Git

配置用户名和邮箱

```bash
git config --global user.email "email@example.com"
git config --global user.name "name"
```

设置 SSH Key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### Git 代理

```
git config —global http.proxy http://127.0.0.1:1080
git config —global https.proxy https://127.0.0.1:1080

```

## Alfred

### 搜索浏览器标签

Preference => Features

### 记录剪切板历史

Preference => Features

### 启动终端并执行命令

Preference => Features

[GitHub - stuartcryan/custom-iterm-applescripts-for-alfred: Custom iTerm Applescripts for Alfred](https://github.com/stuartcryan/custom-iterm-applescripts-for-alfred)

