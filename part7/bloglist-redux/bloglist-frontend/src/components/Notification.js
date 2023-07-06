import { useSelector } from 'react-redux'
import { Alert } from './StyledComponents'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if (notification === null) {
    return null
  }

  return (
    <Alert>
      {notification}
    </Alert>
  )
}

export default Notification
