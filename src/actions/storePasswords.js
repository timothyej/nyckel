import Keychain from 'react-native-keychain';

export const STORE_PASSWORDS_REQUEST = 'STORE_PASSWORDS_REQUEST';
export const STORE_PASSWORDS_SUCCESS = 'STORE_PASSWORDS_SUCCESS';
export const STORE_PASSWORDS_FAILURE = 'STORE_PASSWORDS_FAILURE';

function storePasswordsRequest() {
  return {
    type: STORE_PASSWORDS_REQUEST
  };
}

function storePasswordsSuccess() {
  return {
    type: STORE_PASSWORDS_SUCCESS
  };
}

function storePasswordsFailure(error) {
  return {
    type: STORE_PASSWORDS_FAILURE,
    error
  };
}

export function storePasswords() {
  return (dispatch, getState) => {
    dispatch(storePasswordsRequest());

    var passwords = getState().passwords.items;
    var serialized = JSON.stringify(passwords);

    return Keychain.setGenericPassword('index', serialized, 'nycklar')
      .then(() => {
        dispatch(storePasswordsSuccess());
      }).catch((error) => {
        dispatch(storePasswordsFailure(error));
        throw error;
      });
  };
}
