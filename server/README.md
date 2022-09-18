# Server
A simple nest.js server hosted on free-tier AWS EC2 instance.
You can send request to the following: 
IP: 107.21.129.164
Port: 3008

To test if the server is up and running, send a GET request to: "http://107.21.129.164:3008/", or simply paste url in the browser.
In both cases the response should be: "Hello World! (HTTP)".

I've also configured a websocket with the following events:
###### Echo message
- Event: echoMessage
- Payload: string
- Result: Returns an event with payload txt back to the sender. Use this for testing your connection.
###### Broadcast message
- Event: broadcastMessage
- Payload: string
- Result: Sends an event receiveBoadcastMessage with provided payload to all clients.

For more details see `app.gateway.ts` for websocket endpoints and `app.controller.ts` for HTTP endpoints which can be found in `./bd-msg-server/src`

### SSH to EC2 instance
Our EC2 instance runs Ubuntu instead of Amazon Linux 2. Use the following command in order to connect via ssh:
```
ssh -i "db_msg_openssh.pem" ubuntu@ec2-107-21-129-164.compute-1.amazonaws.com
```
You can find `db_msg_openssh.pem` in `./ssh` folder.
