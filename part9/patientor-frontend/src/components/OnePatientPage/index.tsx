import { useParams } from 'react-router-dom';
import { Patient, Gender } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Typography from '@mui/material/Typography';

interface props {
  patients : Patient[] | undefined | null;
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

const OnePatientPage = ({ patients } : props) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients ? patients.find(p => p.id === id) : null;



  return (
    <div>
      <Typography variant="h4">
        {patient?.name}{genderId(patient?.gender)}
      </Typography>
      <Typography variant="h6">
        ssn: {patient?.ssn}
      </Typography>
      <Typography variant="h6">
        occupation: {patient?.occupation}
      </Typography>
    </div>
  );
};


export default OnePatientPage;
