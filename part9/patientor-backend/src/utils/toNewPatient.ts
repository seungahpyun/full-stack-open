import { NewPatient } from '../types';
import { Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const isGender = (param: unknown): param is Gender => {
  return typeof param === 'string' && Object.values(Gender).includes(param as Gender);
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender' + gender)
  }
  return gender;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
}

const parseOcupation = (ocupation: unknown): string => {
  if (!ocupation || !isString(ocupation)) {
    throw new Error('Incorrect or missing ocupation: ' + ocupation);
  }
  return ocupation;
}

const toNewPatient = (object: any): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object &&
      'dateOfBirth' in object &&
      'ssn' in object &&
      'gender' in object &&
      'occupation' in object){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOcupation(object.occupation),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatient;
