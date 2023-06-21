import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChanges = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch({ type: 'SET_FILTER', filter })
  }

  return (
    <div>
      <form>
        <div>
          <h3>filter <input onChange={handleChanges} /></h3>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteFilter
