import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import rows from '../utils/rows';
import { UserContext } from '../contexts/UserContext';
import { DiceContext } from '../contexts/DiceContext';
import { GameContext } from '../contexts/GameContext';

const styles = {
  container: {
    flex: 4,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    m: 1,
  },
  innerContainer: {
    overflow: 'auto',
    scrollbarWidth: 'thin',
    py: 1,
  },
  table: {
    borderSpacing: '0',
  },
};

const maxInputRows = rows.filter((row) => !row.generated).length;

function Board() {
  const [users, { setUserValue, resetUsers }] = useContext(UserContext);
  const [dices, { resetDices }] = useContext(DiceContext);
  const [{ turn, round }, { nextTurn, endGame }] = useContext(GameContext);

  const currentUser = users[turn];

  const userFilledCells = (user) =>
    user.column.filter(({ value }) => value !== null).length;

  useEffect(() => {
    if (users.every((user) => userFilledCells(user) >= maxInputRows)) {
      endGame();
    } else if (userFilledCells(currentUser) >= maxInputRows) {
      nextTurn();
    }
  }, [currentUser, endGame, nextTurn, resetUsers, users]);

  const onCellClicked = (userIndex, rowIndex, value) => {
    setUserValue(userIndex, rowIndex, value);
    resetDices();

    if (round <= userFilledCells(users[userIndex])) {
      nextTurn();
    }
  };

  function renderValueOption(userIndex, rowIndex, selectable, user) {
    const value = rows[rowIndex].rule(dices, user.column);
    return selectable ? (
      <Button
        component={motion.button}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCellClicked(userIndex, rowIndex, value)}
      >
        {value}
      </Button>
    ) : (
      <Typography>{value}</Typography>
    );
  }

  function renderValueCell(user, rowIndex, userIndex) {
    const value = user.column[rowIndex].value;
    const isRoundActive = turn === userIndex;
    const isGenerated = rows[rowIndex].generated;

    const valueText = <Typography>{value}</Typography>;

    return (
      <Cell key={user.id}>
        {value !== null
          ? valueText
          : isGenerated
            ? renderValueOption(userIndex, rowIndex, false, user)
            : isRoundActive
              ? renderValueOption(userIndex, rowIndex, true, user)
              : null}
      </Cell>
    );
  }

  return (
    <Box component={motion.div} layout sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <Cell />
              {users.map((user) => (
                <Cell key={user.id}>
                  <Typography>{user.name}</Typography>
                </Cell>
              ))}
            </tr>
            {rows.map((row, rowIndex) => {
              return (
                <tr key={row.name}>
                  <Cell>
                    <Typography>
                      <TextWithInlineDice>{row.title}</TextWithInlineDice>
                    </Typography>
                  </Cell>
                  {users.map((user, userIndex) =>
                    renderValueCell(user, rowIndex, userIndex),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default Board;
