import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice';
const ReduxStore = configureStore({
    reducer : {
        EventManagement:ReduxSliceReducer
    }
});
export default ReduxStore