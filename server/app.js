let url = require('url');
const md5 = require('md5');
const users = [
    {
        id: 0,
        username: 'public',
        avatar: '/img/avatar-default.png',
        status: 'online'
    }
];
const server = require('http').createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    let urlParts = url.parse(req.url, true);
    let query = urlParts.query;
    switch(urlParts.pathname) {    
        case '/auth':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                if(body.length != 0) {
                    body = JSON.parse(body);
                    let user = {
                        id: md5(body.username + new Date()),
                        username: body.username,
                        status: 'online',
                        avatar: '/img/avatar.png'
                    }
                    users.push(user);
                    let response = {
                        type: 'auth',
                        message: 'success',
                        error: false,
                        data: user
                    };
                    //for now just accept
                    res.write(
                        JSON.stringify(response)
                    );
                }
                res.end();
            });            
        break;
        case '/users':
            let usersToOut = users.filter(function(user) {return user.id != query.id;});
            res.write(JSON.stringify(usersToOut));
            res.end();
        break;
        default:
        res.end();
        break;
    }
});
const io = require('socket.io')(server);
io.on('connection', client => {
    client.send(
        JSON.stringify({
            type: 'serverMessage',
            message: 'Welcome'
        })
    );
    client.on("message", message => {
        //console.log(message);
        message= JSON.parse(message);
        switch(message.type) {
            case 'auth':
                let user = {
                    id: md5(message.data.username + new Date()),
                    username: message.data.username,
                    status: 'online',
                    avatar: '/img/avatar.png'
                }
                users.push(user);
                let response = {
                    type: 'auth',
                    message: 'success',
                    error: false,
                    data: user
                };
                //for now just accept
                client.send(
                    JSON.stringify(response)
                );
            break;
            case 'userMessage':
                client.broadcast.send(
                    JSON.stringify(message)
                );
                message.type = "myMessage";
                client.send(
                    JSON.stringify(message)
                );
            break;
            default:
            //echo
                client.send(
                    JSON.stringify(message)
                );
            break;
        }        
    });
    client.on('disconnect', () => { /* … */ });
});
server.listen(3000);