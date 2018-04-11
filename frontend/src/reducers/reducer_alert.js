import { PASS_ALERT, RESET_ALERT } from '../actions/types';

export default (state = { message: '', type: '' }, action) => {
  switch (action.type) {
    case PASS_ALERT:
      return action.payload;
    case RESET_ALERT:
      return { message: '', type: '' };
    default:
      return state;
  }
};
