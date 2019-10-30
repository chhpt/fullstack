---
title: 怎么初始化你的 Linux 新磁盘？
tags:
    - Linux
date: 2019/10/19
thumbnail: https://xpic.devtoken.club/blog-pics/Xnip2019-10-19_17-05-21.jpg
---

最近，双十一临近，各种商家也逐渐开始了促销，[腾讯云推出了双十一活动](https://cloud.tencent.com/act/double11/reserve?spread_hash_key=2eGL1O)，2 核 4 G，5M 的服务器 3 年只需 998 元，很是划算，随入手了一台服务器用作自用，打算将这台服务器当做未来几年的主力服务器。

既然是主力服务器，必然考虑到各种情况，数据安全性是很重要的一点，如果直接把数据放在系统盘中，难免遇到什么特殊情况，需要重装系统盘，数据就可能需要迁移，十分不便。于是我决定购买一个数据盘，单独存放数据使用，并启动数据盘的定时快照功能，就能保障数据的安全性了。

为了让 Linux 系统能够正常使用这块磁盘，要先对磁盘进行一些初始化工作。

<!-- more -->

## 命令

先了解一下我们要使用到的 Linux 命名：

- `df`：用于显示目前 Linux 系统上的文件系统的磁盘使用情况统计
- `fdisk`：用于管理磁盘分区表
- `mount`：用于挂载 Linux 系统外的文件
- `partprobe`：用于重读分区表，当出现删除文件后，出现仍然占用空间。可以在不重启的情况下重读分区。
- `mkfs` ：用于在设备上创建Linux文件系统

## 磁盘分区

第一步，要对磁盘进行格式化分区。

#### 1. 查看系统磁盘信息，获取新增加的磁盘设备信息。

```bash
fdisk -l
```
回显

```
Disk /dev/vda: 50 GiB, 53687091200 bytes, 104857600 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3fa1d255

Device     Boot Start       End   Sectors Size Id Type
/dev/vda1  *     2048 104857566 104855519  50G 83 Linux


Disk /dev/vdb: 60 GiB, 64424509440 bytes, 125829120 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

可以看到，当前的服务器上有两个磁盘，一个 50G，一个 60G，50G 的是服务器自带的系统盘，60G 的就是新购买的数据盘，还没有进行过分区操作。

#### 2. 对新增的数据盘进行分区操作

下面开始对数据盘进行分区操作

```bash
fdisk /dev/vdb
```

回显

```
Welcome to fdisk (util-linux 2.31.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x695b2bd0.

Command (m for help):
```

输入 `n`，回车新建分区

```
Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p):
```

这里我们可以看到有两种分区类型：primary（主分区）和 extended（扩展分区），这里选择创建主分区，输入 `p` 回车，会提示输入一些信息

```
Partition number (1-4, default 1): 1
First sector (2048-125829119, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-125829119, default 125829119):

Created a new partition 1 of type 'Linux' and of size 60 GiB.

Command (m for help):
```

由于这个磁盘是全新的，没有任何分区，所以设置分区编号为 1，其他的为默认值，即可创建新的分区。

#### 3. 查看分区信息

创建完分区后，输入 `p` 即可查看新创建的分区信息

```
Command (m for help): p

Disk /dev/vdb: 60 GiB, 64424509440 bytes, 125829120 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x695b2bd0

Device     Boot Start       End   Sectors Size Id Type
/dev/vdb1        2048 125829119 125827072  60G 83 Linux
```

#### 4. 将分区结果写入分区表中

确认分区信息后，输入 `w` 回车即可将分区结果写入分区表中

```
Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

如上，表示分区创建完成。如果之前分区操作有误，请输入 `q`，则会退出 fdisk 分区工具，之前的分区结果将不会被保留。

#### 5. 将新的分区表变更同步至操作系统

partprobe 命令可以在不重启系统的情况下重读分区表

```bash
partprobe /dev/vdb
```

#### 6. 设置文件系统格式

执行以下命令，将新建分区文件系统设为系统所需格式。

```bash
# mkfs-t文件系统格式分区
mkfs -t ext4 /dev/vdb1
```
```
mke2fs 1.44.1 (24-Mar-2018)
Creating filesystem with 15728384 4k blocks and 3932160 inodes
Filesystem UUID: 65aa13b1-8ae4-4d69-bf3d-1e77f4cf3204
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
	4096000, 7962624, 11239424

Allocating group tables: done
Writing inode tables: done
Creating journal (65536 blocks): done
Writing superblocks and filesystem accounting information: done
```

格式化需要等待一段时间，请观察系统运行状态，不要退出。不同文件系统支持的分区大小不同，请根据您的业务需求选择合适的文件系统。

## 挂载磁盘

#### 1. 新建挂载目录

```bash
# 根据个人喜好创建
mkdir /mnt
```

#### 2. 挂载磁盘分区

```bash
mount /dev/vdb1 /mnt
```

#### 3. 使用 `df -TH` 查看挂载结果

```
Filesystem     Type      Size  Used Avail Use% Mounted on
udev           devtmpfs  2.0G  4.1k  2.0G   1% /dev
tmpfs          tmpfs     397M  5.9M  392M   2% /run
/dev/vda1      ext4       53G  2.6G   48G   6% /
tmpfs          tmpfs     2.0G   25k  2.0G   1% /dev/shm
tmpfs          tmpfs     5.3M     0  5.3M   0% /run/lock
tmpfs          tmpfs     2.0G     0  2.0G   0% /sys/fs/cgroup
tmpfs          tmpfs     397M     0  397M   0% /run/user/500
/dev/vdb1      ext4       64G   55M   60G   1% /mnt
```

表示新建分区 `/dev/vdb1` 已挂载至 `/mnt`，此时已经可以使用新增加的数据盘了。但是一旦重启云服务器，挂载就会失效，所以我们需要设置自动挂载磁盘。

## 设置自动挂载磁盘

#### 1. 获取磁盘分区的 UUID 信息

执行如下命令，查询磁盘分区的 UUID。

```bash
# blkid 磁盘分区
blkid /dev/vdb1
```

```
/dev/vdb1: UUID=“65aa13b1-8ae4-4d69-bf3d-xxx” TYPE=“ext4” PARTUUID=“695bxx-01”
```

#### 2. 设置自动挂载

这里我们需要编辑 `fstab` 文件，`fstab` 文件包含了 Linux 系统可以挂载使用的文件系统的信息。

```bash
vi /etc/fstab
```

添加以下内容，保存退出

```
UUID=0b3040e2-1367-4abb-841d-ddb0b92693df /mnt/sdc   ext4   defaults    0 2
```

以内容上仅为示例，具体请以实际情况为准，参数说明如下：
- 第一列为 UUID，此处填写上面查询到的磁盘分区的 UUID。
- 第二列为磁盘分区的挂载目录，可以通过 **df -TH** 命令查询。
- 第三列为磁盘分区的文件系统格式， 可以通过 **df -TH** 命令查询。
- 第四列为磁盘分区的挂载选项，此处通常设置为defaults即可。
- 第五列为 Linux dump 备份选项。
    - 0 表示不使用 Linux dump 备份。现在通常不使用 dump 备份，此处设置为 0 即可。
    - 1 表示使用 Linux dump 备份。
- 第六列为 `fsck` 选项，即开机时是否使用 `fsck` 检查磁盘。
    - 0表示不检验。
    - 挂载点为（/）根目录的分区，此处必须填写 1。根分区设置为 1，其他分区只能从 2 开始，系统会按照数字从小到大依次检查下去。

#### 3. 验证挂载信息

执行如下命令，卸载已挂载的分区

```bash
# umount 磁盘分区
umount /dev/vdb1
```

执行如下命令，将 `/etc/fstab` 文件所有内容重新加载。

```bash
mount -a
```

执行如下命令，查询文件系统挂载信息。

```bash
# mount | grep 挂载目录
mount | grep /mnt
```

回显类似如下信息，说明自动挂载功能生效：

```
/dev/vdb1 on /mnt type ext4 (rw,relatime,data=ordered)
```

自此，初始化一个新的 Linux 磁盘的工作已经完成，就可以愉快的玩耍了。