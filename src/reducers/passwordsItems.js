import * as actions from '../actions';

export default function passwordsItems(state = {}, action) {
  switch (action.type) {
    case actions.GET_PASSWORDS_SUCCESS:
      return action.passwords;

    case actions.SAVE_PASSWORD_SUCCESS:
      var password = { ...action.password };
      delete password['password'];

      return {
        ...state,
        [action.password.id]: password
      };

    case actions.DELETE_PASSWORD_SUCCESS:
      var nextState = { ...state };
      delete nextState[action.passwordId];
      return nextState;

    default:
      return state;
  }
}
