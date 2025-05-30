import { createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Person } from '../types/index'

interface PeopleState {
  people: Person[]
}

const initialState: PeopleState = {
  people: [],
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase('people/fetchPeople', (state, action: { type: 'people/fetchPeople'; payload: Person[] }) => {
      state.people = action.payload
    })
  },
})

export const peopleActions = peopleSlice.actions
export default peopleSlice.reducer