import Dice from './Dice';

const styles = {
  dice: {
    width: 23,
    bottom: -3,
    position: 'relative',
  },
};

const InlineDice = ({ number }) => {
  return <Dice sx={styles.dice} number={number} />;
};

export default InlineDice;
