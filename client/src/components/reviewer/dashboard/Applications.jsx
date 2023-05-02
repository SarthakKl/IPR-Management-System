import React, { useEffect, useState } from 'react'
import '../../client/dashboard/Common.scss'
import {actions} from '../../../redux/reviewerSlice'
import {useDispatch, useSelector} from 'react-redux'
import Button from '../../ui/button/Button'
import { fetchApplications } from '../../../utils/api/reviewerApi'
import ApplicationModal from './ApplicationModal'
import { editTime } from '../../common/EditTime'

function Applications() {

  const applications = useSelector((state) => state.reviewerReducer.applications)
  const [applicationId, setApplicationId] = useState('')
  const [clientId, setClientId] = useState('')
  
  // const editTime = (time) => {
    
  // }
  return (
    <div className='pending'>
        <h3 className="title">Applications</h3>
        <table className='pending-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>IPR Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Applied At</th>
              <th>Client</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              applications.map((application, index) => {
                return (
                  <tr key={index}>
                    <td>{application.title}</td>
                    <td>{application.ipr_type}</td>
                    <td className='status'><span>{application.status}</span></td>
                    <td className='description'>{application.description}</td>
                    <td>{ 
                      editTime(new Date(application.createdAt)?.toString())
                    }</td>
                    <td>
                      {application.clientName}
                    </td>
                    <td>
                      <Button 
                          onClick = {() => {
                            setApplicationId(application._id)
                            setClientId(application.client_id)
                            console.log(clientId)
                          }}
                        >
                          Open
                        </Button>
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <ApplicationModal 
          setApplicationId = {setApplicationId}
          applicationId = {applicationId}
          clientId = {clientId}
          parentComponent = 'applications'
        />

        {
          applications?.length===0 &&
          <div className='no-data'>
            <h2>No Data Found</h2>
          </div>
        }
    </div>
  )
}

export default Applications