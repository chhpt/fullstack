module.exports = {
  title: "FullStack Way",
  tagline: "探索 FullStack 之路。",
  url: "https://fastkit.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "chhpt",
  projectName: "fullstack",
  themeConfig: {
    navbar: {
      title: "FullStack Way",
      logo: {
        alt: "Site Logo",
        src: "img/logo.png",
      },
      items: [
        {
          label: "计算机基础",
          items: [
            {
              to: "docs/algorithms/index",
              label: "数据结构与算法",
            },
            {
              to: "docs/operating-system/index",
              label: "操作系统",
            },
            {
              to: "docs/network/index",
              label: "网络",
            },
          ],
        },
        {
          label: "前端",
          items: [
            {
              to: "docs/javascript/index",
              label: "JavaScript",
            },
            {
              to: "docs/engineering/index",
              label: "工程化",
            },
            {
              to: "docs/vue/index",
              label: "Vue",
            },
            {
              to: "docs/react/index",
              label: "React",
            },
          ],
        },
        {
          label: "Node",
          to: "docs/node/index",
        },
        {
          label: "数据库",
          items: [
            {
              to: "docs/database/redis/index",
              label: "Redis",
            },
            {
              to: "docs/database/mongodb/index",
              label: "MongoDB",
            },
          ],
        },
        {
          label: "DevOps",
          items: [
            {
              to: "docs/docker/index",
              label: "Docker",
            },
          ],
        },
        {
          label: "工具",
          to: "docs/tools/index",
        },
        { to: "https://whoyoung.me", label: "Blog", position: "left" },
        {
          href: "https://github.com/chhpt/the-full-stack-way",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      // links: [
      //   {
      //     title: "More",
      //     items: [
      //       {
      //         label: "博客",
      //         to: "https://whoyoung.me",
      //       },
      //       {
      //         label: "Second Doc",
      //         to: "docs/doc2/",
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} FastKit`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
