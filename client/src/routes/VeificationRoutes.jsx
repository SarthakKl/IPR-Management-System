import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminVerification from '../pages/admin/AdminVerification'
import ClientVerification from '../pages/client/ClientVerification'
import ReviewerVerification from '../pages/reviewer/ReviewerVerification'

function VeificationRoutes() {
  return (
    <div>
        <Routes>
            <Route path = '/client/:token' element = {<ClientVerification/>}/>
            <Route path = '/reviewer/:token' element = {<ReviewerVerification/>}/>
            <Route path = '/admin/:token' element = {<AdminVerification/>}/>
        </Routes>
    </div>
  )
}

export default VeificationRoutes