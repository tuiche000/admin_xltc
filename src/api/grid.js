import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const gridList = (opt) => _GET(`api/oss/grid`, opt)
export const gridDel = (gridId) => _DELETE(`api/oss/grid/${gridId}`)
