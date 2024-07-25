import { Box } from '@mui/material';
import DiceButton from './DiceButton';
import { useContext } from 'react';
import { DiceContext } from '../contexts/DiceContext';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xs: 0, md: 2 },
  },
};

const Dices = () => {
  const [dices] = useContext(DiceContext);

  return (
    <Box sx={styles.container}>
      {dices.map((_, index) => (
        <DiceButton key={index} index={index} />
      ))}
    </Box>
  );
};

export default Dices;
