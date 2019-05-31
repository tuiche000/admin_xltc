import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const userList = (opt) => _GET(`api/oss/user/@paged`, opt)