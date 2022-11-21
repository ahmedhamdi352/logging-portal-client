import actions from './actions';

const initState = { loading: false, projectTypes: null };

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_TYPES: {
      return { ...state, projectTypes: action.payload };
    }
    case actions.SET_TYPES_LOADING: {
      return { ...state, loading: action.payload };
    }
    case actions.FLUSH_TYPES: {
      return { ...state, projectTypes: null };
    }
    case actions.GET_TYPES_ERROR: {
      return { ...state, projectTypes: [] };
    }
    default:
      return state;
  }
}
