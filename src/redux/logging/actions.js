import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';

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
};
export default actions;
