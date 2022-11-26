import React, { useState } from 'react'
import Card from '../../components/ui/Cards/Card'
import { Outlet, useNavigate } from 'react-router-dom'
import './Dashboard.scss'
import plus from '../../assets/plus-icon.png'
import { useEffect } from 'react'
import { getApplicationDetails } from '../../utils/api/clientApi'
import { useDispatch, useSelector } from 'react-redux'
import {actions} from '../../redux/applicationSlice'
import ApplyModal from '../../components/client/dashboard/Forms/ApplyModal'

function Dashboard() {
  const cardTitle = ['Approved', 'Pending', 'Rejected']
  const categoryCount = useSelector((state) => [
    state.applicationReducer.approved.length,  
    state.applicationReducer.pending.length, 
    state.applicationReducer.rejected.length
  ])
  const catRoutes = ['approved', 'pending', 'rejected']
  const [iprType, setIprType ] = useState('patent')
  const [applyModal, showApplyModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchApplications = async ()=>{
    try {
      const response = await getApplicationDetails()
      if(response.error){
        return console.log(response.error)
      }
      console.log(response)
      dispatch(actions.setAllApplications(response.applications))
    } catch (error) {
      return console.log(error)
    }
  }
  const submitHandler = ()=>{

  }
  useEffect(()=>{
    fetchApplications()
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
        <div className='apply-card' onClick={() => showApplyModal(true)}>
          <img src={plus} height='50' width='50' />
        </div>
        <ApplyModal
          showApplyModal={showApplyModal}
          applyModal={applyModal}
          fetchApplications={fetchApplications}
        />
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard