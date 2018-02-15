import featherService from '../../services/feathers';
import { FIRSTNAME_CHANGED, EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, REGISTER, REGISTER_FAILED, LASTNAME_CHANGED } from '../types/auth';

export const firstNameChanged = (firstname) => {
  return {
    type: FIRSTNAME_CHANGED,
    firstname
  };
};

export const lastNameChanged = (lastname) => {
  return {
    type: LASTNAME_CHANGED,
    lastname
  };
};

export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    email
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    password
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    featherService.login(email, password).then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        user
      });
    }).catch(error => {
      console.log(error);
      dispatch({
        type: LOGIN_FAILED,
        error: error.message
      });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    featherService.logout().then(result => {
      dispatch({
        type: LOGOUT,
        payload: ''
      });
    });
  };
};

export const signup = ({ firstname, lastname, email, password }) => {
  return (dispatch) => {
    featherService.createAccount(firstname, lastname, email, password).
      then(result => {
        featherService.login(email, password).then(user => {
          dispatch({
            type: LOGIN_SUCCESS,
            user
          });
        }).catch(error => {
          dispatch({
            type: LOGIN_FAILED,
            error: error.message
          });
        });
      }).catch(error => {
        console.log(error.message);
        dispatch({
          type: REGISTER_FAILED,
          error: error.message
        });
      });
  };
};
