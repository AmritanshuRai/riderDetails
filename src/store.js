import { configureStore } from '@reduxjs/toolkit'

import ridersListSlice from './components/ridersList/ridersList.slice.js'
import ridersDetailsSlice from './pages/riderDetails/riderDetails.slice'
export default configureStore({
  reducer: {
    ridersList: ridersListSlice.reducer,
    ridersDetails: ridersDetailsSlice.reducer
  },
})