import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Input from '../../common/Input'
import { createOrder, getApplicationDetails } from '../../../utils/api/clientApi'
import Button from '../../ui/button/Button'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/clientSlice'

function PaymentModal({application, show, onHide}) {
    const dispatch = useDispatch()
    const fetchApplications = async ()=>{
        try {
          const response = await getApplicationDetails()
          if(response.error){
            return console.log(response.error)
          }
          dispatch(actions.setAllApplications(response.applications))
        } catch (error) {
          return console.log(error)
        }
    }
    // const [show,setShow] = useState(false)
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        })
    }

    async function displayRazorpay(order) {
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
            const options = {
                ...order,
                handler: async function (response) {
                    
                    console.log({response})
                    const data = {
                        applicationId:application._id,
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    }
                    setTimeout(() => {
                        onHide()
                    }, 1000);
                    setTimeout(() => {
                        fetchApplications()
                    }, 2000);
                    console.log(data)
                    console.log(response)
                }
            };
    
            const paymentGateway = new window.Razorpay(options);
            paymentGateway.open();

        } catch (error) {
            console.log(error)
        }
    }
    
    const paymentHandler = async () =>{
        try {
            const data = await createOrder({applicationId:application._id})
            displayRazorpay(data.order)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        
    },[])
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='application_details_wrapper'>
                    <Input
                        label='Title'
                        value={application?.title}
                        disabled
                    />
                    <Input
                        label='IPR Type'
                        value={application?.ipr_type}
                        disabled
                    />
                    <Input
                        label='Description'
                        value={application?.description}
                        disabled
                    />
                    <Input
                        label='Status'
                        value={application?.status}
                        disabled
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={paymentHandler}>Pay Now</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PaymentModal