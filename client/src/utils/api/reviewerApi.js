import { postApi } from "./api_call"


export const reviewerLogin = async (email, password) => {
    return await postApi({url:'reviewer-login', data:{email, password}})
}

export const reviewerSignup = async (fullname, email, password, mobile, address)=>{
    return await postApi({url:'reviewer-signup', data:{fullname, email, password, mobile, address}})
}