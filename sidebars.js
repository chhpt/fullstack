module.exports = {
  base: {
    数据结构与算法: ["algorithms/index", "algorithms/problems"],
    操作系统: [
      "operating-system/index",
      "operating-system/file",
      {
        Linux: [
          "operating-system/linux/index",
          "operating-system/linux/permission",
        ],
      },
    ],
    网络: [
      "network/index",
      "network/http",
      "network/performance",
      "network/security",
      "network/tcp",
      "network/restful",
    ],
  },
  javascirpt: [
    "javascript/index",
    "javascript/cors",
    "javascript/foundation",
    "javascript/function",
    "javascript/object",
    "javascript/patterns",
    "javascript/theory",
    "javascript/monitor",
    "javascript/performance",
    "javascript/test",
    {
      ES6: ["javascript/es6/index", "javascript/es6/dev"],
    },
    "javascript/reg",
    {
      TypeScript: ["javascript/typescript/index", "javascript/typescript/doc"],
    },
  ],
  engineering: [
    "engineering/index",
    {
      Webpack: [
        "engineering/webpack/index",
        "engineering/webpack/loader",
        "engineering/webpack/webpack_1",
        "engineering/webpack/webpack_2",
      ],
    },
  ],
  react: [
    "react/index",
    "react/lifecycle",
    "react/event",
    "react/router",
    "react/dom",
  ],
  vue: ["vue/index", "vue/cli", "vue/practice"],
  node: [
    "node/index",
    "node/module",
    "node/npm",
    "node/event-loop",
    "node/v8",
    "node/buffer",
    "node/http",
    "node/net",
    "node/performance",
    "node/process",
    "node/stream",
    "node/koa/koa",
    "node/koa/koa-router",
  ],
  mongodb: ["database/mongodb/index", "database/mongodb/tips"],
  redis: ["database/redis/index", "database/redis/cache"],
  devops: {
    docker: ["docker/index", "docker/intro"],
  },
  tools: [
    "tools/index",
    "tools/git/index",
    "tools/macos/index",
    {
      VSCode: ["tools/vscode/index", "tools/vscode/plugin"],
    },
  ],
};
