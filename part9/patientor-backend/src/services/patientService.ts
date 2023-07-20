import { v1 as uuid } from 'uuid'
import allPatients from "../../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return allPatients;
};

const getPublicPatients = (): PublicPatient[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
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
  getPublicPatients,
  addPatient
};
