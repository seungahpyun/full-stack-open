import { createContext, useReducer, useContext } from 'react'

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case SET_NOTIFICATION:
    return action.data
  case CLEAR_NOTIFICATION:
    return null
  default:
    throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const setNotification = (message, type = 'success') => {
    dispatch({
      type: SET_NOTIFICATION,
      data: { message, type },
    })
  }

  const clearNotification = () => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    })
  }

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, clearNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export default NotificationContext
