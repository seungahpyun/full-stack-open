import allPatients from "../../data/patients";
import { Patient, PublicPatient } from "../types";

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

export default {
  getPatients,
  getPublicPatients
};
