import {
  commonEnum,
} from "./common";
import {
  regionAll, regionFirstlevel, regionChildren, regionAdd, regionDel, regionPut, regionId, regionQuery,
} from "./region";
import {
  departmentFirstlevel, departmentId, departmentDel, departmentAdd, departmentEdit, departmentAll,
} from "./department";
import {
  gridList, gridDel, gridAdd, gridPut, gridId, gridFilter,
} from "./grid";
import {
  userList, userAdd, userDel, userPut, userSelf, userDetail, userPass, userLogout,
} from "./user";
import {
  roleList, roleAdd, roleDel, rolePut, roleId,
} from "./role";
import {
  noticeList, noticeId,
} from "./notice";
import {
  issueList, issueId,
} from "./issue";
import {
  feedbackList, feedbackId,
} from "./feedback";
import {
  tachaList, tachaId, tachaExport,
} from "./tacha";
import {
  questions_type,
} from "./web";

export default {
  commonEnum,
  regionAll, regionFirstlevel, regionChildren, regionAdd, regionDel, regionPut, regionId, regionQuery,
  departmentFirstlevel, departmentId, departmentDel, departmentAdd, departmentEdit, departmentAll,
  gridList, gridDel, gridAdd, gridPut, gridId, gridFilter,
  userList, userAdd, userDel, userPut, userSelf, userDetail, userPass, userLogout,
  roleList, roleAdd, roleDel, rolePut, roleId,
  noticeList, noticeId,
  issueList, issueId,
  feedbackList, feedbackId,
  tachaList, tachaId, tachaExport,
  questions_type,
};