/**
 * 流
 * 改变 Node 输出的字体颜色：
 * https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 */

const fs = require('fs');
const path = require('path');

const currentDir = process.cwd();
const stdin = process.stdin;
const stdout = process.stdout;
let stats = [];
let files = [];

// read string user input
function read(pathArg) {
  stdout.write('\033[31mEnter your choice: \033[39m');
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.once('data', data => {
    if (!isFinite(Number(data))) {
      process.exit(1);
    }
    const index = Number(data);
    if (!files[index]) {
      stdout.write(
        '\033[31mNo file or directory found. Please enter your choice again: \033[39m'
      );
    } else {
      if (stats[index].isDirectory()) {
        readDir(path.join(pathArg, files[index]));
      } else {
        fs.readFile(path.join(pathArg, files[index]), (err, content) => {
          if (err) {
            console.log('Read file error');
            process.exit(1);
          }
          console.log(content.toString());
          readDir(pathArg);
        });
      }
    }
  });
}

// 显示文件和文件夹
function showFiles(i, pathArg) {
  let filename = files[i];
  fs.stat(path.join(pathArg, filename), (err, stat) => {
    stats[i] = stat;
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (stat.isDirectory()) {
      console.log(i + ': \033[36m' + filename + '\033[39m');
    } else {
      console.log(i + ': \033[90m' + filename + '\033[39m');
    }

    if (++i === files.length) {
      read(pathArg);
    } else {
      showFiles(i, pathArg);
    }
  });
}

// 读取文件夹，提供 CLI 操作
function readDir(pathArg) {
  console.log('readDir', pathArg);
  fs.readdir(pathArg, (err, dirFiles) => {
    stats = [];
    files = dirFiles;
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // 文件夹为空
    if (!files.length) {
      // 红色输出
      console.log('\033[31mNo file to Show! \033[39m');
    }
    console.log('Select which file or directory to see \n');
    showFiles(0, pathArg);
  });
}

readDir(process.cwd());
