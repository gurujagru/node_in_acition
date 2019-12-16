let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

let root = __dirname;

let server =http.createServer(function (req, res) {
    let url = parse(req.url);
    let path = join(root, url.pathname);
    fs.stat(path, function (err, stat) {
        if (err) {
            if ('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            let stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
            stream.on('data', function (chunk) {
                res.write(chunk);
            });
            stream.on('end', function () {
                res.end();
            });
        }
    });
});

server.listen(3000);