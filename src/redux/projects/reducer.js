import actions from './actions';

const initState = { loading: false, projects: null };

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_PROJECTS: {
      return { ...state, projects: action.payload };
    }
    case actions.SET_PROJECTS_LOADING: {
      return { ...state, loading: action.payload };
    }
    case actions.FLUSH_PROJECTS: {
      return { ...state, projectTypes: null };
    }
    case actions.GET_PROJECTS_ERROR: {
      return { ...state, projectTypes: [] };
    }
    default:
      return state;
  }
}
