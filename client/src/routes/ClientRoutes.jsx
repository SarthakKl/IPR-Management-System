import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/client/Profile'
import Dashboard from '../pages/client/Dashboard'
import Settings from '../pages/client/Settings'
import NotFound from '../components/common/NotFound'
import Auth from '../pages/client/Auth'
import Layout from '../components/layouts/Layout'
import Approved from '../components/client/dashboard/Approved'
import Pending from '../components/client/dashboard/Pending'
import Rejected from '../components/client/dashboard/Rejected'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../redux/authSlice'
import axios from 'axios'

function ClientRoutes() {
  const dispatch = useDispatch()
  const clientToken = useSelector((state) => state.authReducer.clientToken)
  if(!clientToken){
    const token = localStorage.getItem('CLIENT_TOKEN')
    if(token){
      console.log(token)
      dispatch(actions.setClientToken(token))
      axios.defaults.headers.common['authorization'] = clientToken
    }
    else
      return <Auth/>
  }
  else
    axios.defaults.headers.common['authorization'] = clientToken
  
  return (
    <Layout>
      <Routes>
        <Route path = '/dashboard' element = {<Dashboard/>}>
          <Route path = '' element = {<Approved/>}/>
          <Route path = 'approved' element = {<Approved/>}/>
          <Route path = 'pending' element = {<Pending/>}/>
          <Route path = 'rejected' element = {<Rejected/>}/>
        </Route>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/setting' element = {<Settings/>}/>
        <Route path = '/*' element = {<NotFound/>}/>
      </Routes> 
    </Layout>
  )
}

export default ClientRoutes