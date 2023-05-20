import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name:'clientSlice',
    initialState:{
        pending:[],
        approved:[],
        rejected:[],
        allApplications:[]
    },
    reducers:{
        setAllApplications(state, action){
            console.log(action)
            state.pending = action.payload.pending
            state.approved = action.payload.approved
            state.rejected = action.payload.rejected
            state.allApplications = action.payload.allApplications
            // const applications = []
            // applications.concat(actions.payload.pending, action.payload.approved, action.payload.rejected)
        },
        updatePaymentStatus(state, action){
            console.log(action)
            const appId = action.payload.applicationId
            const pending = state.pending.map((application, index) => {
                if(application._id === appId){
                    application.payment_status = 'PAID'
                }
                return application;
            })
            const allApplications = state.allApplications((application, index) => {
                if(application._id === appId){
                    application.payment_status = 'PAID'
                }
                return application;
            })
            state.pending = pending;
            state.allApplications = allApplications
        }
    }
})

const {actions, reducer} = appSlice

export {actions}
export default reducer