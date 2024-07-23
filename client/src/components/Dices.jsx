import { Box } from '@mui/material';
import Dice from './Dice';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Dices = () => {
  return (
    <Box sx={styles.container}>
      <Dice number={1} />
      <Dice number={2} />
      <Dice number={3} />
      <Dice number={4} />
      <Dice number={5} />
    </Box>
  );
};

export default Dices;
