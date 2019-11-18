// Peer js middleware for easy access

import Peer from 'peerjs';

// Currently using public stun servers to connect users

//const stunServers = [{ urls: 'stun:stun.l.google.com:19302' }, {}];
const stunServers = [
  { url: 'turn:turn.tadio.xyz:3478', username: 'password', credential: 'password' },
];

// Connecting to peer server, able to provide your own id

function peerConnect(id) {
  return new Peer(id, {
    config: {
      iceServers: stunServers,
    },
  });
}

export default peerConnect;
