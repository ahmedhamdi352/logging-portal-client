import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';
import projectActions from '../projects/actions';
const actions = {
  SET_TYPES_LOADING: 'SET_TYPES_LOADING',
  GET_TYPES_ERROR: 'GET_TYPES_ERROR',
  GET_TYPES: 'GET_TYPES',
  FLUSH_TYPES: 'FLUSH_TYPES',

  getTypes: () => (dispatch) => {
    dispatch({ type: actions.SET_TYPES_LOADING, payload: true })
    axios
      .get(`${ROOT_URL}/api/types`)
      .then((res) => {
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch({ type: actions.GET_TYPES, payload: res?.data });
      })
      .catch((err) => {
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch({ type: actions.GET_TYPES_ERROR });
      });
  },
  flushTypes: () => (dispatch) => {
    dispatch({ type: actions.FLUSH_TYPES });
  },

  createType: (data) => (dispatch) => {
    dispatch({ type: actions.SET_TYPES_LOADING, payload: true })
    axios
      .post(`${ROOT_URL}/api/types`, data)
      .then((res) => {
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('Project type added'));
        dispatch(actions.getTypes());
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch({ type: actions.GET_TYPES_ERROR });
      });
  },

  deleteType: (id) => async (dispatch, getState) => {
    const { projects } = getState()
    console.log(projects?.projects)
    dispatch({ type: actions.SET_TYPES_LOADING, payload: true })
    const deletedProjects = projects?.projects.filter(item => item.typeID === id)
    console.log(deletedProjects)
    if (deletedProjects.length !== 0) {
      await deletedProjects.map(item => dispatch(projectActions.deleteProject(item?.internalId)))
    }
    axios
      .delete(`${ROOT_URL}/api/types/${id}`)
      .then((res) => {
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch(toaster.triggerSuccess('Project type deleted'));
        dispatch(actions.getTypes());
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
        dispatch({ type: actions.SET_TYPES_LOADING, payload: false })
        dispatch({ type: actions.GET_TYPES_ERROR });
      });
  },

  editType: (id, values) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/types/${id}`, values)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Project type updated'));
        dispatch(actions.getTypes())
      })
      .catch((err) => {
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },

};
export default actions;
