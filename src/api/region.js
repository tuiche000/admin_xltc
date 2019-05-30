import { _GET, _POST } from '@/utils/fetch'
export const regionAll = (opt) => _GET('api/oss/region/all', opt)
export const regionFirstlevel = (opt) => _GET('api/oss/region/firstlevel', opt)
export const regionChildren = (regionId) => _GET(`api/oss/region/${regionId}/children`)
export const regionAdd = (opt, query) => _POST('api/oss/region', opt, query)
