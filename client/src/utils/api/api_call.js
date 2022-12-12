import axios from 'axios'

// axios.defaults.baseURL = 'http://stage1env-env.eba-8rpns27j.us-east-1.elasticbeanstalk.com/'
// axios.defaults.baseURL = "https://ipr-management-system-69.vercel.app/"
axios.defaults.baseURL = 'http://localhost:3002/'

export const postApi = async({url,data,params,headers})=>{
  console.log("Api Called")
  try {
    const responseData = await axios({
      url,
      data,
      params,
      headers,
      method: 'post'
    })
    // console.table('asdf',responseData.data)
    return responseData.data
  } catch (err) {
    const error = err?.response?.data?.error || 
    err?.response?.data?.message || err.message
    console.log(":::",err,error)
    return {
      data:null,
      error
    }
  }
}

export const patchApi = async ({url, data, params, headers})=>{
  try {
    console.log('patch api called')

    const response = await axios({
      method:'patch',
      url,
      data,
      params,
      headers
    })
    console.log(response)
    return response.data
  } catch (err) {
    console.log(err)
    const error = err.response?.data?.error || err.response?.data?.message || err.message
    return {
      data:null, 
      error
    }
  }
}
export const getApi = async ({url, params, headers}) => {
  try {
    console.log('get api called')
    const response = await axios({
      method:'get',
      url,
      params,
      headers
    })
    return response.data
  } catch (err) {
    console.log(err)
    const error = err.response?.data?.error || err.response?.data?.message || err.message
    return {
      data:null, 
      error
    }
  }
}