import { _GET, _POST, _DELETE, _PUT } from '@/utils/fetch'
export const issueList = (opt, query) => _POST(`api/oss/issue/query`, opt, query)
export const issueId = (issueId) => _GET(`api/oss/issue/${issueId}`)
