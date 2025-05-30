import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { fetchPeople } from "../hooks/useSearch";
import type { RootState, AppDispatch } from "../stores/store";
import { setSearchQuery } from "../features/searchSlice";
import { setPeople } from "../features/peopleSlice";
import useSearch from "../hooks/useSearch";
import useGetPeople from "../hooks/useGetPeople";

import {
  TextField,
  Typography,
  Box,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

const PeopleByReactQuery: React.FC = () => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [pageUrl, setPageUrl] = useState<string | null>(null);

  const filterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.search.query);
   const peopleList = useSelector((state: RootState) => state.people.people);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (filterTimer.current) {
      clearTimeout(filterTimer.current);
    }

    if (value.trim()) {
      queryClient.prefetchQuery({
        queryKey: ["people", "search", value],
        queryFn: () => fetchPeople(value),
        staleTime: 1000 * 60 * 5,
      });
    }

    filterTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      dispatch(setSearchQuery(value));
    }, 250);
  };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearch(debouncedSearch);

  const {
    data: peopleData,
    isLoading: isPeopleLoading,
    isError: isPeopleError,
    error: peopleError,
  } = useGetPeople(pageUrl, { enabled: !debouncedSearch });

if (debouncedSearch && searchData && searchData !== peopleList) {
  dispatch(setPeople(searchData));
} else if (!debouncedSearch && peopleData?.currentPage && peopleData.currentPage !== peopleList) {
  dispatch(setPeople(peopleData.currentPage));
}

  const people = peopleList;
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
        value={search}
        onChange={handleFilterChange}
        fullWidth
        placeholder="Enter a name"
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.previous || null)}
          disabled={!peopleData?.previous || !!debouncedSearch}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPageUrl(peopleData?.next || null)}
          disabled={!peopleData?.next || !!debouncedSearch}
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
                {[
                  "Name",
                  "Height",
                  "Mass",
                  "Hair Color",
                  "Skin Color",
                  "Eye Color",
                  "Birth Year",
                  "Gender",
                  "Created",
                  "Edited",
                  "Homeworld",
                ].map((header) => (
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
                    <TableCell>{new Date(person.created).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(person.edited).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <a
                        href={person.homeworld}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2", textDecoration: "underline" }}
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    {debouncedSearch ? "No results found" : "No data"}
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