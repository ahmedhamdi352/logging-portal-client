import axios from 'axios';
import toaster from '../toaster/actions';

import { ROOT_URL } from '../keys';

const actions = {
  //get Subscribers
  GET_SUBSCRIBERS: 'GET_SUBSCRIBERS',
  GET_SUBSCRIBERS_ERROR: 'GET_SUBSCRIBERS_ERROR',
  //add Subscribers
  ADD_SUBSCRIBER: 'ADD_SUBSCRIBER',
  ADD_SUBSCRIBER_ERROR: 'ADD_SUBSCRIBER_ERROR',
  //delete Subscribers
  DELETE_SUBSCRIBER: 'DELETE_SUBSCRIBER',
  DELETE_SUBSCRIBER_ERROR: 'DELETE_SUBSCRIBER_ERROR',

  getSubscribers: () => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/notification/subs`)
      .then((res) => {
        dispatch({ type: actions.GET_SUBSCRIBERS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_SUBSCRIBERS_ERROR });
      });
  },

  addSubscriber: (values) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/notification/subs`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('E-mail added successfully'));
        dispatch({ type: actions.ADD_SUBSCRIBER, payload: res.data });
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.message;
        let errorDetails = err.response?.data?.error?.details;
        dispatch(toaster.triggerError(errorMsg, errorDetails));
        dispatch({ type: actions.ADD_SUBSCRIBER_ERROR });
      });
  },

  deleteSubscriber: (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${ROOT_URL}/api/notification/subs/${id}`)
        .then((res) => {
          resolve();
          dispatch(toaster.triggerSuccess('E-mail deleted successfully'));
          dispatch({ type: actions.DELETE_SUBSCRIBER, payload: res.data });
        })
        .catch((err) => {
          reject();
          let errorMsg = err.response?.data?.message;
          dispatch(toaster.triggerError(errorMsg));
          dispatch({ type: actions.DELETE_SUBSCRIBER_ERROR });
        });
    });
  },
};
export default actions;
