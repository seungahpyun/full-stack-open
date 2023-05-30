import React from 'react'


const Filter = ({persons, newFilter,addPerson,handleFilter}) => {
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
      <form onSubmit={addPerson}>
        <div>
          filter shown with {" "}
          <input name="filtered" value={newFilter} onChange={handleFilter}/>
        </div>
      </form>
      <div>
        {personList}
      </div>
    </div>
  )
}

export default Filter
