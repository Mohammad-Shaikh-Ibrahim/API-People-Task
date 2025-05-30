import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PeopleResponse } from '../../types/index';
import axios from 'axios';

export const fetchPeopleByUrl = createAsyncThunk<PeopleResponse, string>(
  'people/fetchByUrl',
  async (pageUrl: string) => {
    const response = await axios.get(pageUrl);
    return {
      results: response.data.results,
      next: response.data.next,
      previous: response.data.previous,
    };
  }
);

export const fetchPeopleBySearch = createAsyncThunk<PeopleResponse, string>(
  'people/fetchBySearch',
  async (search: string) => {
    const response = await axios.get(`https://swapi.dev/api/people/?search=${search}`);
    return {
      results: response.data.results,
      next: response.data.next,
      previous: response.data.previous,
    };
  }
);