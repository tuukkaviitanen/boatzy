import { TableCell, Typography } from '@mui/material';

const styles = {
  cell: {
    border: '1px solid black',
    p: 0.5,
    minWidth: { xs: 70, sm: 100 },
    textAlign: 'center',
  },
};

function Cell(params) {
  return (
    <TableCell sx={styles.cell}>
      <Typography>{params.children}</Typography>
    </TableCell>
  );
}

export default Cell;
