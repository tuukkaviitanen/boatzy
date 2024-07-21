import { Box, Typography } from '@mui/material';

const styles = {textAlign:'center', color: 'red'}

function Title() {
  return (
    <Box>
      <Typography variant="h2" sx={styles}>Boatzy</Typography>
    </Box>
  );
}

export default Title;
