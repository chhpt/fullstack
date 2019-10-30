---
title: Android 分享 Library 到 Jcenter
tags:
    - Android
date: 2019/10/10
thumbnail: https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_19-51-24.png
---

在安卓开发中，我们经常会在 `build.gradle`中引入各种各样的依赖辅助我们进行开发，如常用的 okhttp 请求 Library：

```
dependencies {
    implementation 'com.squareup.okhttp3:okhttp:3.12.1'
}
```

<!-- more -->

如果我们开发了自己的通用 Library，怎么让别人可以这样使用，下面聊聊怎么将 Android Library 发布到 Jcenter。

## Jcenter

Jcenter是一个 [Bintray](https://bintray.com/) 维护的 Maven 仓库，我们可以在 Android 项目根目录的 `build.gradle` 中设置以下内容使用：

```
buildscript {
    repositories {
        Jcenter()
    }
}

allprojects {
    repositories {
        Jcenter()
    }
}
```

## 注册 bintray 账号

在发布之前，先要注册 bintray 账号。

注册免费的开源账户请点击右边白色的文字，不要点击绿色按钮。

![](https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_19-51-24.png)

填写好用户信息、邮箱后激活账户即可使用。

如果是个人发布 Library，直接新建仓库即可

![](https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_20-00-20.png)

如果是团队，可以先建立一个组织，在组织下操作。

## 创建 maven 仓库

在创建 Library 之前，需要先创建仓库（Repository），Library 是在仓库之下的。按照如下示例，创建 maven 类型的仓库

![](https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_20-04-12.png)

## 创建 Library

创建好 maven 仓库后，点击进入 maven 仓库，点击  `Add a Package`即可创建 Library，正常填写信息即可，在创建 Library 之前，可以先在 GitHub 上创建源代码仓库，在提交审核时需要。

## 获取 API Key

在 Edit Profile 中可以查看到 API Key，这里需要记录 API Key，在后面上传 Library 时会用到。

![](https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_20-15-11.png)

## 使用 bintray-release 上传 Library

这里我们要使用 [bintray-release:](https://github.com/novoda/bintray-release) 上传我们的 Library。

首要要添加插件，在项目根目录的 `build.gradle` 中添加 classpath 信息

```
buildscript {
    repositories {
        Jcenter()
    }

    dependencies {
        classpath 'com.novoda:bintray-release:<latest-version>'
    }
}
```

然后在源代码 `build.gradle` 中添加配置

```
apply plugin: 'com.android.library'
apply plugin: 'com.novoda.bintray-release' // android.library 后

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.0"
    ...
}

// 设置 publish 信息
publish {
    userOrg = 'github' // 组织名称，个人同用户名
    groupId = 'com.github.xxx'
    artifactId = 'xxx-lib'
    publishVersion = '1.0.0'
    desc = 'lib desc'
    website = 'https://xxx.com'
}
```

在 sync 完成后，在项目根目录运行下面的命令上传 Library 文件

```
./gradlew clean build bintrayUpload  -PbintrayUser=你的用户名  -PbintrayKey=这里填写刚刚保存的API Key -PdryRun=false
```

如果提示 `BUILD SUCCESSFUL` 即表示上传成功，就可以在你的仓库下看见上传的 Library。

## 发布到 Jcenter

上传完 Library 后，我们需要把 Library 同步到 Jcenter，方便他人使用。进入 Library 页面，可以在 Actions 选项中找到 Add to Jcenter 选项，点击后，不用填写任何信息，提交，等待管理员审批即可。

![](https://xpic.devtoken.club/blog/2019-10-10-Xnip2019-10-10_20-25-26.png)

## 使用
最后我们就可以像文章首部提到的那样使用我们的 Library 了：

```
// 添加 Jcenter 源
buildscript {
    repositories {
        Jcenter()
    }
}

allprojects {
    repositories {
        Jcenter()
    }
}
```

```
// 添加依赖
dependencies {
	  // 格式：implementation 'groupId:lib:version'
    implementation 'com.squareup.okhttp3:okhttp:3.12.1'
}
```
