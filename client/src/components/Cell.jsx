import { Box, Typography } from '@mui/material';

const styles = {
  cell: {
    border: '1px solid black',
    p: 0.5,
    minWidth: { xs: 70, sm: 100 },
    textAlign: 'center',
    height: 37,
  },
};

function Cell(params) {
  return (
    <Box component="td" sx={styles.cell}>
      <Typography>{params.children}</Typography>
    </Box>
  );
}

export default Cell;
