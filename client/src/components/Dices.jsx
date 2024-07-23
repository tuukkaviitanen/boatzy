import { Box } from '@mui/material';
import Dice from './Dice';
import diceOne from '../assets/dice-one.svg';

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
      <Dice imageSrc={diceOne} />
      <Dice imageSrc={diceOne} />
      <Dice imageSrc={diceOne} />
      <Dice imageSrc={diceOne} />
      <Dice imageSrc={diceOne} />
    </Box>
  );
};

export default Dices;
