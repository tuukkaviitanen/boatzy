import Title from './components/Title';
import Board from './components/Board';
import { Container } from '@mui/material';
import Dices from './components/Dices';

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
      <Board />
      <Dices />
    </Container>
  );
};

export default App;
