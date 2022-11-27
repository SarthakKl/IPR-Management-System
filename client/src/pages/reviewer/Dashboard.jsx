import React, { useState } from 'react'
import Card from '../../components/ui/Cards/Card'
import { Outlet, useNavigate } from 'react-router-dom'
import '../client/Dashboard.scss'
import { useSelector } from 'react-redux'


function Dashboard() {
  const cardTitle = ['Applications', 'Reviewing', 'Reviewed']
  const catRoutes = ['applications', 'reviewing', 'reviewed']
  const categoryCount = useSelector((state) => [
    state.reviewerReducer.applications.length,
    state.reviewerReducer.reviewing.length,
    state.reviewerReducer.reviewed.length])
  const navigate = useNavigate()

  return (
    <div className='client-dashboard'>
      <div className='cat-cards'>
        {
          cardTitle.map((title, index) => {
            return <Card
              title={title}
              count={categoryCount[index]}
              clicked={() => navigate(catRoutes[index], { replace: true })}
              key={index}
            />
          })
        }
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard