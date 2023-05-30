import React from 'react'


const Persons = ({persons}) => {
  const personList = Object.entries(persons)
  return (
    <div>
      {personList.map(([name , number]) =>
        <div key={name}>
          {name} {number}
        </div>
      )}
    </div>
  )
}
