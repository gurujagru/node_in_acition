let http = require('http');
let url = require('url');

let items = [];

function show(res) {
    let html = '<html lang="en"><head><title>Todo List</title></head><body>'
        + '<h1>Todo List</h1>'
        + '<ul>'
        + items.map(function (item, i) {
            return '<li>' + item + '</li>'
                + '<form method="post" action="/delete/' + i +'">'
                + '<button type="submit">Delete</button>'
                + '</form>'
        }).join('')
        + '</ul>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item" /></p>'
        + '<p><input type="submit" value="Add Item" /></p>'
        + '</form></body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

let qs = require('querystring');

function add(req, res) {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { body += chunk });
    req.on('end', function () {
        let obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    })
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

let server = http.createServer(function (req,res) {
    let path = url.parse(req.url).pathname;
    let i = parseInt(path.slice(-1), 10);

    if ('/' == req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else if (`/delete/${i}` == req.url) {
        if (isNaN(i)) {
            res.statusCode = 400;
            res.end('Invalid item id');
        } else if (!items[i]) {
            res.statusCode = 404;
            res.end('Item not found');
        } else {
            items.splice(i, 1);

            res.setHeader('Location', '/');
            res.statusCode = 302;
            res.end();
        }
    } else {
        notFound(res);
    }
});

server.listen(3000);