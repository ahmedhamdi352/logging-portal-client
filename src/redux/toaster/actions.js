import Toaster from './toaster';

const actions = {
  SUCCESS_TOASTER: 'SUCCESS_TOASTER',
  ERROR_TOASTER: 'ERROR_TOASTER',
  triggerSuccess: (message) => (dispatch) => {
    dispatch({
      type: actions.SUCCESS_TOASTER,
    });
    Toaster.success(message);
  },
  triggerError: (message, details = []) => (dispatch) => {
    dispatch({ type: actions.ERROR_TOASTER });
    if (typeof message === 'string' && typeof details === 'object') {
      Toaster.error(message, details);
    }
  },
};
export default actions;
