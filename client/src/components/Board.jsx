import { Box, Button } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import rows from '../utils/rows';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { DiceContext } from '../contexts/DiceContext';

const styles = {
  container: {
    flex: 4,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  table: {
    borderSpacing: '0',
  },
};

const maxInputRows = rows.filter((row) => !row.generated).length;

function Board() {
  const [users, { setUserValue, createUser }] = useContext(UserContext);
  const [dices, { resetDices }] = useContext(DiceContext);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(0);

  console.log({ turn });

  const currentUser = users[turn];

  const userFilledCells = (user) =>
    user.column.filter(({ value }) => value !== null).length;

  const nextRound = useCallback(() => {
    resetDices();
    if (userFilledCells(currentUser) + 1 < round) {
      return;
    }

    if (turn + 1 >= users.length) {
      setRound(round + 1);
      setTurn(0);
    } else {
      setTurn(turn + 1);
    }
  }, [currentUser, resetDices, round, turn, users.length]);

  useEffect(() => {
    console.log({
      userFilled: userFilledCells(currentUser),
      maxInputRows,
      round,
    });
    if (userFilledCells(currentUser) >= maxInputRows) {
      nextRound();
    }
  }, [currentUser, nextRound]);

  const onCellClicked = (userIndex, rowIndex, value) => {
    setUserValue(userIndex, rowIndex, value);
    nextRound();
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
      <Box>
        <table style={styles.table}>
          <tbody>
            <tr>
              <Cell />
              {users.map((user) => (
                <Cell key={user.id}>{user.name}</Cell>
              ))}
              <Cell>
                <Button
                  onClick={() => createUser(`Player ${users.length + 1}`)}
                >
                  Add
                </Button>
              </Cell>
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
                  <Cell />
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
