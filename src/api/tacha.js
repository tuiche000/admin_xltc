import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const tachaList = (opt, query) => _POST(`api/oss/route/query`, opt, query)
export const tachaId = (routeId) => _GET(`api/oss/route/${routeId}`)
