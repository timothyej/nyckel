import * as actions from '../actions';
import passwordsError from './passwordsError';
import passwordsItems from './passwordsItems';

export default function passwords(state = {}, action) {
  switch (action.type) {
    case actions.GET_PASSWORDS_REQUEST:
    case actions.GET_PASSWORDS_SUCCESS:
    case actions.GET_PASSWORDS_FAILURE:

    case actions.SAVE_PASSWORD_REQUEST:
    case actions.SAVE_PASSWORD_SUCCESS:
    case actions.SAVE_PASSWORD_FAILURE:

    case actions.DELETE_PASSWORD_REQUEST:
    case actions.DELETE_PASSWORD_SUCCESS:
    case actions.DELETE_PASSWORD_FAILURE:
      return {
        ...state,
        error: passwordsError(state.error, action),
        items: passwordsItems(state.items, action)
      };

    default:
      return state;
  }
}
