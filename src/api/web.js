import { _GET, _POST, _DELETE, _PUT } from "@/utils/fetch";
export const questions_type = (type) => _GET(`api/cms/web/questions/type/${type}`);