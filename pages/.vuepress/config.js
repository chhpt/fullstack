const dayjs = require('dayjs');
const path = require('path');
require('dayjs/locale/zh-cn');

dayjs.locale('zh-cn');

module.exports = {
    base: '/the-web-full-stack-way/',
    title: 'The Web Full Stack Way',
    theme: '@vuepress/default',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: '计算机基础',
                items: [
                    {
                        text: '数据结构与算法',
                        link: '/data-structure-and-algorithms/'
                    },
                    {
                        text: '操作系统',
                        link: '/operating-system/'
                    },
                    {
                        text: '网络',
                        link: '/network/'
                    }
                ]
            },
            {
                text: 'Web 前端',
                items: [
                    {
                        text: 'HTML&CSS',
                        link: '/html&css/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/javascript/'
                    },
                    {
                        text: '工程化',
                        link: '/engineering/'
                    },
                    {
                        text: '框架',
                        link: '/framework/'
                    },
                    { text: '小程序', link: '/mini-program/' }
                ]
            },
            {
                text: 'Node',
                link: '/node/'
            },
            { text: '数据库', link: '/database/' },
            { text: 'Docker', link: '/docker/' },
            { text: '工具', link: '/tools/' },
            { text: 'Github', link: 'https://github.com/chhpt/the-web-full-stack-way' }
        ],
        displayAllHeaders: true,
        lastUpdated: '上次更新',
        sidebar: {
            '/data-structure-and-algorithms/': [
                '',
                'problems',
                'array/',
                'string/',
                'linked-list/'
            ],
            '/docker/': ['', 'intro'],
            '/engineering/': [
                {
                    title: '工程化',
                    collapsable: false,
                    children: [
                        '',
                        'modular',
                        'webpack/',
                        'webpack/webpack_1',
                        'webpack/webpack_2',
                        'webpack/loader'
                    ]
                }
            ],
            '/framework/': [
                {
                    title: '框架',
                    collapsable: false,
                    children: ['']
                },
                {
                    title: 'Vue',
                    collapsable: false,
                    children: ['vue/', 'vue/vuex']
                },
                {
                    title: 'React',
                    collapsable: false,
                    children: ['react/']
                }
            ],
            '/html&css/': [
                {
                    title: 'HTML',
                    collapsable: false,
                    children: ['', 'dom', 'html5', 'style', 'canvas']
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: ['css', 'layout']
                },
                {
                    title: '浏览器',
                    collapsable: false,
                    children: ['painting', 'browser']
                }
            ],
            '/javascript/': [
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        '',
                        'foundation',
                        'function',
                        'object',
                        'performance',
                        'theory',
                        'test',
                        'patterns',
                        'cors'
                    ]
                },
                {
                    title: 'ES6',
                    collapsable: false,
                    children: ['es6/', 'es6/dev']
                },
                {
                    title: 'TypeScript',
                    collapsable: false,
                    children: ['typescript/', 'typescript/doc']
                },
                {
                    title: '小技巧',
                    collapsable: false,
                    children: ['tips/']
                }
            ],
            '/mini-program/': [
                {
                    title: '小程序',
                    collapsable: false,
                    children: ['', 'base', 'mpvue', 'mp', 'cloud']
                }
            ],
            '/network/': ['', 'http', 'security', 'performance'],
            '/node/': [
                {
                    title: 'Node',
                    collapsable: false,
                    children: ['', 'module', 'npm', 'event-loop', 'v8', 'stream']
                },
                {
                    title: 'Koa',
                    collapsable: false,
                    children: ['koa/koa', 'koa/koa-router']
                }
            ],
            '/operating-system/': ['', 'file'],
            '/tools/': [
                '',
                {
                    title: '编辑器',
                    collapsable: false,
                    children: ['editor/vscode/', 'editor/vscode/plugin']
                }
            ]
        }
    },
    plugins: {
        '@vuepress/active-header-links': false,
        '@vuepress/medium-zoom': true,
        '@vuepress/container': true
    }
};
