import diceZero from '../assets/dice-zero.svg';
import diceOne from '../assets/dice-one.svg';
import diceTwo from '../assets/dice-two.svg';
import diceThree from '../assets/dice-three.svg';
import diceFour from '../assets/dice-four.svg';
import diceFive from '../assets/dice-five.svg';
import diceSix from '../assets/dice-six.svg';
import Image from './Image';

const styles = {
  image: {
    pointerEvents: 'none',
    width: '100%',
  },
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
      return diceZero;
  }
};

const Dice = ({ number, sx }) => {
  const image = selectIcon(number);

  return <Image src={image} sx={{ ...styles.image, ...sx }} />;
};

export default Dice;
