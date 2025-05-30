import { configureStore } from '@reduxjs/toolkit';
import  peopleReducer  from '../features/query/peopleSlice';
import searchReducer from '../features/query/searchSlice';
import peopleThunkReducer from '../features/thunk/peopleThunkSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    search: searchReducer,
    peopleThunk: peopleThunkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;