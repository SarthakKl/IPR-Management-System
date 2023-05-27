import React from 'react'
import '../../client/dashboard/Common.scss'

const Queries = () => {
    const queries = []
    return (
        <div className = 'queries'>
            <h3 className="titile">Queries</h3>
            <table className='applied-table'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Name</th>
                    <th>User Type</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
            {
                queries.length === 0 &&
                <div className='no-data'>
                    <h2>No Data Found</h2>
                </div>
            }
        </div>
    )
}

export default Queries