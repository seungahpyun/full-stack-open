import { useSelector } from 'react-redux'
import { Alert, Container } from './StyledComponents'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if (notification === null) {
    return null
  }

  return (
    <Container>
      <Alert>
        {notification.message}
      </Alert>
    </Container>
  )
}

export default Notification
