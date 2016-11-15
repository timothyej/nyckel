import { combineReducers } from 'redux';
import passwords from './passwords';
import * as actions from '../actions';

function showCopyNotice(state = false, action) {
  if (action.type === actions.SHOW_COPY_NOTICE) {
    return action.show;
  }

  return state;
}

function showPassword(state = null, action) {
  if (action.type === actions.SHOW_PASSWORD) {
    return action.password;
  }

  return state;
}

function inSearchMode(state = false, action) {
  switch (action.type) {
    case actions.ENTER_SEARCH_MODE:
      return true;

    case actions.EXIT_SEARCH_MODE:
      return false;

    default:
      return state;
  }
}

function searchTerm(state = '', action) {
  switch (action.type) {
    case actions.SET_SEARCH_TERM:
      return action.term;

    case actions.EXIT_SEARCH_MODE:
      return '';

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  passwords,
  showCopyNotice,
  showPassword,
  inSearchMode,
  searchTerm
});

export default rootReducer;
