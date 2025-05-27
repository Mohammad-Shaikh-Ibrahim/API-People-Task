import { useState } from "react";
import {
  TextField, Typography, Box, CircularProgress, Button, Table, TableHead,
  TableRow, TableCell, TableBody, TableContainer, Paper
} from "@mui/material";
import useSearch from "../hooks/useSearch";
import useGetPosts from "../hooks/useGetPeople";

let debounceTimer: ReturnType<typeof setTimeout>;

const PeopleByReactQuery = () => {
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<string>("");
  const [pageUrl, setPageUrl] = useState<string | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedFilter(value);
    }, 500);
  };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError
  } = useSearch(debouncedFilter);

  const {
    data: peopleData,
    isLoading: isPeopleLoading,
    isError: isPeopleError,
    error: peopleError
  } = useGetPosts(pageUrl);

  const people = debouncedFilter ? searchData : peopleData?.results;
  const isLoading = isSearchLoading || isPeopleLoading;
  const isError = isSearchError || isPeopleError;
  const error = searchError || peopleError;

  return (
    <Box sx={{ maxWidth: 1100, margin: "2rem auto", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get People Using React Query
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        placeholder="Enter a name"
        sx={{ mb: 3 }}
        autoFocus
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.previous || null)}
          disabled={!peopleData?.previous || !!debouncedFilter}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.next || null)}
          disabled={!peopleData?.next || !!debouncedFilter}
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
        <Typography color="error">
          Error: {(error as Error)?.message || "Something went wrong"}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Height", "Mass", "Hair Color", "Skin Color", "Eye Color", "Birth Year", "Gender", "Created", "Edited", "Homeworld"]
                  .map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {people && people.length > 0 ? (
                people.map((person, idx) => (
                  <TableRow key={person.name + idx}>
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
                  <TableCell colSpan={11} align="center">
                    {debouncedFilter ? "No results found" : "No data"}
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

export default PeopleByReactQuery;
