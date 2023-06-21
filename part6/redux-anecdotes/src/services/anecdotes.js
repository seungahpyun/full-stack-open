import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const voteAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const updateResponse = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return updateResponse.data
}




const anecdoteService = { getAll, createNew, voteAnecdote }

export default anecdoteService
