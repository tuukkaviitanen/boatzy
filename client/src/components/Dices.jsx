import { Box } from '@mui/material';
import DiceButton from './DiceButton';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xs: 0, md: 2 },
  },
};

const Dices = () => {
  return (
    <Box sx={styles.container}>
      <DiceButton />
      <DiceButton />
      <DiceButton />
      <DiceButton />
      <DiceButton />
    </Box>
  );
};

export default Dices;
