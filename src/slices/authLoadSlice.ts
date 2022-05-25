import { createSlice } from '@reduxjs/toolkit'


type LoadState = {
    loading: boolean
};


const initialState: LoadState = {
    loading: false
}


export const authLoadSplice = createSlice({
    name: 'authLoad',
    initialState,
    reducers: {
        loadSpinner: (state) => {
            state.loading = true
        },
        stopSpinner: (state) => {
            state.loading = false
        }
    }
})


export const { loadSpinner, stopSpinner } = authLoadSplice.actions

export default authLoadSplice.reducer