import Keychain from 'react-native-keychain';

export const GET_PASSWORDS_REQUEST = 'GET_PASSWORDS_REQUEST';
export const GET_PASSWORDS_SUCCESS = 'GET_PASSWORDS_SUCCESS';
export const GET_PASSWORDS_FAILURE = 'GET_PASSWORDS_FAILURE';

function getPasswordsRequest() {
  return {
    type: GET_PASSWORDS_REQUEST
  };
}

function getPasswordsSuccess(passwords) {
  return {
    type: GET_PASSWORDS_SUCCESS,
    passwords
  };
}

function getPasswordsFailure(error) {
  return {
    type: GET_PASSWORDS_FAILURE,
    error
  };
}

export function getPasswords() {
  return dispatch => {
    dispatch(getPasswordsRequest());

    return Keychain.getGenericPassword('nycklar')
      .then((credentials) => {
        var passwords = JSON.parse(credentials.password);
        dispatch(getPasswordsSuccess(passwords));
        return passwords;
      }).catch((error) => {
        dispatch(getPasswordsFailure(error));
        throw error;
      });
  };
}
