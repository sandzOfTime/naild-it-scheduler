import { createSlice } from '@reduxjs/toolkit'


type SplashState = {
    hasBeenOpened: boolean
};


const initialState: SplashState = {
    hasBeenOpened: false
}


export const splashSlice = createSlice({
    name: 'splash',
    initialState,
    reducers: {
        markAsOpen: (state) => {
            state.hasBeenOpened = true
        }
    }
})


export const { markAsOpen } = splashSlice.actions

export default splashSlice.reducer