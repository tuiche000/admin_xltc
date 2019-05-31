export const SET_LOGIN='set_login';
export const SET_LOADING='set_loading';

export function setLogin(succ){
  return {
    type: SET_LOGIN,
    value: succ
  };
}
export function setLoading(boolean){
  return {
    type: SET_LOADING,
    value: boolean
  };
}
