const {postApi, patchApi, getApi} = require('./api_call')

export const clientLogin = async (email, password) => {
      return await postApi({url:'client-login',data:{email: email,password: password}})
}

export const clientSignup = async (fullname, email, password) => {
      return await postApi({url:'client-signup', data:{fullname:fullname, email:email, password:password}})
}

export const checkVerificationToken = async (token) => {
      return await patchApi({url:'/verify-email',data:{token:token}} );
}

export const submitApplication = async (form) => {
      return await(postApi({url:'/client/apply', data:form}))
}

export const getApplicationDetails = async() => {
      return await(getApi({url:'/client/application-details'}))
}