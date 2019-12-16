let http = require('http');
let url = require('url');
let items = [];

let server = http.createServer(function (req, res) {
    let item = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        item += chunk;
    });

    let path = url.parse(req.url).pathname;
    let i = parseInt(path.slice(1), 10);

    switch (req.method) {
        case 'POST':
            req.on('end', function () {
                items.push(item);
                res.end('OK\n');
            });

            break;
        case 'GET':
            let body = items.map(function (item, i) {
                return i + ') ' + item;
            }).join('\n') + '\n';

            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8');

            res.end(body);

            break;
        case 'PUT':
            req.on('end', function () {
                if (isNaN(i)) {
                    res.statusCode = 400;
                    res.end('Invalid item id');
                } else if (!items[i]) {
                    res.statusCode = 404;
                    res.end('Item not found');
                } else {
                    items[i] = item;
                    res.end('OK\n');
                }
            });

            break;
        case 'DELETE':
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});

server.listen(3000);