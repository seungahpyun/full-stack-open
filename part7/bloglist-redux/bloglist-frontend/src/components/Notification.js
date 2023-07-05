import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  width: 50%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`

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
