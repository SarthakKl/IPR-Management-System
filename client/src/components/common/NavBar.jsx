import React from 'react'
import bell from '../../assets/bell.png'
import './NavBar.scss'
import profile from '../../assets/profile_placeholder.png'

function NavBar() {
  return (
    <div className='header'>
        <div>
            <h2>IPRMS</h2>
        </div>
        <div className = 'right-header'>
            <img className = 'notif-icon' src={bell} height='20' width='20'/>
            <div className='profile'>
                <span className='username'>USERNAME</span>
                <img src = {profile} height = '20' width= '20'/>
            </div> 
        </div>
    </div>
  )
}

export default NavBar