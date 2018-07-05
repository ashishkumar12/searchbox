const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
export const io = sailsIOClient(socketIOClient);
io.sails.url = process.env.API_URL;
io.sails.autoConnect = true;
io.socket.on('connect',() => {
    console.log('connected to server...');
});
io.socket.on('disconnect',() => {
    console.log('disconnected from server');
    io.socket._raw.io._reconnection = true;
});
io.socket.on('reconnect', (socket) => {
    console.log('reconnected ...');
});

export function connectToSocket(API_URL){

}
