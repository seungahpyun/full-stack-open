import React from 'react'


const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <h4>
      Number of exercises {total}
    </h4>
  )
}

export default Total
