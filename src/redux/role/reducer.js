import actions from './actions';

const initState = { roles: null, permissions: null };

export default function settingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ROLES: {
      return { ...state, roles: action.payload };
    }
    case actions.GET_ROLES_PERMISSIONS: {
      return { ...state, permissions: action.payload };
    }

    case actions.CREATE_ROLE: {
      return { ...state, roles: [...state.roles, action.payload] };
    }

    case actions.DELETE_ROLE: {
      const updatedList = state.roles.filter((r) => r.internalId !== action.payload.internalId);
      return { ...state, roles: updatedList };
    }

    case actions.UPDATE_ROLE: {
      const updatedList = state.roles.map((role) => {
        if (role.internalId === action.payload.internalId) {
          return action.payload;
        }
        return role;
      });
      return { ...state, roles: updatedList };
    }

    default:
      return state;
  }
}
