import React, {useState } from 'react'
import './Common.scss'
import {useSelector} from 'react-redux'
import { editTime } from '../../common/EditTime'
import PaymentModal from './PaymentModal'
import Button from '../../ui/button/Button'
import ApplicationModal from './ApplicationModal'
const className ={
  "PAID":"success",
  "UNPAID":"error"
}
function Applied() {
  const allApplications = useSelector((state) => state.clientReducer.allApplications)
  const [application, setApplication] = useState('')
  const [clientId, setClientId] = useState('')
  const [paymentModal, setPaymentModal] = useState({
    show: false,
    application: null,
  })

  const paymentHandler = {
    show : (application)=>{
      if(application) setPaymentModal({show: true,application})
    },
    hide:()=>{
      setPaymentModal({show: false,application:null})
    }
  }
  return (
    <div className='applied'>
        <h3 className="titile">Applied</h3>
        <table className='applied-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>IPR Type</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Description</th>
              <th>Applied At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            allApplications.map((application, index) => {
              console.log(application)
              return (
                <tr key={index}>
                  <td>{application.title}</td>
                  <td>{application.ipr_type}</td>
                  <td><span className={className[application.payment_status]}>{application.payment_status}</span></td>
                  <td className='status'><span>{application.status}</span></td>
                  <td className='description'>{application.description}</td>
                  <td>{ editTime(new Date(application.createdAt)?.toString())}</td>
                  
                  <td>
                    {
                      application.payment_status ==="UNPAID" ? 
                      <Button
                        onClick={()=>paymentHandler.show(application)}
                      >
                        Pay
                      </Button>:
                      <Button  
                        onClick = {() => {
                          setApplication(application)
                          console.log(clientId)
                        }}
                      >
                        View
                      </Button>
                    }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        {
          application &&
          <ApplicationModal
            application = {application}
            setApplication = {setApplication}
          />
        }
        <PaymentModal
          application={paymentModal.application}
          show={paymentModal.show}
          onHide={paymentHandler.hide}
        />
        {
          allApplications?.length===0 &&
          <div className='no-data'>
            <h2>No Data Found</h2>
          </div>
        }
    </div>
  )
} 

export default Applied