import React, {useState } from 'react'
import '../../client/dashboard/Common.scss'
import {useSelector} from 'react-redux'

function Reviewed() {
  const reviewed = useSelector((state) => state.reviewerReducer.reviewed)

  return (
    <div className='pending'>
        <h3 className="titile">Reviewed</h3>
        
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
                  <td>{ new Date(application.createdAt)?.toString()}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
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