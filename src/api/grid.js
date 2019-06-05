import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const gridList = (opt) => _GET(`api/oss/grid`, opt)
export const gridDel = (gridId) => _DELETE(`api/oss/grid/${gridId}`)
export const gridAdd = (opt) => _POST('api/oss/grid', opt)
export const gridPut = (opt) => _PUT(`api/oss/grid`, opt)
