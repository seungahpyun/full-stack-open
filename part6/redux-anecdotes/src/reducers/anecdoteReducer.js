import { createSlice } from "@reduxjs/toolkit"

const getId = () => parseInt((100000 * Math.random()).toFixed(0), 10)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    initializeAnecdotes: (state, action) => {
      state = action.payload
      return state
    },
    createAnecdote: (state, action) => {
      return [...state, {content: action.payload, id: getId(), votes: 0}]
    },
    voteAnecdote: (state, action) => {
      const id = action.payload.id
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    }
  },
})

export const { initializeAnecdotes, createAnecdote, voteAnecdote, appendNote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
