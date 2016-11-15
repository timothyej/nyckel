import Keychain from 'react-native-keychain';
import uuid from 'uuid';
import { storePasswords } from './storePasswords';

export const SAVE_PASSWORD_REQUEST = 'SAVE_PASSWORD_REQUEST';
export const SAVE_PASSWORD_SUCCESS = 'SAVE_PASSWORD_SUCCESS';
export const SAVE_PASSWORD_FAILURE = 'SAVE_PASSWORD_FAILURE';

function savePasswordRequest(password) {
  return {
    type: SAVE_PASSWORD_REQUEST,
    password
  };
}

function savePasswordSuccess(password) {
  return {
    type: SAVE_PASSWORD_SUCCESS,
    password
  };
}

function savePasswordFailure(password, error) {
  return {
    type: SAVE_PASSWORD_FAILURE,
    password,
    error
  };
}

export function savePassword(password) {
  return dispatch => {
    dispatch(savePasswordRequest(password));

    password.id = password.id || uuid.v1();

    return Keychain.setGenericPassword(password.username, password.password, password.id)
      .then(() => {
        dispatch(savePasswordSuccess(password));
        return password;
      }).catch((error) => {
        dispatch(savePasswordFailure(password, error));
        throw error;
      }).then(() => {
        return dispatch(storePasswords());
      });
  };
}
