import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }, onError: () => {
      dispatch({type: 'SET_NOTIFICATION', notification: 'anecdote must be at least 5 characters long'})
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
    await dispatch({type: 'SET_NOTIFICATION', notification: `you created '${content}'`},
      setTimeout(() => {
        dispatch({type: 'CLEAR_NOTIFICATION'})
      }, 5000)
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
