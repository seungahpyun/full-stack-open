import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdote: (state, action) => {
      return action.payload
    },
    addVote: (state, action) => {
      const id = action.payload.id
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    }
  },
})

export const { setAnecdote , addVote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.update(id)
    dispatch(addVote({ id }))
  }
}


export default anecdoteSlice.reducer
