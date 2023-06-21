import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChanges = (event) => {
    event.preventDefault()
    dispatch(setFilter(event.target.value))
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
