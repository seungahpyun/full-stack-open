import { useState } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
    setFilter(search.toLowerCase())
  }



  const handleNameClick = () => {
    const updatedName = newName.toLowerCase()
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
      <Filter persons={persons}
              newFilter={newFilter}
              addPerson={addPerson}
              handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson}
                  newName = {newName}
                  newNumber = {newNumber}
                  handleNewName = {handleNewName}
                  handleNewNumber = {handleNewNumber}
                  handleNameClick = {handleNameClick} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
      ...
    </div>
  )
}

export default App
