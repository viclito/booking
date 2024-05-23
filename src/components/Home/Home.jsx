import { Box } from '@mui/material';
import Navbar from '../Navbar';
import './home.scss';

const Home = () => {

  return (
    <Navbar>
      <Box sx={{maxWidth:'1300px' , margin:'auto' , p:2}}>Home</Box>
    </Navbar>
  );
};

export default Home;
