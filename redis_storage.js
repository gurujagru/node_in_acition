let redis = require('redis');
let client = redis.createClient(6379, '127.0.0.1');

client.on('error', function (err) {
    console.log(('Error ' + err));
});

// KEY/VALUE PAIR

client.set('color', 'red', redis.print);
client.get('color', function (err, value) {
    if (err) throw err;
    console.log(('Got: ' + value));
});

// HASH TABLE

client.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function (err, value) {
    if (err) throw err;
    console.log(('Will be cooking with: ' + value));
});

client.hkeys('camping', function (err, keys) {
    if (err) throw err;
    keys.forEach(function (key, i) {
        console.log((' ' + key));
    });
});

// LIST

client.lpush('tasks', 'Paint the bikeshed red', redis.print);
client.lpush('tasks', 'Paint the bikeshed green', redis.print);
client.lrange('tasks', 0, -1, function (err, items) {
    if (err) throw err;
    items.forEach(function (item, i) {
        console.log((' ' + item));
    });
});

// SET

client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', function (err, members) {
    if (err) throw err;
    console.log(members);

});
