import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  const { message, type } = notification

  return <div className={type}>{message}</div>
}

export default Notification
