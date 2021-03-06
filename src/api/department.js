import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const departmentFirstlevel = () => _GET(`api/oss/department/firstlevel`)
export const departmentId = (departmentId) => _GET(`api/oss/department/${departmentId}/children
`)
export const departmentAll = () => _GET(`api/oss/department/all`)
export const departmentDel = (departmentId) => _DELETE(`api/oss/department/${departmentId}`)
export const departmentAdd = (opt, query) => _POST(`api/oss/department`, opt, query)
export const departmentEdit = (opt, query) => _PUT(`api/oss/department`, opt, query)
