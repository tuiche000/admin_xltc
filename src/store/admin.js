import { SET_LOGIN, LOGIN_OUT } from '../actions';

export default function (state = { login: false, token: {} }, action) {
  switch (action.type) {
    case SET_LOGIN:
      localStorage.setItem('login', true)
      localStorage.setItem('token', JSON.stringify(action.value))
      return { ...state, token: action.value, login: true }
    case LOGIN_OUT:
      localStorage.clear()
      return { login: false, token: {} };
    default:
      return state;
  }
}
