import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ( props ) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={{notification, notificationDispatch}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context.notification
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context.notificationDispatch
}

export default NotificationContext
