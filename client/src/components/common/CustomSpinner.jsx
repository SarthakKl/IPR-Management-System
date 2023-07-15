import react from 'react'
import './CustomSpinner.scss'
import Spinner from 'react-bootstrap/esm/Spinner'

const CustomSpinner = ({classname, text="Loading...", }) => {
    return (
    <div className= {classname}>
        <div>
          <Spinner animation="border" variant="dark" className='spinner'/>
          <div>{text}</div>
        </div>
    </div>
    )
}

export default CustomSpinner;