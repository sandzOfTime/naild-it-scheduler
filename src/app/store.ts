import { configureStore } from '@reduxjs/toolkit'
import splashReducer from '../slices/splashSlice'
import authLoadReducer from '../slices/authLoadSlice'


const store = configureStore({
    reducer: {
        splash: splashReducer,
        authLoad: authLoadReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;