import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Person } from "../types/index";
import axios from "axios";

const fetchPeople = async (q: string): Promise<Person[]> => {
  const res = await axios.get(`https://swapi.dev/api/people/?search=${q}`);
  if (res.status === 200) {
    return res.data.results;
  }
  return [];
};


const useSearch = (q: string): UseQueryResult<Person[]> => {
  return useQuery<Person[]>({
    queryKey: ["people", "search", q],
    queryFn: () => fetchPeople(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.length > 0, 
    refetchInterval: 1000 * 60 * 5, 
  });
};

export default useSearch;