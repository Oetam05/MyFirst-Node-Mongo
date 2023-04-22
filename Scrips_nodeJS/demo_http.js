var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("welcome to lab basicss!");
  res.end();
}).listen(8080); 

  