import documentListener from './documentListener';

const sockets = {
  initialize: (socket) => {
    documentListener.initialize(socket);
  },
};

export default sockets;
