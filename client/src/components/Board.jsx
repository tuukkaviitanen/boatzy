import { Box } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';

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
  '11111',
  '22222',
  '33333',
  '44444',
  '55555',
  '66666',
  'Total',
  'Bonus',
  '66',
  '55\t66',
  '666',
  '5555',
  '12345',
  '23456',
  '55566',
  '00000',
  'Boatzy',
  'Total',
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
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <Cell>
                  <TextWithInlineDice>{row}</TextWithInlineDice>
                </Cell>
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
