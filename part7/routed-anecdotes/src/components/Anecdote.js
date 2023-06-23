import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))

  if (!anecdote) {
    return <div>Anecdote not found.</div>
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        <div>
          <h2>{anecdote.content} by {anecdote.author}</h2>
          <p>has {anecdote.votes} votes</p>
          <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    </div>
  )
}

export default Anecdote
