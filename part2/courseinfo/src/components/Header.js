import React from 'react'

const Header = ({course}) => {
  return (
    <div className="header">
      <h1>Web development currilum</h1>
      <h2>{course}</h2>
    </div>
  )
}

export default Header
