import { _GET, _POST, _DELETE, _PUT } from "@/utils/fetch";
export const feedbackList = (query) => _GET("api/oss/feedback/query", query);
export const feedbackId = (id) => _GET(`api/oss/feedback/${id}`);
