import {createSlice} from '@reduxjs/toolkit'


const reviewerSlice = createSlice({
    name:'reviewerSlice',
    initialState:{
        applications:[],
        reviewing:[],
        reviewed:[]
    },
    reducers:{
        setAllApplication(state, {payload}){
            console.log(payload)
            state.reviewed = payload.reviewedApplications
            state.reviewing = payload.reviewingApplications
            state.applications = payload.pendingApplications
        },
        reviewApplication(state, actions){
            //need reviewer id and application id in payload
            let i = 0
            for(i = 0; i < state.applications.length; i++){
                if(state.applications[i]._id == actions.payload)
                    break;
            }
            const application = state.applications[i]
            
            application.status = 'REVIEWING'
            state.applications.splice(i, 1)
            state.reviewing.push(application)
        },
        completeReview(state, actions){
            //need application id and final status of application
            let i = 0
            for(i = 0; i < state.reviewing.length; i++){
                if(state.reviewing[i]._id == actions.payload._id)
                    break;
            }
            const application = state.reviewing[i]
            application.status = actions.payload.status
            state.reviewing.splice(i, 1)
            state.reviewed.push(application)
        }
    }
})

const {actions, reducer} = reviewerSlice

export {actions}

export default reducer