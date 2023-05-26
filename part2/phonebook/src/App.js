import { useState } from 'react'


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const DisplayName = ({persons}) => {
  const personList = Object.entries(persons)
  console.log(personList)
  return (
    <div>
      {personList.map(([key , value]) =>
        <div>
          {key} {value}
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState({})
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
  }


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }


  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }


  const handleNameClick = () => {
    const updatedName = newName
    const updatedNumber = newNumber

    if (updatedName in persons){
      alert(`${updatedName} is already added to the phonebook`)
    }
    if (!(updatedName in persons)){
      const updatedPersons = {...persons, [updatedName] : updatedNumber}
      setPersons(updatedPersons)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
