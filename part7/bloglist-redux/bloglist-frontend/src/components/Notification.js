import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div>
      <Alert variant="success">
        {notification}
      </Alert>
    </div>
  )
}

export default Notification
