import { Diagnose, Discharge, EntryWithoutId, HealthCheckRating, NewBaseEntry, SickLeave } from "../types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return typeof param === 'number' && Object.values(HealthCheckRating).includes(param)
}

const isDiagnosisCodes = (param: unknown): param is Array<Diagnose['code']> => {
  return Array.isArray(param) && param.every(code => isString(code))
}

const isDischarge = (param: unknown): param is Discharge => {
  return typeof param === 'object' && param !== null && 'date' in param && 'criteria' in param
}

const isSickLeave = (param: unknown): param is SickLeave => {
  return typeof param === 'object' && param !== null && 'startDate' in param && 'endDate' in param
}

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param}`)
  }
  return param
}

const parseDate = (param: unknown, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param}`)
  }
  return param
}

const parseDiagnosisCodes = (param: unknown): Array<Diagnose['code']> => {
  if (!param || !isDiagnosisCodes(param)) {
    throw new Error(`Incorrect or missing diagnosis codes: ${param}`)
  }
  return param
}

const parseDischarge = (param: unknown): Discharge => {
  if (!param || !isDischarge(param)) {
    throw new Error(`Incorrect or missing discharge: ${param}`)
  }
  return param
}

const parseSickLeave = (param: unknown): SickLeave => {
  if (!param || !isSickLeave(param)) {
    throw new Error(`Incorrect or missing sick leave: ${param}`)
  }
  return param
}

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!param || !isHealthCheckRating(param)) {
    throw new Error(`Incorrect or missing health check rating: ${param}`)
  }
  return param
}

const toNewBaseEntry = (object: any): NewBaseEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  const baseEntry: NewBaseEntry = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined
  }

  return baseEntry
}

const toNewEntry = (object: any): EntryWithoutId => {
  const baseEntry = toNewBaseEntry(object) as EntryWithoutId

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      }
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined
      }
    default:
      throw new Error('Incorrect or missing type')
  }
}

export default toNewEntry
