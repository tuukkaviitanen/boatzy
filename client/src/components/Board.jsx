import { Box } from '@mui/material';
import Cell from './Cell';
import TextWithInlineDice from './TextWithInlineDice';
import Row from '../models/Row';

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
  new Row('11111', 'Ones'),
  new Row('22222', 'Twos'),
  new Row('33333', 'Threes'),
  new Row('44444', 'Fours'),
  new Row('55555', 'Fives'),
  new Row('66666', 'Sixes'),
  new Row('Total', 'Upper Section Total'),
  new Row('Bonus', 'Bonus'),
  new Row('66', 'One Pair'),
  new Row('55\t66', 'Two Pairs'),
  new Row('666', 'Three of a Kind'),
  new Row('5555', 'Four of a Kind'),
  new Row('12345', 'Small Straight'),
  new Row('23456', 'Large Straight'),
  new Row('55566', 'Full House'),
  new Row('00000', 'Chance'),
  new Row('Boatzy', 'Boatzy'),
  new Row('Total', 'Full Total'),
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
              <tr key={row.name}>
                <Cell>
                  <TextWithInlineDice>{row.title}</TextWithInlineDice>
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
