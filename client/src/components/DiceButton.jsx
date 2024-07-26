import { Button } from '@mui/material';
import Dice from './Dice';
import { useContext } from 'react';
import { DiceContext } from '../contexts/DiceContext';

const styles = {
  button: {},
};

const DiceButton = ({ index }) => {
  const [dices, { setDice }] = useContext(DiceContext);
  const diceState = dices[index];

  const onButtonClick = () => {
    navigator.vibrate?.(100); // Vibrate mobile device for physical feedback

    if (diceState >= 6) {
      return setDice(index, 0);
    }
    return setDice(index, diceState + 1);
  };

  return (
    <Button sx={styles.button} onClick={onButtonClick}>
      <Dice number={diceState} />
    </Button>
  );
};

export default DiceButton;
