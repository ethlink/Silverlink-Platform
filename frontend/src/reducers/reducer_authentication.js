import {
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types';

export default function (state = { authenticated: false, user: null }, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state, authenticated: true, user: action.payload,
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null };
    default:
      return state;
  }
}
