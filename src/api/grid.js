import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const gridList = (opt) => _GET(`api/oss/grid`, opt)