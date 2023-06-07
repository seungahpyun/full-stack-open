import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => {
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(2)
  const positive = ((good / total) * 100).toFixed(2)

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
      <td>
        <h1>statistics</h1>
        <tr>good: {good}</tr>
        <tr>neutral: {neutral}</tr>
        <tr>bad: {bad}</tr>
        <tr>all: {total}</tr>
        <tr>average: {average}</tr>
        <tr>positive: {positive} %</tr>
      </td>
  )
}


const Button = ({Click, text}) => (
  <button onClick={Click}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlegoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button Click={handlegoodClick} text= 'good' />
      <Button Click={handleNeutralClick} text= 'neutral' />
      <Button Click={handleBadClick} text= 'bad' />
      <Statistics  good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
