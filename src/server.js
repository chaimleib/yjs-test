import * as IO from 'socket.io';

class Server {
  constructor({port}) {
    this.port = port;
  }

  start() {
    console.log('starting...');
    this.io = IO();
    this.io.on('connection', client => {
      client.on('subscribeToTimer', interval => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit( 'timer', new Date() );
        }, interval);
      });
    });
    this.io.listen(this.port);
    console.log('server.js - listening on port: ', this.port);
    return this;
  }

  close() {
    this.io.close();
    return this;
  }
}
const singleton = new Server({
  port: 8000,
);
export default singleton.start();
