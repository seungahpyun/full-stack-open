import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <Alert variant="success" className="text-center mt-3">
      {notification}
    </Alert>
  )
}

export default Notification
