import React from 'react'


const Filtered = ({persons, newFilter}) => {
  const personList = Object.entries(persons).map((person) => {
    if((person).includes(newFilter))
      return(
        <div key={person}>
          {person.join(' ')}
        </div>
      )
    }
  )
  return (
    <div>
      {personList}
    </div>
  )
}
