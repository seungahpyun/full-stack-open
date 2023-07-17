import express from 'express';
const app = express();

import { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({ weight, height, bmi });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
