---
title: 基于 VuePress 定制个人博客
date: 2019-05-22
thumbnail: https://xpic.devtoken.club/blog/vuepress-cover-2019-5-21.png
tags:
    - VuePress
    - Vue
---

## VuePress

简单来说，[VuePress](https://vuepress.vuejs.org/) 是 Vue 驱动的静态网站生成器。VuePress 简单易上手，同时也有足够强大的定制能力，尤其对熟悉 Vue 的前端开发人员而言。相比于知名的博客生成器 Hexo 来说，VuePress 最大优势就是 Vue 带来的灵活性。

<!-- more -->

在 VuePress 0.x 时，VuePress 还只能算是个生成文档的不错的工具，主题样式比较固定，功能也不是足够强大。随后，VuePress 1.x 版本的引入了主题和插件，让 VuePress 真正进化成一个利器。我们可以定制、发表、使用主题与插件，强大的 Vue 框架也使得主题与插件的开发更加容易。

本文就聊一聊基于 **VuePress 1.x** 的博客主题定制。先看个效果图

![vuepress-demo-2019-5-21.png](https://xpic.devtoken.club/blog/vuepress-demo-2019-5-21.png)
![vuepress-blog-2019-5-22.png](https://xpic.devtoken.club/blog/vuepress-blog-2019-5-22.png)

本项目根据 https://github.com/bencodezen/bencodezen 进行改造。

## VuePress 预置知识

这里只提几个比较重要的点，其他的关于 VuePress 的使用，配置需要同学自己现行了解，官网传送门 👉 [指南](https://v1.vuepress.vuejs.org/zh/guide/)

### Front Master

同 Hexo 类似，VuePress 也会使用 front matter 标识 Markdown 文本的信息，VuePress 支持 YAML，JSON 或者 TOML 格式的 front matter。

```
---
title: Blogging Like a Hacker
lang: en-US
---
```

在这些三条虚线之间，可以设置预定义变量，创建自己的自定义变量。 然后，可以使用 `$frontmatter` 在页面的其余部分、以及所有的自定义组件、主题组件中访问这些变量。

### 在 Markdown 中使用组件

所有在 `.vuepress/components` 中的 `*.vue` 文件将会自动地被注册为全局的异步组件，我们可以直接在 Markdown 文件中使用这些组件。

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

```
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

## 主题开发

开发 VuePress 主题是很简单的，我们只需要创建一个 `.vuepress/theme` 目录，并创建一个 `Layout.vue` 文件，然后就可以像开发 Vue 应用一样自定义我们的主题了。

```
.
└─ .vuepress
 └─ theme
     └─ Layout.vue
```

`Layout.vue` 文件可以看做是 Vue 项目的入口，我们需要在 `Layout.vue` 文件中完成页面布局，引入其他组件，实现 JS 逻辑等。VuePress 会将网站的元数据注入到所有组件中，如网站的 config，当前页面的 front matter 信息等，我们可以直接在组件中使用。

### 获取 Markdown 内容

> VuePress 实现了一套针对 Markdown 的内容分发 API。通过这个特性，你可以将你的文档分割成多个片段，以便于在布局组件中灵活组合。

![markdown-layout-2019-5-22.png](https://xpic.devtoken.club/blog/markdown-layout-2019-5-22.png)

简单来说，VuePress 会将 Markdown 内容填充到 `<Content />` 组件所在的位置。

### 页面布局

当我们了解以上内容以后，我们就可以进行的简单的主题开发了。一个最简单的主题，只需要一个 `<Content />` 组件就 OK 了

```html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

更进一步的，默认情况下，所有的 Markdown 文件会使用同一个布局组件，我们可以通过在 `front matter` 中指定使用的组件

```
---
layout: AnotherLayout
---
```

异或是根据不同的页面显示不同的布局，我们可以在 `front matter` 指定 Markdown 文件所属的类型，通过类型判断使用哪种布局（组件）

```html
<Blog v-else-if="$page.frontmatter.blog"/>

<Page v-else>
</Page>
```

比如这里我们为所有拥有 `blog` 属性的 Markdown 文件使用 Blog 组件布局。

## 博客开发

至此，我们就可以开发我们的 VuePress 博客。首先我们需要一个列表页面展示我们的文章，其次我们需要一个文章页面展示文章的内容。

首先我们可以通过 `$site.pages` 获取所有的 Markdown 页面，当然这里可能并不是所有的页面都是博客文章，所以我们可以在获取到数据后做一个过滤。我们可以开发一个简单的 Vue 组件来过滤并展示文章列表，并在 `src/README.md` 文件中使用这个组件

```
---
home: true
---
<BlogPostList :list="$site.pages" />
```

默认情况下，VuePress 会将 `src/README.md` 文件内容渲染为网站的首页，这里我们就可以实现将文章列表作为首页展示。

至于博客页面，则比较简单，我们可以给所有的 blog markdown 文件增加一个属性，使用这个属性来确定所使用的布局。

## 总结

至此，我们简单讲了使用 VuePress 定制开发博客的一些要点，感兴趣的同学可以进一步探索，开发自己的网站或博客。

### 附录

项目地址：[GitHub](https://github.com/chhpt/vuepress-blog)