import { Button } from '@mui/material';
import diceOne from '../assets/dice-one.svg';
import diceTwo from '../assets/dice-two.svg';
import diceThree from '../assets/dice-three.svg';
import diceFour from '../assets/dice-four.svg';
import diceFive from '../assets/dice-five.svg';
import diceSix from '../assets/dice-six.svg';

const styles = {
  image: {
    height: 100,
    width: 100,
    pointerEvents: 'none',
  },
  container: {},
};

const selectIcon = (number) => {
  switch (number) {
    case 1:
      return diceOne;
    case 2:
      return diceTwo;
    case 3:
      return diceThree;
    case 4:
      return diceFour;
    case 5:
      return diceFive;
    case 6:
      return diceSix;
    default:
      return null;
  }
};

const Dice = ({ number }) => {
  const image = selectIcon(number);

  return (
    <Button sx={styles.container}>
      <img style={styles.image} src={image} />
    </Button>
  );
};

export default Dice;
