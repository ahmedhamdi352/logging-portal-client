import axios from 'axios';
import toaster from '../toaster/actions';
import { ROOT_URL } from '../keys';
import { sortBy, reverse } from 'lodash';
import moment from 'moment';
const actions = {
  // Get documents
  GET_DOCS: 'GET_DOCS',
  GET_DOCS_ERROR: 'GET_DOCS_ERROR',
  // Submit Docs
  SUBMIT_DOCS: 'SUBMIT_DOCS',
  SUBMIT_DOCS_ERROR: 'SUBMIT_DOCS_ERROR',
  // Get document by id
  GET_DOC_BY_ID: 'GET_DOC_BY_ID',
  GET_DOC_BY_ID_ERROR: 'GET_DOC_BY_ID_ERROR',
  // flush selected document
  FLUSH_DOC: 'FLUSH_DOC',
  // update document status
  SOCKETS_UPDATE_DOC_STATUS: 'SOCKETS_UPDATE_DOC_STATUS',

  // update doc status
  UPDATE_DOC_STATUS: 'UPDATE_DOC_STATUS',
  UPDATE_DOC_STATUS_ERROR: 'UPDATE_DOC_STATUS_ERROR',

  // update doc status
  GET_DOC_JSON: 'GET_DOC_JSON',
  GET_DOC_JSON_ERROR: 'GET_DOC_JSON_ERROR',

  NEDD_NEW_OTP: 'NEDD_NEW_OTP',
  SET_LOGGING_LOADING: 'SET_LOGGING_LOADING',
  SET_EDIT_RECORD: 'SET_EDIT_RECORD',

  getDocuments: () => (dispatch) => {
    dispatch({ type: actions.SET_LOGGING_LOADING, payload: true })
    axios
      .get(`${ROOT_URL}/api/logs`)
      .then((res) => {
        console.log(sortBy(res?.data, (item) => moment(item.date)))
        dispatch({ type: actions.SET_LOGGING_LOADING, payload: false })
        dispatch({ type: actions.GET_DOCS, payload: reverse(sortBy(res?.data, (item) => moment(item.date))) });
      })
      .catch((err) => {
        dispatch({ type: actions.SET_LOGGING_LOADING, payload: false })
        dispatch({ type: actions.GET_DOCS_ERROR });
      });
  },
  setEditRecord: (data) => (dispatch) => {
    dispatch({ type: actions.SET_EDIT_RECORD, payload: data })
  },
  submitslogs: (data) => (dispatch) => {
    dispatch({ type: actions.SET_LOGGING_LOADING, payload: true })
    axios
      .post(`${ROOT_URL}/api/logs/logs`, { 'res': data })
      .then((res) => {
        dispatch(toaster.triggerSuccess('Your Logs uploaded successfully'));
        dispatch(actions.getDocuments())
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOCS_ERROR });
      });
  },
  deletLog: (id) => (dispatch) => {
    dispatch({ type: actions.SET_LOGGING_LOADING, payload: true })
    axios
      .delete(`${ROOT_URL}/api/logs/logs/${id}`)
      .then((res) => {
        dispatch(toaster.triggerSuccess('Log deleted successfully'));
        setTimeout(() => {
          dispatch(actions.getDocuments())
        }, 2000);
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOCS_ERROR });
        let errorMsg = err.response?.data?.error;
        dispatch(toaster.triggerError(errorMsg));
      });
  },
  getDocumentById: (documentId) => (dispatch) => {
    axios
      .get(`${ROOT_URL}/api/docs/${documentId}`)
      .then((res) => {
        dispatch({ type: actions.GET_DOC_BY_ID, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOC_BY_ID_ERROR, error: err.response?.data?.error });
      });
  },
  flushDocument: () => (dispatch) => {
    dispatch({ type: actions.FLUSH_DOC });
  },
  changeOtpStatus: (flag) => (dispatch) => {
    dispatch({ type: actions.NEDD_NEW_OTP, payload: flag });
  },
  submitDocuments: (issuerId) => (dispatch) => {
    axios.post(`${ROOT_URL}/api/docs/checkCsr`, { issuerId })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        dispatch(toaster.triggerError(err.response?.data?.error));
        dispatch({ type: actions.NEDD_NEW_OTP, payload: true });
      })
  },
  updateDocumentStatus: (docId, status) => (dispatch) => {
    axios
      .put(`${ROOT_URL}/api/docs`, { docId, status })
      .then((res) => {
        dispatch({ type: actions.UPDATE_DOC_STATUS, payload: { docId, status } });
        dispatch(toaster.triggerSuccess('Status changed.'));
      })
      .catch((err) => {
        dispatch({ type: actions.UPDATE_DOC_STATUS_ERROR });
        dispatch(toaster.triggerError());
      });
  },
  getDocumentJson: (docsIds) => (dispatch) => {
    axios
      .post(`${ROOT_URL}/api/docs/test/`, { docsIds: [Number('258211')] })
      .then((res) => {
        console.log(res)
        dispatch({ type: actions.GET_DOC_JSON, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.GET_DOC_JSON_ERROR });
      });
  },
  sendOtp: (data) => (dispatch) => {
    console.log(data)
    axios
      .post(`${ROOT_URL}/api/docs/complianceCSID`, data)
      .then((res) => {
        dispatch(toaster.triggerSuccess('New Otp saved'));
      })
      .catch((err) => {
        dispatch(toaster.triggerError(err.response?.data?.error));
      });
  }
};
export default actions;
