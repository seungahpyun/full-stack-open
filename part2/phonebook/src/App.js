import { useState } from 'react'


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const DisplayName = ({persons}) => {
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
  return personList
}

const App = () => {
  const [persons, setPersons] = useState({})
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')



  const addPerson = (event) => {
    event.preventDefault()
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const search = event.target.value
    setFilter(search)
  }



  const handleNameClick = () => {
    const updatedName = newName
    const updatedNumber = newNumber

    if (updatedName in persons){
      alert(`${updatedName} is already added to the phonebook`)
    }

    if (updatedName === '' || updatedNumber === '') {
      alert(`pleaese enter a name and number`)
    } else {
        const updatedPersons = {...persons, [updatedName] : updatedNumber}
        setPersons(updatedPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter shown with {" "}
          <input name="filtered" value={newFilter} onChange={handleFilter}/>
        </div>
      </form>
      <Filtered persons={persons} newFilter={newFilter}/>
      <h2>add a new</h2>
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
          <Button Click={handleNameClick} text='add'/>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayName persons={persons}/>
      ...
    </div>
  )
}

export default App
