import express from 'express';
const app = express();

import { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.status(200).json({ weight, height, bmi });
});

app.get('/exercises', (req: Request, res: Response) => {
  const { dailyHours, target } = req.query;
  if (!dailyHours || !target) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const dailyHoursArray = (dailyHours as string).split(',').map(h => Number(h));
  const targetNumber = Number(target);
  const result = calculateExercises(dailyHoursArray, targetNumber);
  res.status(200).json(result);
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
