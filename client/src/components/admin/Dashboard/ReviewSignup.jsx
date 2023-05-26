import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../ui/button/Button'
import '../../client/dashboard/Common.scss'
import ReviewDetailModal from './ReviewerDetailModal'


const ReviewSignup = () => {
    const reviewerSignups = useSelector((state) => state.adminReducer.reviewerSignups)
    const [reviewer, setReviewer] = useState(null)

    return (
        <div className='review-signup'>
            <h3 className='titile'>Review Signup</h3>
            <table className='review-signup-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reviewerSignups.map((reviewer, index) => {
                            console.log(reviewer)
                            return (
                                <tr key = {index}>
                                    <td>{reviewer.fullname}</td>
                                    <td>{reviewer.email}</td>
                                    <td>{reviewer.mobile}</td>
                                    <td>{reviewer.address}</td>
                                    <td><Button onClick={()=>setReviewer(reviewer)}>View</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                reviewer &&
                <ReviewDetailModal
                    reviewer = {reviewer}
                    setReviewer={setReviewer}
                />
            }
            {
                reviewerSignups?.length===0 &&
                <div className='no-data'>
                    <h2>No Data Found</h2>
                </div>
            }
        </div>
    )
}
export default ReviewSignup