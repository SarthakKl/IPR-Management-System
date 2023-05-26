import { getApi, postApi } from "./api_call"


export const adminLogin = async (email, password) => {
    return await postApi({url:'admin-login', data:{email, password}})
}

export const adminSignup = async (fullname, email, password, mobile, address)=>{
    return await postApi({url:'admin-signup', data:{fullname, email, password, mobile, address}})
}
export const fetchAllApplications = async () => {
    return await getApi({url:'/admin/fetch-all-applications'})
}
export const fetchReviewerSignups = async () => {
    return await getApi({url:'/admin/fetch-reviewer-signups'})
}
export const fetchQueries = async () => {
    return await getApi({url:'/admin/fetch-queries'})
}
export const rejectReviewerSignup = async (data) => {
    return await postApi({url:'/admin/reject-reviewer-signup', data})
}
export const approveReviewerSignup = async (reviewerId) => {
    return await postApi({url:'/admin/approve-reviewer-signup', data:{reviewerId}})
}
export const getClientDetails = async (params) => {
    return await getApi({url:'/admin/get-client-details', params})
}