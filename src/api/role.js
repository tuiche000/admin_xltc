import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const roleId = (id) => _GET(`api/oss/role/${id}`)
export const roleList = (opt) => _GET(`api/oss/role/query`, opt)
export const roleAdd = (opt) => _POST(`api/oss/role`, opt)
export const roleDel = (id) => _DELETE(`api/oss/role/${id}`)
export const rolePut = (opt) => _PUT(`api/oss/role`, opt)