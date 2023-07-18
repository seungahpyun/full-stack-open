export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
};

export type Gender = {
  Female: 'female';
  Male: 'male';
  Other: 'other';
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
