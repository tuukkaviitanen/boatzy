import { Box } from '@mui/material';

const Image = ({ sx, src }) => {
  return <Box component="img" sx={sx} src={src} />;
};

export default Image;
