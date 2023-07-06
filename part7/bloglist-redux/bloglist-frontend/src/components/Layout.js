import React from 'react'
import Notification from './Notification'

const Layout = ({ children }) => {
  return (
    <div>
      <Notification />
      {children}
    </div>
  )
}

export default Layout
