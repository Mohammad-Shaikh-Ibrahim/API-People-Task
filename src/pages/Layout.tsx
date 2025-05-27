import { Button, Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="sticky" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            API Task
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            Get People (Axios)
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/people-react-query')}
          >
            Get People (React Query)
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;