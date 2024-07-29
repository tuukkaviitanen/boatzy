import { Box, Button } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import rows from '../utils/rows';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { DiceContext } from '../contexts/DiceContext';
import { GameContext } from '../contexts/GameContext';

const styles = {
  container: {
    flex: 4,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  innerContainer: {
    overflow: 'auto',
  },
  table: {
    borderSpacing: '0',
  },
};

const maxInputRows = rows.filter((row) => !row.generated).length;

function Board() {
  const [users, { setUserValue, resetUsers }] = useContext(UserContext);
  const [dices, { resetDices }] = useContext(DiceContext);
  const [{ turn, round }, { nextTurn, resetGame }] = useContext(GameContext);

  const currentUser = users[turn];

  const userFilledCells = (user) =>
    user.column.filter(({ value }) => value !== null).length;

  useEffect(() => {
    if (users.every((user) => userFilledCells(user) >= maxInputRows)) {
      resetGame();
      resetUsers();
    } else if (userFilledCells(currentUser) >= maxInputRows) {
      nextTurn();
    }
  }, [currentUser, nextTurn, resetGame, resetUsers, users]);

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
      <Button onClick={() => onCellClicked(userIndex, rowIndex, value)}>
        {value}
      </Button>
    ) : (
      <>{value}</>
    );
  }

  function renderValueCell(user, rowIndex, userIndex) {
    const value = user.column[rowIndex].value;
    const isRoundActive = turn === userIndex;
    const isGenerated = rows[rowIndex].generated;

    return (
      <Cell key={user.id}>
        {value ??
          ((isGenerated &&
            renderValueOption(userIndex, rowIndex, false, user)) ||
            (isRoundActive &&
              renderValueOption(userIndex, rowIndex, true, user)))}
      </Cell>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <Cell />
              {users.map((user) => (
                <Cell key={user.id}>{user.name}</Cell>
              ))}
            </tr>
            {rows.map((row, rowIndex) => {
              return (
                <tr key={row.name}>
                  <Cell>
                    <TextWithInlineDice>{row.title}</TextWithInlineDice>
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
