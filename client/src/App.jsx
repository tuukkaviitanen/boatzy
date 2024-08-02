import Title from './components/Title';
import Board from './components/Board';
import { Container } from '@mui/material';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import Dices from './components/Dices';
import Buttons from './components/Buttons';
import { useContext } from 'react';
import { GameContext } from './contexts/GameContext';
import { AnimatePresence } from 'framer-motion';

const styles = {
  appContainer: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};

const App = () => {
  const [{ gameEnded }] = useContext(GameContext);

  return (
    <Container sx={styles.appContainer}>
      <AnimatePresence>
        <Title key="title" />
        <Buttons key="buttons" />
        <Board key="board" />
        {!gameEnded && <Dices key="dices" />}
        {gameEnded && <Fireworks key="fireworks" autorun={{ speed: 2 }} />}
      </AnimatePresence>
    </Container>
  );
};

export default App;
