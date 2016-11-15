import Keychain from 'react-native-keychain';

export const GET_PASSWORD_REQUEST = 'GET_PASSWORD_REQUEST';
export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS';
export const GET_PASSWORD_FAILURE = 'GET_PASSWORD_FAILURE';

function getPasswordRequest(passwordId) {
  return {
    type: GET_PASSWORD_REQUEST,
    passwordId
  };
}

function getPasswordSuccess(password) {
  return {
    type: GET_PASSWORD_SUCCESS,
    password
  };
}

function getPasswordFailure(passwordId, error) {
  return {
    type: GET_PASSWORD_FAILURE,
    passwordId,
    error
  };
}

export function getPassword(passwordId) {
  return dispatch => {
    dispatch(getPasswordRequest(passwordId));

    return Keychain.getGenericPassword(passwordId)
      .then((password) => {
        dispatch(getPasswordSuccess(password));
        return password;
      }).catch((error) => {
        dispatch(getPasswordFailure(passwordId, error));
        throw error;
      });
  };
}
