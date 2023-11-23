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



export const getStudent = createAsyncThunk('auth/getStudent', async (id, { rejectWithValue, getState, dispatch }) => {

    try {
        //getStudent
        const res = await axios.get(`/api/students/get-student/${id}`, { withCredentials: true })

        dispatch(getGroups(res.data.student.level.toString()))
        return res.data.student

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const addCompExam = createAsyncThunk('auth/addCompExam', async (data, { rejectWithValue, getState }) => {

    try {
        //addCompExam
        const res = await axios.put(`/api/students/add-comp-exam`, data, { withCredentials: true })

        return res.data.student

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const removeCompExam = createAsyncThunk('auth/addCompExam', async (data, { rejectWithValue, getState }) => {
    try {
        //removeCompExam

        const res = await axios.put(`/api/students/remove-comp-exam`, data, { withCredentials: true })

        return res.data.student

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})



export const deleteStudents = createAsyncThunk('auth/deleteStudents', async (_, { rejectWithValue, getState }) => {

    try {
        //deleteStudents
        const res = await axios.delete(`/api/students/delete-all-students`, { withCredentials: true })

        return res.data

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const addlesson = createAsyncThunk('auth/addlesson', async (data, { rejectWithValue, getState }) => {

    try {
        //addlesson
        const res = await axios.put(`/api/students/add-lesson`, data, { withCredentials: true })

        return res.data.student

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const removelesson = createAsyncThunk('auth/removelesson', async (data, { rejectWithValue, getState }) => {
    try {
        //removeCompExam

        const res = await axios.put(`/api/students/remove-lesson`, data, { withCredentials: true })

        return res.data.student

    } catch (error) {

        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }

})




export const getAnalytics = createAsyncThunk('auth/getAnalytics', async (_, { rejectWithValue, getState }) => {

    try {
        const res = await axios.get('/api/dashboard/get-analytics', { withCredentials: true })
        return res.data.data
        // [0]._id.slice(5,13)
    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})




export const getStudents = createAsyncThunk('auth/getStudents', async (data, { rejectWithValue, getState }) => {

    try {
        const res = await axios.post(`/api/students/get-students/`, data, { withCredentials: true })

        return res.data

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})




export const searchStudents = createAsyncThunk('auth/searchStudents', async (data, { rejectWithValue, getState }) => {

    try {
        const res = await axios.post(`/api/students/search-students`, data, { withCredentials: true })

        return res.data

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})




export const uplodaFile = createAsyncThunk('auth/uplodaFile', async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
        await axios.post(`/api/upload-file/upload-excel-cheat`, formData, { withCredentials: true })

        // dispatch(getStudent({ page:1}))

    } catch (error) {
        toast.error('حدث خطأ ما يرجي اعاده المحاولة')
        return rejectWithValue(error.response.data.message)
    }

})


const initstate = {
    groups: [],
    user: '',
    students: [],
    dbData: {}
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


        //uplodaFile
        builder.addCase(uplodaFile.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(uplodaFile.fulfilled, (state, action) => {

            state.isLoading = false
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(uplodaFile.rejected, (state, action) => {

            state.isLoading = false
        })


        //getAnalytics
        builder.addCase(getAnalytics.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getAnalytics.fulfilled, (state, action) => {

            state.isLoading = false
            state.dbData = action.payload

        })
        builder.addCase(getAnalytics.rejected, (state, action) => {

            state.isLoading = false
        })


        //getStudents
        builder.addCase(getStudents.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getStudents.fulfilled, (state, action) => {

            state.isLoading = false
            state.students = action.payload

        })
        builder.addCase(getStudents.rejected, (state, action) => {

            state.isLoading = false
        })

        builder.addCase(searchStudents.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(searchStudents.fulfilled, (state, action) => {

            state.isLoading = false
            state.students = action.payload

        })
        builder.addCase(searchStudents.rejected, (state, action) => {

            state.isLoading = false
        })

        //create group
        builder.addCase(createGroup.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(createGroup.fulfilled, (state, action) => {

            state.isLoading = false
            state.groups.push(action.payload)
            toast.success('تمت العمليه بنجاح')
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
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(deleteGroup.rejected, (state, action) => {

            state.isLoading = false
        })

        //get groups
        builder.addCase(getStudent.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(getStudent.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload

        })
        builder.addCase(getStudent.rejected, (state, action) => {

            state.isLoading = false
        })

        //get comp exam
        builder.addCase(addCompExam.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(addCompExam.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(addCompExam.rejected, (state, action) => {

            state.isLoading = false
        })

        //get lesson
        builder.addCase(addlesson.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(addlesson.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(addlesson.rejected, (state, action) => {

            state.isLoading = false
        })

        //get lesson
        builder.addCase(removelesson.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(removelesson.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(removelesson.rejected, (state, action) => {

            state.isLoading = false
        })
   
        //get deleteStudents
        builder.addCase(deleteStudents.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(deleteStudents.fulfilled, (state, action) => {

            state.isLoading = false
            state.students.users = []
            toast.success('تمت العمليه بنجاح')

        })
        builder.addCase(deleteStudents.rejected, (state, action) => {

            state.isLoading = false
        })
    }
})





export default AuthSlice.reducer
export const { togglePopUp } = AuthSlice.actions