import { v1 as uuid } from 'uuid'
import allPatients from "../../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return allPatients;
};

const getPatient = (id: string): Patient | undefined => {
  return allPatients.find(p => p.id === id);
};

const getPublicPatients = (): PublicPatient[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
}

const addPatient = ( entry : NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };
  allPatients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addPatient,
};
