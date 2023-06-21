import { useSelector , useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeAnecdote } from '../reducers/anecdoteReducer'
import React, { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdote())
  }, [dispatch])

  const anecdotes = useSelector((state) => {
    if (state.anecdote) {
      console.log(state.filter)
      if (state.filter === 'ALL') {
        return [...state.anecdote].sort((a, b) => b.votes - a.votes)
      }
      return [...state.anecdote]
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
    }
    return []
  })

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
