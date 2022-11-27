import { getApi, patchApi, postApi } from "./api_call"


export const reviewerLogin = async (email, password) => {
    return await postApi({url:'reviewer-login', data:{email, password}})
}

export const reviewerSignup = async (fullname, email, password, mobile, address)=>{
    return await postApi({url:'reviewer-signup', data:{fullname, email, password, mobile, address}})
}

export const fetchApplications = async () => {
    return await getApi({url:'/reviewer/fetch-applications'})
}
export const reviewApplication = async (applicationId) => {
    return await patchApi({url:'/reviewer/review-application', data:{applicationId}})
}