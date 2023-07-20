export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
};

export type Gender = 'female' | 'male' | 'other';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
