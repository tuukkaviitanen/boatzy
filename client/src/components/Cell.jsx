import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const styles = {
  cell: {
    minWidth: { xs: 70, sm: 100 },
    textAlign: 'center',
    p: 0,
    height: 37,
    border: '1px solid black',
  },
};

function Cell(params) {
  return (
    <Box
      component={motion.td}
      initial={{ opacity: 0, border: '1px solid transparent' }}
      animate={{ opacity: 1, border: '1px solid black' }}
      exit={{ opacity: 0, border: '1px solid transparent' }}
      transition={{ duration: 0.1 }}
      layout
      sx={styles.cell}
    >
      {params.children}
    </Box>
  );
}

export default Cell;
