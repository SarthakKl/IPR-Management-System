import Alert from 'react-bootstrap/Alert';
import Button from '../ui/button/Button';
import './Alert.scss'

function AlertDismissible({showAlert, setAlertState, content, confirmAlert}) {
    
    const handleOK = () => {
        setAlertState(false)
        confirmAlert()
    }
    
  return (
    <>
      <Alert show={showAlert} variant="light" className='alert'>
        <p>
          {content}
        </p>
        <div className="d-flex justify-content-end">
         <Button onClick={handleOK} variant="outline-success">
            OK
          </Button>
          <Button onClick={() => setAlertState(false)} variant="outline-danger">
            Cancel
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;