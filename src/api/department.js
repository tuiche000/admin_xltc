import { _GET, _POST } from '@/utils/fetch'
export const departmentFirstlevel = () => _GET(`api/oss/department/firstlevel`)
export const departmentId = (departmentId) => _GET(`api/oss/department/${departmentId}`)
