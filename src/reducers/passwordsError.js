import * as actions from '../actions';

export default function passwordsError(state = null, action) {
  switch (action.type) {
    case actions.GET_PASSWORDS_REQUEST:
    case actions.SAVE_PASSWORD_REQUEST:
    case actions.DELETE_PASSWORD_REQUEST:
      return null;

    case actions.GET_PASSWORDS_FAILURE:
    case actions.SAVE_PASSWORD_FAILURE:
    case actions.DELETE_PASSWORD_FAILURE:
      return action.error

    default:
      return state;
  }
}
