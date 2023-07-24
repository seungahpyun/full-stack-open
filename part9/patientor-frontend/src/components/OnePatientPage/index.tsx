import { useParams } from 'react-router-dom';
import { Patient, Gender, Diagnosis, Entry, HealthCheckRating} from '../../types';
import React from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServiceIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';


interface props {
  patients : Patient[] | undefined | null;
  diagnoses : Diagnosis[] | undefined | null;
};

const genderId = (gender : Gender | undefined) => {
  switch(gender){
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    default:
      return <></>;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const HealthRating = ({health}: {health: HealthCheckRating}) => {
  switch(health){
    case 0:
      return <FavoriteIcon style={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case 2:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case 3:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return <></>;
  }
}

const EntryDetails : React.FC<{ entry: Entry }> = ({entry}) => {
  switch(entry.type){
    case "HealthCheck":
      return (
        <Box sx= {{border: '2px solid black',  borderRadius: 4, padding: 2, margin: 1 }}>
          <Typography variant="body1">
            {entry.date}<MedicalServiceIcon />
          </Typography>
          <Typography variant="body2">
            <i>{entry.description}</i>
          </Typography>
          <HealthRating health={entry.healthCheckRating} />
          <Typography variant="body2">
            dignoses by {entry.specialist}
          </Typography>
        </Box>
      );
    case "Hospital":
      return (
        <Box sx= {{border: '2px solid black',  borderRadius: 4, padding: 2, margin: 1 }}>
          <Typography variant="body1">
            {entry.date}<WorkIcon />
          </Typography>
          <Typography variant="body2">
            <i>{entry.description}</i>
          </Typography>
          <Typography variant="body2">
            dignoses by {entry.specialist}
          </Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx= {{border: '2px solid black',  borderRadius: 4, padding: 2, margin: 1 }}>
          <Typography variant="body1">
            {entry.date}<WorkIcon />{entry.employerName}
          </Typography>
          <Typography variant="body2">
            <i>{entry.description}</i>
          </Typography>
          <Typography variant="body2">
            dignoses by {entry.specialist}
          </Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

const OnePatientPage = ({ patients } : props) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients ? patients.find(p => p.id === id) : null;

  return (
    <div>
      <Typography variant="h6">
        <b>{patient?.name}{genderId(patient?.gender)}</b>
      </Typography>
      <Typography variant="body1">
        ssn: {patient?.ssn}
      </Typography>
      <Typography variant="body1">
        occupation: {patient?.occupation}
      </Typography>
      <Typography variant="h6">
        <b>entries:</b>
      </Typography>
      {patient?.entries.map(e => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </div>
  );
};


export default OnePatientPage;
