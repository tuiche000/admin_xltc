import { _GET } from '@/utils/fetch'
export const noticeId = (id) => _GET(`api/oss/notice/${id}`)
export const noticeList = (opt) => _GET(`api/oss/notice/query`, opt)