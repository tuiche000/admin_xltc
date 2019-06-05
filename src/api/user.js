import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const userList = (opt) => _GET(`api/oss/user/@paged`, opt)
export const userAdd = (opt) => _POST(`api/oss/user`, opt)
export const userDel = (username) => _DELETE(`api/oss/user/${username}`)
export const userPut = (opt, username) => _PUT(`api/oss/user/${username}`, opt)