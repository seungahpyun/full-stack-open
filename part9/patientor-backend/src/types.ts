export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
};

export interface Discharge {
  date: string;
  criteria: string;
};

export interface SickLeave {
  startDate: string;
  endDate: string;
};

export interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
};


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
};

export enum HealthCheckRating {
Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
};

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;


type UnionOmit<T, K extends string | number | symbol>
    = T extends unknown ?
        Omit<T, K>
        : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
