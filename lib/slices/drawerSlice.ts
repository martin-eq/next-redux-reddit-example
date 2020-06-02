import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StateType = {
  drawer: {
    mobileOpen: boolean
  }
}

const counterSlice = createSlice({
  name: 'drawer',
  initialState: {
    mobileOpen: false,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    toggleDrawer: (state) => {
      state.mobileOpen = !state.mobileOpen
    },
    setDrawer: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload
    },
  },
})

/**
 * Extract count from root state
 *
 * @param   {Object} state The root state
 * @returns {boolean} Whether the drawer is opened or not
 */
export const selectMobileOpen = (state: StateType): boolean =>
  state.drawer.mobileOpen

export const { toggleDrawer, setDrawer } = counterSlice.actions

export default counterSlice.reducer
