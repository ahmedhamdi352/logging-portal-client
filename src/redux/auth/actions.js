import axios from 'axios';
import Auth0Helper from '../../helpers/auth0/index';
import history from '../../helpers/auth0/history';
import jwt_decode from 'jwt-decode';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  GET_RELATED_USERS: 'GET_RELATED_USERS',
  FLUSHREALTEDUSERS: 'FLUSHREALTEDUSERS',
  SET_AUTH_LOADING: 'SET_AUTH_LOADING',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  getRelatedUsers: () => (dispatch) => {
    try {
      axios
        .get(`${ROOT_URL}/api/user/getRelatedUser`)
        .then((res) => {
          dispatch({ type: actions.GET_RELATED_USERS, payload: res.data })
        })
        .catch((err) => {
          console.log(err)
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  flushRelatedUsers: () => (dispatch) => {
    dispatch({ type: actions.FLUSHREALTEDUSERS })
  },

  deleteUser: (id) => (dispatch) => {
    dispatch({ type: actions.SET_AUTH_LOADING, payload: true })
    axios
      .delete(`${ROOT_URL}/api/user/${id}`)
      .then((res) => {
        dispatch({ type: actions.SET_AUTH_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('user deleted'));
        setTimeout(() => {
          dispatch(actions.getRelatedUsers());
        }, 2000);
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.SET_AUTH_LOADING, payload: false })
      });

  },
  login: (authData) => (dispatch) => {
    try {
      axios
        .post(`${ROOT_URL}/api/user/login`, authData)
        .then((res) => {
          //Save to localStorage
          const { token } = res.data;
          //Set token to localStorage
          localStorage.setItem('admin_token', token);
          //Set token to auth header
          Auth0Helper.setAuthTokenInHeader(token);
          //Decode Token to get user data
          const decoded = jwt_decode(token);
          //Set current user
          dispatch(actions.setCurrentUser(decoded));
        })
        .catch((err) => {
          dispatch({ type: actions.LOGIN_ERROR, payload: err?.response?.data?.error || 'Service Unavailable' });
        });
    } catch (err) {
      console.log('error_catched', err);
    }
  },
  setCurrentUser: (decoded) => {
    return { type: actions.LOGIN_SUCCESS, payload: decoded };
  },
  logout: () => (dispatch) => {
    //Delete token from header
    Auth0Helper.setAuthTokenInHeader(false);
    // Clear access token and ID token from local storage
    localStorage.removeItem('admin_token');
    history.push('/');
    dispatch({
      type: actions.LOGOUT,
    });
  },
};
export default actions;
