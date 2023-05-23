import { useState } from 'react'

const Anecdote =({text,vote}) =>{
  if (vote === 0){
    return (
      <div>
        <h3>{text}</h3>
        <p>No votes yet</p>
      </div>
    )
  }
    return(
      <div>
      <h3>{text}</h3>
      <p>has {vote} votes</p>
      </div>
    )
}

const MostVoted =({text,votes}) =>{
  const mostVoted = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(mostVoted)
  console.log(mostVoted)
  if(mostVoted ===0) {
    return
  }
  return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{text[mostVotedIndex]} </p>
        <p>has {mostVoted} votes</p>
      </div>
  )
}


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVoteClick= () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} vote ={votes[selected]}/>
      <Button Click={handleVoteClick} text ="vote"/>
      <Button Click={handleAnecdoteClick} text="next anecdote"/>
      <MostVoted votes={votes} text={anecdotes}/>
    </div>
  )
}

export default App
