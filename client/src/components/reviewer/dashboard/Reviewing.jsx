import React, {useState } from 'react'
import '../../client/dashboard/Common.scss'
import {useSelector} from 'react-redux'
import Button from '../../ui/button/Button'
import ApplicationModal from './ApplicationModal'

function Reviewing() {
  const reviewing = useSelector((state) => state.reviewerReducer.reviewing)
  const [applicationId, setApplicationId] = useState('')

  return (
    <div className='pending'>
        <h3 className="titile">Reviewing</h3>
        
        <table className='pending-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>IPR Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Applied At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          
            {
              reviewing.map((application, index) => {
                return (
                  <tr key={index}>
                    <td>{application.title}</td>
                    <td>{application.ipr_type}</td>
                    <td className='status'><span>{application.status}</span></td>
                    <td className='description'>{application.description}</td>
                    <td>{ new Date(application.createdAt)?.toString()}</td>
                    <td><Button onClick = {() => setApplicationId(application._id)}>Open</Button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <ApplicationModal 
          setApplicationId = {setApplicationId}
          applicationId = {applicationId}
          parentComponent = 'reviewing'
        />
        {
          reviewing?.length===0 &&
          <div className='no-data'>
            <h2>No Data Found</h2>
          </div>
        }
    </div>
  )
}

export default Reviewing