import { v1 as uuid } from 'uuid'
import allPatients from "../../data/patients";
import { Patient, PublicPatient, NewPatient, EntryWithoutId, Entry } from "../types";

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

const addEntry = ( patient: Patient, entry: EntryWithoutId ):Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  }
  patient.entries.push(newEntry);
  return newEntry;
}

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addPatient,
  addEntry
};
