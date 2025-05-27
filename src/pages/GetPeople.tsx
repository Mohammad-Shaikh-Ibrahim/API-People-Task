import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Person } from '../types/index';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box,TextField
} from '@mui/material';

const GetPeople: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('https://swapi.dev/api/people/');
  const [filter, setFilter] = useState<string>("");
  
  const filteredPeople = people?.filter(
      (person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get(currentUrl)
      .then(response => {
        setPeople(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [currentUrl]);

  return (
    <Box sx={{ maxWidth: 1100, margin: '2rem auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get People Using Axios
      </Typography>
      <TextField
              label="Search by name"
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, my: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => prevPage && setCurrentUrl(prevPage)}
          disabled={!prevPage}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => nextPage && setCurrentUrl(nextPage)}
          disabled={!nextPage}
        >
          Next
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Mass</TableCell>
              <TableCell>Hair Color</TableCell>
              <TableCell>Skin Color</TableCell>
              <TableCell>Eye Color</TableCell>
              <TableCell>Birth Year</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Edited</TableCell>
              <TableCell>Homeworld</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {filteredPeople && filteredPeople.length > 0 ? (
              filteredPeople.map((person, idx) => (
                <TableRow key={idx}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.height}</TableCell>
                  <TableCell>{person.mass}</TableCell>
                  <TableCell>{person.hair_color}</TableCell>
                  <TableCell>{person.skin_color}</TableCell>
                  <TableCell>{person.eye_color}</TableCell>
                  <TableCell>{person.birth_year}</TableCell>
                  <TableCell>{person.gender}</TableCell>
                  <TableCell>{new Date(person.created).toLocaleString()}</TableCell>
                  <TableCell>{new Date(person.edited).toLocaleString()}</TableCell>
                  <TableCell>
                    <a href={person.homeworld} target="_blank" rel="noopener noreferrer">
                      Homeworld
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No people found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer> 
    </Box>
  );
};

export default GetPeople;