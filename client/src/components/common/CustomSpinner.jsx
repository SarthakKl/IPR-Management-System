import react from 'react'
import './CustomSpinner.scss'
import Spinner from 'react-bootstrap/esm/Spinner'

const CustomSpinner = ({loading}) => {
    return (
    <div className={loading?'spinner-div':'spinner-div-hidden'}>
        <div>
          <Spinner animation="border" variant="dark" className='spinner'/>
          <div>Getting everything ready...</div>
        </div>
      </div>
    )
}

export default CustomSpinner;