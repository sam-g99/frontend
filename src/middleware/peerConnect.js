// Peer js middleware for easy access

import Peer from 'peerjs';

// Currently using public stun servers to connect users

const stunServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
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
