import Button from '../ui/button/Button';
import './Alert.scss'
import { Modal } from 'react-bootstrap';

function Alert({showAlert, setAlertState, content, confirmAlert}) {
  return (
    <Modal show={showAlert} variant="light" className='alert' centered>
      <Modal.Body>
        {content}
      </Modal.Body>
      <div className='event-buttons'> 
        <Button onClick={confirmAlert} variant="outline-success">
            OK
        </Button>
        <Button onClick={() => setAlertState(false)} variant="outline-danger">
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default Alert;