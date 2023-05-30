import React from 'react'

const PersonForm = ({addPerson, newName , handleNewName, newNumber, handleNewNumber, handleNameClick}) =>{
  return(
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input name="name" value={newName} onChange={handleNewName}/>
      </div>
      <div>
        number:{" "}
        <input name="number" value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button onClick={handleNameClick}>add</button>
      </div>
    </form>
  )
}

export default PersonForm
