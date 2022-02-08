import { SET_USER } from "./types";
import { userAPI } from "../resources/users";

export const fetchUser = () => (dispatch) =>
  userAPI.me().then((user) => {
    return setUser(user)(dispatch);
  });

export const setUser = (user) => (dispatch) =>
  dispatch({
    type: SET_USER,
    payload: user,
  });
