const styles = {
  cell: {
    border: '1px solid black',
    margin: '0',
    padding: '5px',
  },
};

function Cell(params) {
  return <td style={styles.cell}>{params.children}</td>;
}

export default Cell;
