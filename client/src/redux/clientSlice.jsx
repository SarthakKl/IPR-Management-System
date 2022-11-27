import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name:'clientSlice',
    initialState:{
        pending:[],
        approved:[],
        rejected:[]
    },
    reducers:{
        setAllApplications(state, action){
            console.log(action)
            state.pending = action.payload.pending
            state.approved = action.payload.approved
            state.rejected = action.payload.rejected
        }
    }
})

const {actions, reducer} = appSlice

export {actions}
export default reducer