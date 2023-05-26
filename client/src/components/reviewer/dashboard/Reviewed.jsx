import React, {useState } from 'react'
import '../../client/dashboard/Common.scss'
import {useSelector} from 'react-redux'
import { editTime } from '../../common/EditTime'
import ApplicationModal from './ApplicationModal'
import Button from '../../ui/button/Button'
import { Link } from 'react-router-dom'

function Reviewed() {
  const reviewed = useSelector((state) => state.reviewerReducer.reviewed)
  const [applicationId, setApplicationId] = useState('')
  const [clientId, setClientId] = useState('')
  return (
    <div className='pending'>
        <div className = 'component-header'>
          <h3 className="titile">Reviewed</h3>
          <Link to = '/reviewer/search-database'target="_blank">
            <Button variant = 'success'>Show Database</Button>
          </Link>
        </div>
        
        <table className='pending-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>IPR Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
          {
            reviewed.map((application, index) => {
              return (
                <tr key={index}>
                  <td>{application.title}</td>
                  <td>{application.ipr_type}</td>
                  <td className='status'><span>{application.status}</span></td>
                  <td className='description'>{application.description}</td>
                  <td>{ editTime(new Date(application.createdAt)?.toString())}</td>
                  <td>
                    <Button  
                      onClick = {() => {
                        setApplicationId(application._id)
                        setClientId(application.client_id)
                        console.log(clientId)
                      }}
                    >
                      View
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
          parentComponent = 'reviewing'
        />
        {
          reviewed?.length===0 &&
          <div className='no-data'>
            <h2>No Data Found</h2>
          </div>
        }
    </div>
  )
}

export default Reviewed