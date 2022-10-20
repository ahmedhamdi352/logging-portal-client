import actions from './actions';

const initState = { notificationSubs: null };

export default function settingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_SUBSCRIBERS: {
      return { ...state, notificationSubs: action.payload };
    }

    case actions.ADD_SUBSCRIBER: {
      return { ...state, notificationSubs: [action.payload, ...state.notificationSubs] };
    }

    case actions.DELETE_SUBSCRIBER: {
      const updatedList = state.notificationSubs.filter((sub) => sub.internalId !== action.payload.internalId);
      return { ...state, notificationSubs: updatedList };
    }

    default:
      return state;
  }
}
