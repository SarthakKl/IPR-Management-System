import {createSlice} from '@reduxjs/toolkit'
const initialState={
    clientToken:'',
    reviewerToken:'',
    adminToken:''
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setClientToken(state, action){
            state.clientToken = action.payload
        },
        setAdminToken(state, action){
            state.adminToken = action.payload
        },
        setReviewerToken(state, action){
            state.reviewerToken = action.payload
        },
        deauthenticateUser(state,{payload}){
            console.log('deauthadf')
            localStorage.clear()
            state.adminToken = null
            state.clientToken = null
            state.reviewerToken = null
        }
    }
})
const {actions, reducer} = authSlice
export const { deauthenticateUser } = authSlice.actions
export {actions};
export default reducer