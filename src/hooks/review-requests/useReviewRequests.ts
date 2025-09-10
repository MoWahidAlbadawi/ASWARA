import { useMutation, useQuery } from "react-query";
import api from "@/services/axios"
import {  APPROVE_REVIEWR_REQUEST, REJECT_REVIEWR_REQUESTS, REVIEWR_REQUESTS } from  "@/services/endpoints"
import type { ApiResponseGetReviewRequests } from "@/services/types/review-requests";

// get all Review Request
export const GetAllReviewRequests = () => {
    return useQuery('getAll-review-requests',() => {
        return api.get<ApiResponseGetReviewRequests>(`/${REVIEWR_REQUESTS}`).then(res => res.data.data);  
    })
}

// Approve Request
export const ApproveReviewRequest = (id : (number | string)) => {
    return useMutation(['approve-review-request',id],() => {
        return api.put(`/admin/${REVIEWR_REQUESTS}/${id}/${APPROVE_REVIEWR_REQUEST}`).then(res => res.data.data);
    })
}
// Reject Request
export const RejectReviewRequest = (id : (number | string)) => {
    return useMutation(['reject-review-request',id],() => {
        return api.put(`/admin/${REVIEWR_REQUESTS}/${id}/${REJECT_REVIEWR_REQUESTS}`).then(res => res.data.data);
    })
}
