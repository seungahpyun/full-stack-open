import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const dispatch = useDispatch()

  const toggleImportanceOf = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
  }

  return (
    <div>
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

export default AnecdoteList
