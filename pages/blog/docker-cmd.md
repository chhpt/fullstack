---
title: Docker 常用命令
thumbnail: https://xpic.devtoken.club/blog/docker-cover.jpg
tags:
  - Docker
date: 2018-11-15
---

### 1. 运行一个交互式的容器

```shell
docker run -it image-name /bin/bash
```

如果遇到 `OCI runtime exec failed` 的情况，可以将 `/bin/bash` 替换成 `/bin/sh` 试试。

<!-- more -->

### 2. 指定容器的名称

```shell
docker run --name container-name -d image-name
```

### 3. 指定容器的端口映射

```shell
docker run --name container-name -d -p 8000:3000 image-name
```

### 4. 创建守护式容器（后台运行）

```shell
docker run -d --name image-name
```

### 5. 查看容器日志

```shell
docker logs container-name
```

### 6. 查看容器中运行的进程

```shell
docker top container-name
```

### 7. 进入容器内部

```shell
docker exec -it container-name /bin/bash
```

### 8. 自动重启容器

```shell
docker run --restart=always -d image-name
```

### 9. 查看容器的更多信息

```shell
docker inspect container-name
```

### 10. 删除容器

```shell
docker rm container-name
```

### 11. 持续运行

```shell
docker run -t -d ubuntu:18.04
```

[Docker container will automatically stop after “docker run -d” - Stack Overflow](https://stackoverflow.com/questions/30209776/docker-container-will-automatically-stop-after-docker-run-d)

[Docker 核心技术与实现原理 - SDK.CN - 中国领先的开发者服务平台](https://sdk.cn/news/7825)

#技术/docker
