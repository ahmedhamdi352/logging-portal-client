import axios from 'axios';
import toaster from '../toaster/actions';

import { ROOT_URL } from '../keys';

const actions = {
  //get setting
  GET_SETTING: 'GET_SETTING',
  GET_SETTING_ERROR: 'GET_SETTING_ERROR',
  //update setting
  UPDATE_SETTING: 'UPDATE_SETTING',
  UPDATE_SETTING_ERROR: 'UPDATE_SETTING_ERROR',
  //change password
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',
  //get all users
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_ALL_USERS_ERROR: 'GET_ALL_USERS_ERROR',
  //create user
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_ERROR: 'CREATE_USER_ERROR',
  //update user
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  getSetting: (settingName) => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/setting/${settingName}`)
      .then((res) => {
        dispatch({ type: actions.GET_SETTING, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_SETTING_ERROR });
      });
  },
  updateCrobJobSettings: (name, value) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/setting/cronjob`, { name, value })
      .then((res) => {
        dispatch(toaster.triggerSuccess('Setting updated.'));
        dispatch({ type: actions.UPDATE_SETTING, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.UPDATE_SETTING_ERROR });
      });
  },

  changePassword: (values) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/user/changepassword`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Password changed'));
        dispatch({ type: actions.CHANGE_PASSWORD, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.CHANGE_PASSWORD_ERROR });
      });
  },

  getAllUsers: () => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/user`)
      .then((res) => {
        dispatch({ type: actions.GET_ALL_USERS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_ALL_USERS_ERROR });
      });
  },
  createUser: (user) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/user`, user)
      .then((res) => {
        dispatch(toaster.triggerSuccess('User created'));
        dispatch({ type: actions.CREATE_USER, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.CREATE_USER_ERROR });
      });
  },

  updateUser: (userId, values) => (dispatch) => {
    dispatch({ type: actions.UPDATE_USER_REQUEST });
    axios
      .put(`${ROOT_URL}/api/user/${userId}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('User updated'));
        dispatch({ type: actions.UPDATE_USER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        let errorDetails = err.response?.data?.error?.details || [];
        dispatch(toaster.triggerError(errorMsg, errorDetails));
        dispatch({ type: actions.UPDATE_USER_FAILURE, payload: err.response?.data });
      });
  },
  updateSetting: (name, value) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/setting/${name}`, { name, value })
      .then((res) => {
        dispatch(toaster.triggerSuccess('Setting updated.'));
        dispatch({ type: actions.UPDATE_SETTING, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        let errorDetails = err.response?.data?.error?.details;
        dispatch(toaster.triggerError(errorMsg, errorDetails));
        dispatch({ type: actions.UPDATE_SETTING_ERROR });
      });
  },
};
export default actions;
