import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const departmentFirstlevel = () => _GET(`api/oss/department/firstlevel`)
export const departmentId = (departmentId) => _GET(`api/oss/department/${departmentId}/children
`)
export const departmentDel = (departmentId) => _DELETE(`api/oss/department/${departmentId}`)
export const departmentAdd = (regionId, opt, query) => _POST(`api/oss/department/${regionId ? regionId : ''}`, opt, query)
export const departmentEdit = (regionId, opt, query) => _PUT(`api/oss/department/${regionId}`, opt, query)
