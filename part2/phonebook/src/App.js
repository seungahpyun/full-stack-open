import { useState } from 'react'


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const App = () => {
  const [persons, setPersons] = useState({})
  const [newName, setNewName] = useState('')
  const [id, setId] = useState(0)

  const addName = (event) => {
    event.preventDefault()
    // console.log(event.target.value);
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNameClick = () => {
    const updatedName = newName
    const updatedId = id + 1
    setId(updatedId)

    const updatedPersons = {...persons, [updatedId]: updatedName}
    setPersons(updatedPersons)
    console.log(updatedPersons)
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
        <div>
          {Object.values(persons)}
        </div>
      ...
    </div>
  )
}

export default App
