import actions from './actions';
import { isEmpty } from '../../helpers/utility';
import Auth0Helper from '../../helpers/auth0/index';
import jwt_decode from 'jwt-decode';

const initState = { isAuthenticated: false, user: {}, errorMessage: null, relatedUsers: null, mangers: null }; //idToken: null,

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: !isEmpty(action.payload), user: action.payload, errorMessage: null };
    case actions.CHECK_AUTHORIZATION:
      const admin_token = localStorage.getItem('admin_token');
      if (admin_token) {
        const isTokenExpired = Auth0Helper.isAuthenticated();
        if (isTokenExpired) {
          //Delete local Storage
          Auth0Helper.logout();
          return initState;
        } else {
          const decoded = jwt_decode(admin_token);
          return {
            ...state,
            isAuthenticated: true,
            user: decoded,
          };
        }
      } else {
        return initState;
      }

    case actions.LOGOUT:
      return initState;

    case actions.GET_RELATED_USERS:
      return { ...state, relatedUsers: action.payload }

    case actions.FLUSHREALTEDUSERS:
      return { ...state, relatedUsers: null }

    case actions.GET_MANGERS:
      return { ...state, mangers: action.payload }

    case actions.LOGIN_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
