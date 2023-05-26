import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/reviewer/Dashboard'
import Profile from '../pages/reviewer/Profile'
import NotFound from '../components/common/NotFound'
import Auth from '../pages/reviewer/Auth'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {actions} from '../redux/authSlice'
import Layout from '../components/layouts/Layout'
import Applications from '../components/reviewer/dashboard/Applications'
import Reviewing from '../components/reviewer/dashboard/Reviewing'
import Reviewed from '../components/reviewer/dashboard/Reviewed'
import SearchDatabase from '../components/reviewer/SearchDatabase'

function ReviewerRoutes() {
  const dispatch = useDispatch()
  const reviewerToken = useSelector((state) => state.authReducer.reviewerToken)
  if(!reviewerToken){
    const token = localStorage.getItem('REVIEWER_TOKEN')
    if(token){
      console.log(token)
      const userName = localStorage.getItem('REVIEWER_NAME')
      console.log(userName)
      dispatch(actions.setUserName(userName))
      dispatch(actions.setReviewerToken(token))
      axios.defaults.headers.common['authorization'] = reviewerToken
    }
    else{
      console.log("Finding reviewer")
      return <Auth/>
    }
  }
  else
    axios.defaults.headers.common['authorization'] = reviewerToken
  return (
    <Layout>
      <Routes>
        <Route path = '/dashboard' element = {<Dashboard/>}>
          <Route path = '' element = {<Applications/>}/>
          <Route path = 'applications' element = {<Applications/>}/>
          <Route path = 'reviewing' element = {<Reviewing/>}/>
          <Route path = 'reviewed' element = {<Reviewed/>}/>
        </Route>
        <Route path = '/search-database' element = {<SearchDatabase/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/*' element = {<NotFound/>}/>
      </Routes>
    </Layout>
  )
}

export default ReviewerRoutes