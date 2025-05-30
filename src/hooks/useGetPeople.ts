import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { PeopleResponse } from "../types/index";
import axios from "axios";

const fetchPeopleByUrl = async (pageUrl: string | null): Promise<PeopleResponse> => {
  const url = pageUrl || "https://swapi.dev/api/people/?page=1";
  const res = await axios.get(url);
  return {
    results: res.data.results,
    next: res.data.next,
    previous: res.data.previous,
  };
};

interface UseGetPeopleOptions {
  enabled?: boolean;
}

const useGetPeople = (
  pageUrl: string | null,
  options?: UseGetPeopleOptions
): UseQueryResult<PeopleResponse> => {
  return useQuery<PeopleResponse>({
    queryKey: ["people", pageUrl],
    queryFn: () => fetchPeopleByUrl(pageUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
  });
};

export default useGetPeople;
