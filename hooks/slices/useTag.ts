import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/hooks/store'

// Define a type for the slice state
interface TagState {
  value: string
}

// Define the initial state using that type
const initialState: TagState = {
  value: ""
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    // Define a setTag reducer with a PayloadAction to set the tag value
    setTag: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

// Export the setTag action
export const { setTag } = tagSlice.actions

// Selector to get the tag value from the state
export const selectTag = (state: RootState) => state.tag.value

// Export the reducer
export default tagSlice.reducer
