import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBookings, validateAdminLogin } from './api';
const initialState = {
    bookings:[],
    activity:{
        adminLoggedIn: false
    }
};

export const selectAllBookings = (state)=>state.admin.bookings;
export const selectAdminActivity = (state)=>state.admin.activity;
export const adminLoginThunk = createAsyncThunk(
    'admin/login',
    async (payload, { rejectWithValue }) => {
        try {
            
        const response = await validateAdminLogin(payload);
        if (response.success) {
            return Promise.resolve(response.data);
        }
        return rejectWithValue("Invalid Creds!!")
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchAllBookingsThunk = createAsyncThunk(
    'admin/fetchAllBookings',
    async(payload, {rejectWithValue})=>{
        try {
            const response = await fetchAllBookings();
            if(response.success){
                return response.data;
            }
            rejectWithValue();
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        viewBooking(){

        },
        editBooking(){

        },
        logout(state){
            state.activity.adminLoggedIn = false;
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllBookingsThunk.fulfilled,  (state, action)=>{
            state.bookings = action.payload
        })
        .addCase(adminLoginThunk.fulfilled,(state, action)=>{
            state.activity.adminLoggedIn = true
        })
    }
});

export const { login, viewBooking, editBooking, logout } = adminSlice.actions;
export default adminSlice.reducer;