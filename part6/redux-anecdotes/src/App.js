import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'NEW_ANECDOTE', data: { content, votes: 0 } })}

  const toggleImportanceOf = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          {anecdote.content}
          <div>
            has {anecdote.votes} votes
            <button onClick={() => toggleImportanceOf(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
