import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { PeopleResponse } from "../types/index";
import axios from "axios";



const fetchPeople = async (pageUrl: string | null): Promise<PeopleResponse> => {
  const url = pageUrl || "https://swapi.dev/api/people/";
  const res = await axios.get(url);
  return {
    results: res.data.results,
    next: res.data.next,
    previous: res.data.previous,
  };
};

const useGetPosts = (pageUrl: string | null): UseQueryResult<PeopleResponse> => {
  return useQuery<PeopleResponse>({
    queryKey: ["people", pageUrl],
    queryFn: () => fetchPeople(pageUrl),
    staleTime: 1000 * 60 * 5,
    
  });
};

export default useGetPosts;