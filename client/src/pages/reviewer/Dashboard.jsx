import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import '../client/Dashboard.scss'
import Card from '../../components/ui/Cards/Card'
import {actions} from '../../redux/reviewerSlice'
import { fetchApplications } from '../../utils/api/reviewerApi'

function Dashboard() {
  const cardTitle = ['Applications', 'Reviewing', 'Reviewed']
  const catRoutes = ['applications', 'reviewing', 'reviewed']
  const categoryCount = useSelector((state) => [
    state.reviewerReducer.applications.length,
    state.reviewerReducer.reviewing.length,
    state.reviewerReducer.reviewed.length])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchApplication = async () => {
    try {
      const response = await fetchApplications()
      if(response.error)
        return console.log(response.error)
      console.log(response)
      dispatch(actions.setAllApplication(response.applications))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchApplication()
  }, [])

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