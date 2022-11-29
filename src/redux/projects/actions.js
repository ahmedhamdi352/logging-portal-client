import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';

const actions = {
  SET_PROJECTS_LOADING: 'SET_PROJECTS_LOADING',
  GET_PROJECTS_ERROR: 'GET_PROJECTS_ERROR',
  GET_PROJECTS: 'GET_PROJECTS',
  FLUSH_PROJECTS: 'FLUSH_PROJECTS',

  getProjects: () => (dispatch) => {
    dispatch({ type: actions.SET_PROJECTS_LOADING, payload: true })
    axios
      .get(`${ROOT_URL}/api/project`)
      .then((res) => {
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        const result = res?.data.map(item => (
          {
            ...item,
            type: item?.type?.name,
            typeID: item?.type?.internalId,
            color: item?.type?.color
          }
        ))
        dispatch({ type: actions.GET_PROJECTS, payload: result });
      })
      .catch((err) => {
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        dispatch({ type: actions.GET_PROJECTS_ERROR });
      });
  },
  flushProjects: () => (dispatch) => {
    dispatch({ type: actions.FLUSH_PROJECTS });
  },

  createProject: (data) => (dispatch) => {
    dispatch({ type: actions.SET_PROJECTS_LOADING, payload: true })
    axios
      .post(`${ROOT_URL}/api/project`, data)
      .then((res) => {
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('Project added'));
        dispatch(actions.getProjects());
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        dispatch({ type: actions.GET_PROJECTS_ERROR });
      });
  },

  deleteProject: (id) => (dispatch) => {
    dispatch({ type: actions.SET_PROJECTS_LOADING, payload: true })
    axios
      .delete(`${ROOT_URL}/api/project/${id}`)
      .then((res) => {
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('Project deleted'));
        dispatch(actions.getProjects());
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.SET_PROJECTS_LOADING, payload: false })
        dispatch({ type: actions.GET_PROJECTS_ERROR });
      });
  },

  editProject: (id, values) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/project/${id}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Project  updated'));
        dispatch(actions.getProjects())
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },

  addAllocation: (data) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/allocation`, data)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Allocation added'));
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },

};
export default actions;
