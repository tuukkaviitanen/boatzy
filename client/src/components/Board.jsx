import { Box } from '@mui/material';
import Cell from './Cell';

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

const rows = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
];
const users = ['player 1', 'player 2', 'player 3', 'player 4'];

function Board() {
  return (
    <Box sx={styles.container}>
      <table style={styles.table}>
        <tbody>
          <tr>
            <Cell />
            {users.map((user) => (
              <Cell key={user}>{user}</Cell>
            ))}
          </tr>
          {rows.map((row) => {
            return (
              <tr key={row}>
                <Cell>{row}</Cell>
                {users.map((user) => (
                  <Cell key={user} />
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
