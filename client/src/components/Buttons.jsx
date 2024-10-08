import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { GameContext } from '../contexts/GameContext';
import { AnimatePresence, motion } from 'framer-motion';

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
    <Box sx={styles.container} data-testid="buttons-container">
      <AnimatePresence initial={false}>
        {!game.gameEnded && (
          <>
            <Button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key="add"
              component={motion.button}
              onClick={() => createUser(`Player ${users.length + 1}`)}
            >
              Add player
            </Button>
            <Button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key="skip"
              component={motion.button}
              onClick={() => nextTurn()}
            >
              Skip turn
            </Button>
          </>
        )}

        <Button
          key="reset"
          component={motion.button}
          layout
          onClick={() => {
            if (confirm('Are you sure you want to reset?')) {
              resetGame();
            }
          }}
        >
          Reset game
        </Button>
      </AnimatePresence>
    </Box>
  );
};

export default Buttons;
