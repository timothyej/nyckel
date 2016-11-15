import Keychain from 'react-native-keychain';
import { storePasswords } from './storePasswords';

export const DELETE_PASSWORD_REQUEST = 'DELETE_PASSWORD_REQUEST';
export const DELETE_PASSWORD_SUCCESS = 'DELETE_PASSWORD_SUCCESS';
export const DELETE_PASSWORD_FAILURE = 'DELETE_PASSWORD_FAILURE';

function deletePasswordRequest(passwordId) {
  return {
    type: DELETE_PASSWORD_REQUEST,
    passwordId
  };
}

function deletePasswordSuccess(passwordId) {
  return {
    type: DELETE_PASSWORD_SUCCESS,
    passwordId
  };
}

function deletePasswordFailure(passwordId, error) {
  return {
    type: DELETE_PASSWORD_FAILURE,
    passwordId,
    error
  };
}

export function deletePassword(passwordId) {
  return dispatch => {
    dispatch(deletePasswordRequest(passwordId));

    return Keychain.resetGenericPassword(passwordId)
      .then(() => {
        dispatch(deletePasswordSuccess(passwordId));
      }).catch((error) => {
        dispatch(deletePasswordFailure(passwordId, error));
        throw error;
      }).then(() => {
        return dispatch(storePasswords());
      });
  };
}
