import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import diariesService from './services/diaries';
import { v1 as uuid } from 'uuid'

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([])
  const [newDiary, setNewDiary] = useState<DiaryEntry | null>(null)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [comment, setComment] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    diariesService.getDiary().then(diary => setDiary(diary))
  }, [])

  const submitDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const diaryEntry: DiaryEntry = {
      id: uuid(),
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }
    diariesService.addDiary(diaryEntry).then(diary => {
      setDiary(prevDiary => [...prevDiary, diary])
      setNewDiary(diaryEntry)
      setVisibility(Visibility.Great)
      setWeather(Weather.Sunny)
      setDate(new Date().toISOString().slice(0, 10))
      setComment('')
    }).catch(error => {
      setError(error.response.data.error)
    })
  }

  return (
    <div>
      <h1>Flight Diary</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Add a new entry</h2>
      {newDiary &&
        <div>
          <h3>{newDiary.date}</h3>
          <p>visibility: {newDiary.visibility}</p>
          <p>weather: {newDiary.weather}</p>
          <p>comment: {newDiary.comment}</p>
        </div>}
      <form onSubmit={submitDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          {Object.values(Visibility).map(val => (
            <label key={val}>
              <input type='radio' value={val} checked={visibility === val} onChange={() => setVisibility(val)} /> {val}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          {Object.values(Weather).map(val => (
            <label key={val}>
              <input type='radio' value={val} checked={weather === val} onChange={() => setWeather(val)} /> {val}
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input id="comment" type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
      <h1>Diary Entries</h1>
      <ul>
        {diary.map(entry =>
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>)}
      </ul>
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
