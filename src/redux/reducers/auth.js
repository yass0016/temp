import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, REGISTER_FAILED, FIRSTNAME_CHANGED, LASTNAME_CHANGED } from '../types/auth';

const defaultState = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  error: '',
  isLoggedIn: false,
  loading: false,
  user: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FIRSTNAME_CHANGED:
      return { ...state, firstname: action.firstname };
    case LASTNAME_CHANGED:
      return {
        ...state,
        lastname: action.lastname
      };
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.email
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.password
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        user: action.user
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: 'Failed to Login',
        password: '',
        user: {}
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: 'Failed to Register',
        password: '',
        user: {}
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
