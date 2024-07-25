import { Box, Button } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import rows from '../utils/rows';
import { useContext, useState } from 'react';
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

function Board() {
  const [users, { setUserValue }] = useContext(UserContext);
  const [dices, { resetDices }] = useContext(DiceContext);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState(0);

  const nextRound = () => {
    resetDices();
    if (turn + 1 >= users.length) {
      setRound(round + 1);
      setTurn(0);
    } else {
      setTurn(turn + 1);
    }
  };

  const onCellClicked = (userIndex, rowIndex, value) => {
    setUserValue(userIndex, rowIndex, value);
    nextRound();
  };
  return (
    <Box sx={styles.container}>
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
                {users.map((user, userIndex) => (
                  <Cell key={user.id}>
                    {user.column[rowIndex]?.value ??
                      (turn === userIndex && (
                        <Button
                          onClick={() =>
                            onCellClicked(
                              userIndex,
                              rowIndex,
                              dices.reduce((sum, num) => sum + num, 0),
                            )
                          }
                        >
                          {dices.reduce((sum, num) => sum + num, 0)}
                        </Button>
                      ))}
                  </Cell>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}

export default Board;
