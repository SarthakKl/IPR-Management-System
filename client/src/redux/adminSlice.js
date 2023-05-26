import {createSlice} from '@reduxjs/toolkit'


const adminSlice = createSlice({
    name:'adminSlice',
    initialState:{
        applications:[],
        reviewerSignups:[],
        queries:[]
    },
    reducers:{
        setAllApplication(state, {payload}){
            console.log("fuck1",payload)
            state.applications = payload
            // return state
        },
        setReviewerSignups(state, {payload}){
            console.log(payload)
            state.reviewerSignups = payload
        },
        setQueries(state, {payload}){
            state.queries = payload.queries
        },
        // updateSingups(state, {payload}){
        //     const signups = state.reviewerSignups
        //     let index;
        //     for(let i = 0; i < state.reviewerSignups; i++){
        //         if(payload.reviewerId === signups[i]._id){
        //             index = i;
        //         }
        //     }
        //     signups.splice(index,0)
        //     console.log(signups)
        //     state.reviewerSignups = signups
        //     console.log(state.reviewerSignups)
        // },
        
    }
})

const {actions, reducer} = adminSlice

export {actions}

export default reducer