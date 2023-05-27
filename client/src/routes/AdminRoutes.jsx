import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Profile from '../pages/admin/Profile'
import NotFound from '../components/common/NotFound'
import Layout from '../components/layouts/Layout'
import Auth from '../pages/admin/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux/authSlice'
import SearchDatabase from '../components/admin/Dashboard/SearchDatabase'
import axios from 'axios'
import ReviewSignup from '../components/admin/Dashboard/ReviewSignup'
import Queries from '../components/admin/Dashboard/Queries'

function AdminRoutes() {
  const dispatch = useDispatch()
  const adminToken = useSelector((state) => state.authReducer.adminToken)
  if(!adminToken){
    const token = localStorage.getItem('ADMIN_TOKEN')
    if(token){
      console.log(token)
      const userName = localStorage.getItem('ADMIN_NAME')
      console.log(userName)
      dispatch(actions.setUserName(JSON.parse(userName)))
      dispatch(actions.setAdminToken(token))
      axios.defaults.headers.common['authorization'] = adminToken
    }
    else
      return <Auth/>
  }
  else
    axios.defaults.headers.common['authorization'] = adminToken
  return (
    <Layout>
      <Routes>
        <Route path = '/dashboard' element = {<Dashboard/>}>
          <Route path = '' element={<SearchDatabase/>}/>
          <Route path = 'database' element={<SearchDatabase/>}/>
          <Route path = 'review-signup' element={<ReviewSignup/>}/>
          <Route path = 'queries' element = {<Queries/>}/>
        </Route>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/*' element = {<NotFound/>}/>
      </Routes>
    </Layout>
  )
}

export default AdminRoutes