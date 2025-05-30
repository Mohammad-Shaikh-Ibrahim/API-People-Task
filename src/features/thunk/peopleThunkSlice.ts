import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchPeopleByUrl, fetchPeopleBySearch } from './peopleThunk';
import type { PeopleState, Person } from '../../types/index';

const initialState: PeopleState = {
  data: null,
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: 'peopleReduxThunk',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPeopleByUrl.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPeopleByUrl.fulfilled,
        (
          state,
          action: PayloadAction<{ results: Person[]; next: string | null; previous: string | null }>
        ) => {
          state.loading = false;
          state.data = {
            results: action.payload.results,
            next: action.payload.next,
            previous: action.payload.previous,
          };
        }
      )
      .addCase(fetchPeopleByUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch people';
      })
      .addCase(fetchPeopleBySearch.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchPeopleBySearch.fulfilled,
        (
          state,
          action: PayloadAction<{ results: Person[]; next: string | null; previous: string | null }>
        ) => {
          state.loading = false;
          state.data = {
            results: action.payload.results,
            next: action.payload.next,
            previous: action.payload.previous,
          };
        }
      )
      .addCase(fetchPeopleBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error searching data';
      });
  },
});

export default peopleSlice.reducer;