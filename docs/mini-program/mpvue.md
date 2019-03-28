# [mpvue](http://mpvue.com/mpvue/)

## 新建一个项目

```shell
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

## 实践

### 1. 使用 CSS 预处理器

直接安装对应的依赖，在 style 中使用即可。如 less 安装 less 和 less-loader，sass 安装 node-sass 和 sass-loader。

### 2. HTTP 请求 - [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)

安装 flyio

```shell
yarn add flyio
```

发送 HTTP 请求

```js
import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();
// 发送 GET 请求
fly
  .get(url, options)
  .then(d => {})
  .catch();
// 发送 POST 请求 
fly
  .post(url, options)
  .then(d => {})
  .catch();
```

### 3. 请求参数

在小程序中，可以在 onLoad 生命周期中通过 option 获取路由携带的参数，但是在 mpvue 中，官方不建议使用小程序的生命周期方法，好在官方提供了[替代方法](http://mpvue.com/mpvue/#_18)，在所有的组件内可以通过 `this.$root.$mp.query` 进行获取。

### 4. 配置页面

在 mpvue 中，为了对页面进行配置，可以在每个 page 的文件夹下新建一个和 JS 同名的 JSON 文件，经过 Webpack 处理后，此 JSON 文件会作为页面的配置文件。

### 5. 