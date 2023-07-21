import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api';

const getDiary = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`);
  return data;
}

const diariesService = {
  getDiary
}

export default diariesService;
