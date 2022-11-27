import React from 'react'
import './Common.scss'
import { useSelector } from 'react-redux'

function Approved() {
  const approvedApplications = useSelector((state) => state.clientReducer.approved)
  return (
    <div className='approved'>
        <h3 className="titile">Approved</h3>
        
        <table className='approved-table'>
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
              approvedApplications.map((application, index) => {
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
          approvedApplications?.length===0 &&
          <div className='no-data'>
            <h2>No Data Found</h2>
          </div>
        }
    </div>
  )
}

export default Approved