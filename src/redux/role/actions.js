import axios from 'axios';
import toaster from '../toaster/actions';

import { ROOT_URL } from '../keys';

const actions = {
  //get setting
  GET_ROLES: 'GET_ROLES',
  GET_ROLES_ERROR: 'GET_ROLES_ERROR',
  //get permissions
  GET_ROLES_PERMISSIONS: 'GET_ROLES_PERMISSIONS',
  GET_ROLES_PERMISSIONS_ERROR: 'GET_ROLES_PERMISSIONS_ERROR',
  //create role
  CREATE_ROLE: 'CREATE_ROLE',
  CREATE_ROLE_ERROR: 'CREATE_ROLE_ERROR',
  //delete role
  DELETE_ROLE: 'DELETE_ROLE',
  DELETE_ROLE_ERROR: 'DELETE_ROLE_ERROR',
  //update role
  UPDATE_ROLE: 'UPDATE_ROLE',
  UPDATE_ROLE_ERROR: 'UPDATE_ROLE_ERROR',

  getRoles: () => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/roles/`)
      .then((res) => {
        dispatch({ type: actions.GET_ROLES, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_ROLES_ERROR });
      });
  },
  getPermissions: () => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/roles/permissions/`)
      .then((res) => {
        dispatch({ type: actions.GET_ROLES_PERMISSIONS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_ROLES_PERMISSIONS_ERROR });
      });
  },
  createRole: (values) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/roles`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Role created.'));
        dispatch({ type: actions.CREATE_ROLE, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.CREATE_ROLE_ERROR });
      });
  },
  deleteRole: (roleId) => (dispatch) => {
    axios
      .delete(`${ROOT_URL}/api/roles/${roleId}`)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Role deleted.'));
        dispatch({ type: actions.DELETE_ROLE, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.DELETE_ROLE_ERROR });
      });
  },

  updateRole: (roleId, values) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/roles/${roleId}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Role updated.'));
        dispatch({ type: actions.UPDATE_ROLE, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.UPDATE_ROLE_ERROR });
      });
  },
};
export default actions;
