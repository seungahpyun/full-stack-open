import { useQuery , useMutation, useQueryClient} from 'react-query'
import { getAnecdotes, updateVote } from '../request'
import { useNotificationDispatch } from '../notificationContext'

const Anecdotelist = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = async(anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    await dispatch({type: 'SET_NOTIFICATION', notification: `you voted '${anecdote.content}'`},
      setTimeout(() => {
        dispatch({type: 'CLEAR_NOTIFICATION'})
      }, 5000)
    )
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes, {
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not avaiable due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotelist
