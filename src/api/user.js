import { _GET, _POST, _DELETE, _PUT } from "@/utils/fetch";
export const userSelf = () => _GET("api/oss/user/self");
export const userDetail = (username) => _GET(`api/oss/user/${username}`);
export const userList = (opt) => _GET("api/oss/user/query", opt);
export const userAdd = (opt) => _POST("api/oss/user", opt);
export const userDel = (username) => _DELETE(`api/oss/user/${username}`);
export const userPut = (opt) => _PUT("api/oss/user", opt);