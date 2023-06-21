import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    if (state.anecdote && Array.isArray(state.anecdote)) {
      if (state.filter === 'ALL') {
        return [...state.anecdote].sort((a, b) => b.votes - a.votes)
      }
      return [...state.anecdote]
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);
    }
    return []
  })

  const handleVote = (id) => {
    dispatch(voteAnecdote({ id: id }))
    dispatch(setNotification(`you voted '${anecdotes.find((anecdote) => anecdote.id === id).content}'`, 5))
  }

  return (
    <div>
      {anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          {anecdote.content}
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
