import { store } from '../redux/store';
import documentsActions from '../redux/documents/actions';
const { SOCKETS_UPDATE_DOC_STATUS } = documentsActions;
const doumentListenser = {
  initialize: (socket) => {
    socket.on('doc:update-status', (data) => {
      console.log('doc:update-status', data);
      store.dispatch({ type: SOCKETS_UPDATE_DOC_STATUS, payload: data });
    });
  },
};

export default doumentListenser;
