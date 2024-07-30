import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { GameContext } from '../contexts/GameContext';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
};

const Buttons = () => {
  const [users, { createUser }] = useContext(UserContext);
  const [game, { nextTurn, resetGame }] = useContext(GameContext);

  return (
    <Box sx={styles.container}>
      {!game.gameEnded && (
        <>
          <Button onClick={() => createUser(`Player ${users.length + 1}`)}>
            Add player
          </Button>
          <Button onClick={() => nextTurn()}>Skip turn</Button>
        </>
      )}

      <Button
        onClick={() => {
          if (confirm('Are you sure you want to reset?')) {
            resetGame();
          }
        }}
      >
        Reset game
      </Button>
    </Box>
  );
};

export default Buttons;
