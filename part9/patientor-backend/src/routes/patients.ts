import express from 'express';
import allPatient from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(allPatient);
});


export default router;
