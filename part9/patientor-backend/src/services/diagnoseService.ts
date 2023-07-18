import allDiagnoses from "../../data/diagnoses";
import { Diagnose }  from "../types";

const getDiagnoses= (): Diagnose[] => {
  return allDiagnoses;
}

export default {
  getDiagnoses
}
