import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          {anecdote.content}
          <div>
            has {anecdote.votes} votes
            <button onClick={() => dispatch({ type: 'VOTE', data: { id: anecdote.id } })}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
