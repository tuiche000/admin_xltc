import { _GET } from '@/utils/fetch'
export const regionAll = (opt) => _GET('api/oss/region/all', opt)
export const regionFirstlevel = (opt) => _GET('api/oss/region/firstlevel', opt)
export const regionChildren = (regionId) => _GET(`api/oss/region/${regionId}/children`)
