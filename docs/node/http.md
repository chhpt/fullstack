---
id: http
title: HTTP
---

## 创建 Node.js 的 HTTP 服务器

```js
const http = require("http");

// 创建 HTTP Server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("响应内容");
});

// 指定监听的端口
server.listen(3000);
```
