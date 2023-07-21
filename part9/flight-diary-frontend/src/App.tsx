import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import diariesService from './services/diaries';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    diariesService.getDiary().then(diary => setDiary(diary))
  }, [])


  return (
    <div>
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
