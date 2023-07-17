import express from 'express';
const app = express()

import { Request, Response } from 'express';

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
