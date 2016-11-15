import { Clipboard } from 'react-native';
import { getPassword } from './getPassword';

export const COPY_PASSWORD_REQUEST = 'COPY_PASSWORD_REQUEST';
export const COPY_PASSWORD_SUCCESS = 'COPY_PASSWORD_SUCCESS';

function copyPasswordRequest(passwordId) {
  return {
    type: COPY_PASSWORD_REQUEST,
    passwordId
  };
}

function copyPasswordSuccess(passwordId) {
  return {
    type: COPY_PASSWORD_SUCCESS,
    passwordId
  };
}

export function copyPassword(passwordId) {
  return dispatch => {
    dispatch(copyPasswordRequest(passwordId));

    return dispatch(getPassword(passwordId)).then((password) => {
      Clipboard.setString(password.password);
      dispatch(copyPasswordSuccess(passwordId));
    });
  };
}
