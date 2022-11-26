import React from 'react'
import NavBar from '../common/NavBar'

function Layout({children}) {
  return (
    <div className='layout'>
        {/* <div className='sidebar'>
            <li>Applied</li>
            <li>Approved</li>
            <li>Pending</li>
            <li>Rejected/Canclled</li>
            <li>Apply</li>
        </div> */}
        <NavBar/>
        
        <main>{children}</main>
    </div>
  )
}

export default Layout