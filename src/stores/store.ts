import { configureStore } from '@reduxjs/toolkit';
import  peopleReducer  from '../features/peopleSlice';
import searchReducer from '../features/searchSlice';
export const store = configureStore({
  reducer: {
    people: peopleReducer,
    search: searchReducer,
  },
});

// Types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;