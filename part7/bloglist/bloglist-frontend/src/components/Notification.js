import React, { useState, useEffect } from 'react'

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [message])

  if (!isVisible) {
    return null
  }

  if (message === null) {
    return null
  }

  const notificationId = message.includes('Error')
    ? 'notification-error'
    : 'notification-success'

  return (
    <div className='notification' id = {`${notificationId}`}>
      {message}
    </div>
  )
}

export default Notification
