import { useState } from 'react'


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const DisplayName = ({persons}) => {
  const nameList = Object.keys(persons)
  return (
    <div>
      {nameList.map((name) => (
        <div>
          {name}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState({})
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNameClick = () => {
    const updatedName = newName
    if (updatedName in persons){
      alert(`${updatedName} is already added to the phonebook`)
    }
    if (!(updatedName in persons)){
      const updatedPersons = {...persons, [updatedName] : ''}
      setPersons(updatedPersons)
      console.log(updatedPersons)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <input name="name" value={newName} onChange={handleNameChange}/>
        </div>
        {/* <div>
          number:{" "}
          <input name="number" value={newName.number} onChange={handleNameChange} />
        </div> */}
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
