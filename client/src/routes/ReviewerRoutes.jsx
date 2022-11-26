import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/reviewer/Dashboard'
import Profile from '../pages/reviewer/Profile'
import NotFound from '../components/common/NotFound'
import Auth from '../pages/reviewer/Auth'

function ReviewerRoutes() {
  const user = null
  if(!user)
    return <Auth/>
  return (
    <Routes>
      <Route path = '/dashboard' element = {<Dashboard/>}/>
      <Route path = '/profile' element = {<Profile/>}/>
      <Route path = '/*' element = {<NotFound/>}/>
    </Routes>
  )
}

export default ReviewerRoutes