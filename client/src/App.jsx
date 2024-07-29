import Title from './components/Title';
import Board from './components/Board';
import { Container } from '@mui/material';
import Dices from './components/Dices';
import Buttons from './components/Buttons';

const styles = {
  appContainer: {
    height: '100dvh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
};

const App = () => {
  return (
    <Container sx={styles.appContainer}>
      <Title />
      <Buttons />
      <Board />
      <Dices />
    </Container>
  );
};

export default App;
