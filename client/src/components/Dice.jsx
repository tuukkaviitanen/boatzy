import { Button } from '@mui/material';

const styles = {
  image: {
    height: 100,
    width: 100,
    pointerEvents: 'none',
  },
  container: {},
};

const Dice = ({ imageSrc }) => {
  return (
    <Button sx={styles.container}>
      <img style={styles.image} src={imageSrc} />
    </Button>
  );
};

export default Dice;
