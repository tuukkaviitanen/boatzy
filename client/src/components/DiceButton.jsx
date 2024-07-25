import { Button } from '@mui/material';
import Dice from './Dice';

const styles = {
  button: {},
};

const DiceButton = () => {
  return (
    <Button sx={styles.button}>
      <Dice number={1} />
    </Button>
  );
};

export default DiceButton;
