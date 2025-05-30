import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeopleByUrl, fetchPeopleBySearch } from '../features/thunk/peopleThunk';
import useDebounce from '../hooks/useDebounce'; 
import type { AppDispatch, RootState } from '../stores/store';

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import type { Person } from '../types';


const GetPeopleByThunk: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: peopleData, loading: isLoading, error: isError } = useSelector((state: RootState) => state.peopleThunk);
  const people = peopleData?.results || [];

  const [search, setSearch] = useState('');
  const [pageUrl, setPageUrl] = useState<string | null>('https://swapi.dev/api/people/');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(fetchPeopleBySearch(debouncedSearch));
    } else if (pageUrl) {
      dispatch(fetchPeopleByUrl(pageUrl));
    }
  }, [dispatch, debouncedSearch, pageUrl]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ maxWidth: 1100, margin: '2rem auto', p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get People Using Redux Thunk
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        value={search}
        onChange={handleFilterChange}
        fullWidth
        placeholder="Enter a name"
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.previous || null)}
          disabled={!peopleData?.previous || !!debouncedSearch || isLoading}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.next || null)}
          disabled={!peopleData?.next || !!debouncedSearch || isLoading}
        >
          Next
        </Button>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <CircularProgress size={24} />
          <Typography sx={{ ml: 2 }}>Loading...</Typography>
        </Box>
      )}

      {isError ? (
        <Typography color="error">Error: Something went wrong</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Name',
                  'Height',
                  'Mass',
                  'Hair Color',
                  'Skin Color',
                  'Eye Color',
                  'Birth Year',
                  'Gender',
                  'Created',
                  'Edited',
                  'Homeworld',
                ].map(header => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {people.length > 0 ? (
                people.map((person : Person, idx : number) => (
                  <TableRow key={person.name + idx}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.height}</TableCell>
                    <TableCell>{person.mass}</TableCell>
                    <TableCell>{person.hair_color}</TableCell>
                    <TableCell>{person.skin_color}</TableCell>
                    <TableCell>{person.eye_color}</TableCell>
                    <TableCell>{person.birth_year}</TableCell>
                    <TableCell>{person.gender}</TableCell>
                    <TableCell>{new Date(person.created).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(person.edited).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <a
                        href={person.homeworld}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    {debouncedSearch ? 'No results found' : isLoading ? 'Loading...' : 'No data'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default GetPeopleByThunk;
