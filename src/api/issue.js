import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const issueList = (opt) => _GET(`api/oss/issue/query`, opt)
export const issueId = (issueId) => _GET(`api/oss/issue/${issueId}`)
