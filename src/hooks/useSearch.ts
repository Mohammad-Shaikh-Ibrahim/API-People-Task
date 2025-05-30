import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Person } from "../types/index";
import axios from "axios";

export const fetchPeopleBySearch = async (searchResult: string): Promise<Person[]> => {
  const res = await axios.get(`https://swapi.dev/api/people/?search=${searchResult}`);
  if (res.status === 200) {
    return res.data.results;
  }
  return [];
};


const useSearch = (searchResult: string): UseQueryResult<Person[]> => {
  return useQuery<Person[]>({
    queryKey: ["people", "search", searchResult],
    queryFn: () => fetchPeopleBySearch(searchResult),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, 
    enabled: !!searchResult
  });
};

export default useSearch;