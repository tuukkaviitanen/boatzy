import { Box, Typography } from '@mui/material';

const styles = {
  title: { textAlign: 'center', color: 'red' },
  container: {
    p: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Title() {
  return (
    <Box sx={styles.container}>
      <Typography variant="h2" sx={styles}>
        Boatzy
      </Typography>
    </Box>
  );
}

export default Title;
