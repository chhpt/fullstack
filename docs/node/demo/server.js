const http = require('http');

const handleRequest = () => {
  try {
    setTimeout(() => {
      console.log('Will Throw Error');
      throw new Error('Test Error');
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

const serve = http.createServer((req, res) => {
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('request ok');
  }, 2000);
});

serve.listen(3000);

process
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, 'UnhandledRejection Error');
  })
  .on('uncaughtException', err => {
    console.log(err, 'UncaughtException Error');
  });
