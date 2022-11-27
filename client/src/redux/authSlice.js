import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:{
        clientToken:'',
        reviewerToken:'',
        adminToken:''
    },
    reducers:{
        setClientToken(state, action){
            state.clientToken = action.payload
        },
        setAdminToken(state, action){
            state.adminToken = action.payload
        },
        setReviewerToken(state, action){
            state.reviewerToken = action.payload
        }
    }
})
const {actions, reducer} = authSlice

export {actions};
export default reducer