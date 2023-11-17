import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import dashboardReducer from './dashboardSlice'
const Store = configureStore({
    reducer:{Auth:authReducer,Dashboard:dashboardReducer}
})

export default Store