import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box component="main" sx={{ width: '100%', minHeight: '100vh' }}>
      <Outlet />
    </Box>
  );
};

export default Layout;
