import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return diagnoses;
}

const diagnosisService = {
  getDiagnoses
};

export default diagnosisService;
