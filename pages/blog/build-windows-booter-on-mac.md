---
title: 在 Mac 上制作 Windows 启动盘
tags:
    - Mac
date: 2019/08/20
thumbnail: https://xpic.devtoken.club/blog/example-11.svg
---

## 一，下载 Windows 镜像

1. 微软官方 - [软件下载](https://www.microsoft.com/zh-cn/software-download)
微软官方提供了包括 Windows10、8、7 的最新镜像下载，可以根据自己的需求选择。

2. [MSDN, 我告诉你](https://msdn.itellyou.cn/)
这个网站提供了各个版本的Windows系统下载，这些镜像是从微软官方的服务器上获取的，全部都是未经改写的正版纯净原装系统。

<!-- more -->

## 二，制作启动盘

准备一个 8G 或 8G 以上大小的 U 盘，插入电脑。

1. 使用 `diskutil list` 列出当前系统所挂载的存储设备，根据磁盘的大小找到你的 U 盘，一般是最后几个设备，比如这里我挂载的 U 盘是 disk2。

    ![](https://xpic.devtoken.club/blog/Xnip2019-07-28_13-48-29.png)

2. 格式化 U 盘，输入下列命令，这里将 disk2 改为你的设备编号。

    ```shell
    diskutil eraseDisk MS-DOS "WINDOWS10" MBR disk2
    ```

    成功会输出：`Finished erase on disk2`

3. 拷贝 Windows 镜像到 U 盘中。

    如果直接拷贝 Windows ISO  文件到 U 盘，会出现文件过大，拷贝失败的情况。这里可以先双击下载好的 Windows ISO 文件，挂载镜像，会在 Finder 左侧出现一个磁盘一样的条目，记住名字，使用下面的命令拷贝文件。

    ```shell
    cp -rp /Volumes/VolumeName/* /Volumes/WINDOWS10/ 
    ```

    运行命令后，需要等待一段时间，等运行结束就可以了。

    Windows 启动盘制作完成。
