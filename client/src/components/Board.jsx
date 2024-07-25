import { Box } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import rows from '../utils/rows';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

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
  const [users] = useContext(UserContext);

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
                {users.map((user) => (
                  <Cell key={user.id}>
                    {user.column[rowIndex]?.value ??
                      user.column[rowIndex]?.tempValue}
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
