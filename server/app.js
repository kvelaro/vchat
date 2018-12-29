const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
    client.send(
        JSON.stringify({
            type: 'serverMessage',
            message: 'Welcome'
        })
    );
    client.on("message", message => {
        message= JSON.parse(message);
        if(message.type == "userMessage") {
            client.broadcast.send(
                JSON.stringify(message)
            );
            message.type = "myMessage";
            client.send(
                JSON.stringify(message)
            );
        }
    });
    client.on('disconnect', () => { /* … */ });
});
server.listen(3000);