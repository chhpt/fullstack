const path = require('path');

const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

// 需要导出配置
module.exports = config;

//  不能使用 es6 语法
// export default config;