import actions from './actions';

const initState = {
  users: null,
  updateUser: {
    loading: false,
    data: {},
    error: {},
  },
};
// function getActionName(actionType) {
//   if (typeof actionType !== 'string') {
//     return null;
//   }

//   return actionType
//     .split('_')
//     .slice(0, -1)
//     .join('_');
// }

export default function settingReducer(state = initState, action) {
  // const actionName = getActionName(type);
  // if (type.endsWith('_REQUEST')) {
  //   console.log('ENDS_WITH_REQUEST');
  //   return { ...state, [actionName]: { loading: true } };
  // }

  // if (type.endsWith('_SUCCESS') || type.endsWith('_FAILURE')) {
  //   console.log('ENDS_WITH_SUCCESS_OR_FAILER');
  //   return { ...state, [actionName]: { loading: false, ...payload } };
  // }

  switch (action.type) {
    case actions.GET_SETTING: {
      return { ...state, [action.payload.name]: action.payload };
    }

    case actions.UPDATE_SETTING: {
      return { ...state, [action.payload.name]: action.payload };
    }

    case actions.GET_ALL_USERS: {
      return { ...state, users: action.payload };
    }

    case actions.CREATE_USER: {
      return { ...state, users: [...state.users, action.payload] };
    }
    case actions.UPDATE_USER_REQUEST: {
      return { ...state, updateUser: { loading: true } };
    }
    case actions.UPDATE_USER_SUCCESS: {
      const users = state.users.map((user) => {
        if (user.internalId === action.payload.internalId) return action.payload;
        return user;
      });
      return { ...state, users, updateUser: { loading: false, data: action.payload } };
    }
    case actions.UPDATE_USER_FAILURE: {
      return { ...state, updateUser: { loading: false, error: action.payload } };
    }

    default:
      return state;
  }
}
