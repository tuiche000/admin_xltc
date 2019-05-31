import { SET_LOADING } from '../actions';

export default function (state = { loading: false }, action) {
  switch (action.type) {
    case SET_LOADING:
    default:
      return { ...state };
  }
}
