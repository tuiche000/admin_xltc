import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const regionFirstlevel = (opt) => _GET('api/oss/region/firstlevel', opt)
export const regionChildren = (regionId) => _GET(`api/oss/region/${regionId}/children`)
export const regionId = (regionId) => _GET(`api/oss/region/${regionId}`)
export const regionQuery = (opt) => _GET(`api/oss/region/query`, opt)
export const regionAll = (opt) => _GET('api/oss/region/all', opt)
export const regionAdd = (opt, query) => _POST('api/oss/region', opt, query)
export const regionDel = (regionId) => _DELETE(`api/oss/region/${regionId}`)
export const regionPut = (opt, query) => _PUT(`api/oss/region`, opt, query)
