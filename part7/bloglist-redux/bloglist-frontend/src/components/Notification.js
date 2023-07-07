import { useSelector } from 'react-redux'
import { Alert } from './StyledComponents'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if (notification === null) {
    return null
  }

  return (
    <Alert>
      {notification.message}
    </Alert>
  )
}

export default Notification
