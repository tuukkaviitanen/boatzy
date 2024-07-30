import Title from './components/Title';
import Board from './components/Board';
import { Container } from '@mui/material';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import Dices from './components/Dices';
import Buttons from './components/Buttons';
import { useContext } from 'react';
import { GameContext } from './contexts/GameContext';

const styles = {
  appContainer: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
};

const App = () => {
  const [{ gameEnded }] = useContext(GameContext);

  return (
    <Container sx={styles.appContainer}>
      <Title />
      <Buttons />
      <Board />
      {!gameEnded && <Dices />}
      {gameEnded && <Fireworks autorun={{ speed: 2 }} />}
    </Container>
  );
};

export default App;
