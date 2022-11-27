import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Profile from '../pages/admin/Profile'
import NotFound from '../components/common/NotFound'
import Login from '../pages/admin/Login'
import Layout from '../components/layouts/Layout'

function AdminRoutes() {
  const user = null
  if(!user)
    return <Login/>
  return (
    <Layout>
      <Routes>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/*' element = {<NotFound/>}/>
      </Routes>
    </Layout>
  )
}

export default AdminRoutes