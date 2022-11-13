import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';
import DocsActions from '../documents/actions';
const actions = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  ACTIVATE_LANG_MODAL: 'ACTIVATE_LANG_MODAL',

  submitLogs: (values) => (dispatch) => {
    console.log(values)
    axios
      .post(`${ROOT_URL}/api/logs`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Your Log submitted'));
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },
  updateLog: (id, values) => (dispatch) => {
    console.log(values)
    axios
      .put(`${ROOT_URL}/api/logs/${id}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Your Log updated'));
        dispatch(DocsActions.getDocuments())
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },

};
export default actions;
