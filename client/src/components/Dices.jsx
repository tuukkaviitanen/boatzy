import { Box } from '@mui/material';
import DiceButton from './DiceButton';
import { useContext } from 'react';
import { DiceContext } from '../contexts/DiceContext';
import { motion } from 'framer-motion';

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
    <Box
      component={motion.div}
      sx={styles.container}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.1 }}
      data-testid="dices-container"
    >
      {dices.map((_, index) => (
        <DiceButton key={index} index={index} />
      ))}
    </Box>
  );
};

export default Dices;
