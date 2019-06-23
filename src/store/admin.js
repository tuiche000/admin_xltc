import { SET_LOGIN, LOGIN_OUT, USER_INFO } from '../actions';

export default function (state = { login: false, token: {}, user_info: {} }, action) {
  switch (action.type) {
    case SET_LOGIN:
      sessionStorage.setItem('login', true)
      sessionStorage.setItem('token', JSON.stringify(action.value))
      return { ...state, token: action.value, login: true }
    case LOGIN_OUT:
      sessionStorage.clear()
      window.location.href = '/'
      return { login: false, token: {} };
    case USER_INFO:
      sessionStorage.setItem(USER_INFO, JSON.stringify(action.value))
      return { ...state, user_info: action.value };
    default:
      return state;
  }
}
