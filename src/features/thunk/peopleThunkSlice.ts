import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchPeopleByUrl, fetchPeopleBySearch } from './peopleThunk';
import type { PeopleResponse, PeopleState} from '../../types/index';

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
          action: PayloadAction<PeopleResponse>
        ) => {
          state.loading = false;
          state.data = action.payload;
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
          action: PayloadAction<PeopleResponse>
        ) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPeopleBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error searching data';
      });
  },
});

export default peopleSlice.reducer;