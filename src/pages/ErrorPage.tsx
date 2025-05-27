import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;