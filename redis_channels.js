let net = require('net');
let redis = require('redis');

let server = net.createServer(function (socket) {
   let subscriber, publisher;

    subscriber = redis.createClient();
    subscriber.subscribe('main_chat_room');

    subscriber.on('message', function (channel, message) {
        socket.write('Channel ' + channel + ': ' + message);
    });

    publisher = redis.createClient();

   socket.on('data', function (data) {
       publisher.publish('main_chat_room', data);
   });

   socket.on('end', function () {
       subscriber.unsubscribe('main_chat_room');
       subscriber.end(true);
       publisher.end(true);
   });
});

server.listen(3000);