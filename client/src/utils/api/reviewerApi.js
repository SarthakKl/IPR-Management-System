import { getApi, patchApi, postApi } from "./api_call"


export const reviewerLogin = async (email, password) => {
    return await postApi({url:'reviewer-login', data:{email, password}})
}

export const reviewerSignup = async (fullname, email, password, mobile, address)=>{
    return await postApi({url:'reviewer-signup', data:{fullname, email, password, mobile, address}})
}
export const getClientDetails = async ({clientId}) => {
    return await getApi({url:'/reviewer/client-details', params:{clientId}})
}
export const fetchApplications = async () => {
    return await getApi({url:'/reviewer/fetch-applications'})
}
export const fetchAllApplications = async () => {
    return await getApi({url:'/reviewer/fetch-all-applications'})
}
export const reviewApplication = async (data) => {
    return await patchApi({url:'/reviewer/review-application', data:data})
}
export const completeReview = async (applicationId, status) => {
    return await patchApi({url:'/reviewer/complete-review', data:{applicationId, status}})
}