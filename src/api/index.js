import {
  commonEnum,
} from './common'
import {
  regionAll, regionFirstlevel, regionChildren, regionAdd, regionDel, regionPut, regionId,
} from './region'
import {
  departmentFirstlevel, departmentId, departmentDel, departmentAdd, departmentEdit, departmentAll,
} from './department'
import {
  gridList, gridDel, gridAdd, gridPut, gridId, gridFilter,
} from './grid'
import {
  userList, userAdd, userDel, userPut, userSelf,
} from './user'
import {
  issueList, issueId,
} from './issue'
import {
  tachaList, tachaId, tachaExport,
} from './tacha'

export default {
  commonEnum,
  regionAll, regionFirstlevel, regionChildren, regionAdd, regionDel, regionPut, regionId,
  departmentFirstlevel, departmentId, departmentDel, departmentAdd, departmentEdit, departmentAll,
  gridList, gridDel, gridAdd, gridPut, gridId, gridFilter,
  userList, userAdd, userDel, userPut, userSelf,
  issueList, issueId,
  tachaList, tachaId, tachaExport,
}