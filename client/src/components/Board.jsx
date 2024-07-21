import Cell from './Cell';

const styles = {
  table: {
    borderSpacing: '0',
  },
};

function Board() {
  const rows = ['first', 'second', 'third'];
  const users = ['mies', 'nainen', 'lapsi'];

  return (
    <table style={styles.table}>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row}>
              <Cell>{row}</Cell>
              {users.map((user) => {
                return <Cell key={user}>{user}</Cell>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
