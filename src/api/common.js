import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const commonEnum = (name) => _GET(`api/oss/common/enum/${name}`)
