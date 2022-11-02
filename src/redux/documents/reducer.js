import actions from './actions';

const initState = { editRecord: null, documents: null, selectedDocument: null, error: null, selectedDocumentJson: null, needNewOtp: false, loading: false };

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_DOCS: {
      return { ...state, documents: action.payload };
    }
    case actions.SET_LOGGING_LOADING: {
      return { ...state, loading: action.payload };
    }
    case actions.SET_EDIT_RECORD: {
      return { ...state, editRecord: action.payload };
    }
    case actions.GET_DOCS_ERROR: {
      return { ...state, documents: [] };
    }

    case actions.GET_DOC_BY_ID: {
      return { ...state, selectedDocument: action.payload };
    }

    case actions.GET_DOC_BY_ID_ERROR: {
      return { ...state, error: action.error };
    }
    case actions.SOCKETS_UPDATE_DOC_STATUS: {
      const { documents, selectedDocument } = state;
      const { docId, status } = action.payload;
      let updatedDocs = null;
      if (documents) {
        updatedDocs = documents.map((doc) => {
          if (doc.internalId === docId) {
            doc.status = status;
            return doc;
          }
          return doc;
        });
      }
      if (selectedDocument) {
        if (selectedDocument.internalId === docId) {
          selectedDocument.status = status;
        }
      }
      return Object.assign({}, state, { ...state, documents: updatedDocs, selectedDocument });
    }

    case actions.UPDATE_DOC_STATUS: {
      const { docId, status } = action.payload;
      const updatedDocs = state.documents.map((doc) => {
        if (doc.internalId === docId) {
          doc.status = status;
          return doc;
        }
        return doc;
      });

      return { ...state, documents: updatedDocs };
    }

    case actions.GET_DOC_JSON: {
      return { ...state, selectedDocumentJson: action.payload };
    }
    case actions.FLUSH_DOC: {
      const res = state.editRecord
      return { ...initState, editRecord: res };
    }

    case actions.NEDD_NEW_OTP: {
      return {
        ...state, needNewOtp: action.payload
      }
    }

    default:
      return state;
  }
}
