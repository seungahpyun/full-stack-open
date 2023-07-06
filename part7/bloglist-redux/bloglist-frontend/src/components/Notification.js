import { useSelector } from 'react-redux'
import { StyledAlert } from './StyledComponents'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  if (notification === null) {
    return null
  }

  return (
    <StyledAlert>
      {notification}
    </StyledAlert>
  )
}

export default Notification
