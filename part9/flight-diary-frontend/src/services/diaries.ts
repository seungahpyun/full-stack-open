import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api';

const getDiary = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`);
  return data;
}

const addDiary = async (entry: DiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${baseUrl}/diaries`,
    entry
  );
  return data;
}

const diariesService = {
  getDiary,
  addDiary
}

export default diariesService;
