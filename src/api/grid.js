import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const gridFilter = () => _GET(`api/oss/grid/filter`)
export const gridList = (opt) => _GET(`api/oss/grid/query`, opt)
export const gridId = (gridId) => _GET(`api/oss/grid/${gridId}`)
export const gridDel = (gridId) => _DELETE(`api/oss/grid/${gridId}`)
export const gridAdd = (opt) => _POST('api/oss/grid', opt)
export const gridPut = (opt) => _PUT(`api/oss/grid`, opt)
