import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"










export const createGroup = createAsyncThunk('auth/createGroup', async (data, { rejectWithValue, getState }) => {

    try {
        //createGroup
        const res = await axios.post(`/api/groups/add-group`, data, { withCredentials: true })

        return res.data.group

    } catch (error) {
        
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})






export const getGroups = createAsyncThunk('auth/getGroups', async (data, { rejectWithValue, getState }) => {

    try {
        //getGroups
        const res = await axios.get(`/api/groups/get-groups/${data}`, { withCredentials: true })

        return res.data.groups

    } catch (error) {
        
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const deleteGroup = createAsyncThunk('auth/deleteGroup', async (data, { rejectWithValue, getState }) => {

    try {
        //deleteGroup
        const res = await axios.delete(`/api/groups/delete-group/${data}`, { withCredentials: true })

        return res.data

    } catch (error) {
        
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})










const initstate = {
    groups: [],
    
}

const AuthSlice = createSlice({
    name: "group",
    initialState: initstate,
    reducers: {
        togglePopUp: (state, action) => {
            state.popup.show = !state.popup.show
            state.popup.value = action.payload   
        },

    },
    extraReducers: (builder) => {
        //create group
        builder.addCase(createGroup.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(createGroup.fulfilled, (state, action) => {

            state.isLoading = false
            state.groups.push(action.payload)
            toast.success('تم العمليه بنجاح')
        })
        builder.addCase(createGroup.rejected, (state, action) => {

            state.isLoading = false
        })
    
        //get groups
        builder.addCase(getGroups.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getGroups.fulfilled, (state, action) => {

            state.isLoading = false
            state.groups = action.payload
        })
        builder.addCase(getGroups.rejected, (state, action) => {

            state.isLoading = false
        })
    
        //get groups
        builder.addCase(deleteGroup.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(deleteGroup.fulfilled, (state, action) => {

            state.isLoading = false
            state.groups = state.groups.filter(item => item._id !== action.payload.id)
            toast.success('تم العمليه بنجاح')

        })
        builder.addCase(deleteGroup.rejected, (state, action) => {

            state.isLoading = false
        })
    }
})





export default AuthSlice.reducer
export const { togglePopUp } = AuthSlice.actions