import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNewAppointment, fetchAllHospitals, fetchBookingsByUserId, registerNewUserAPI, validateUserLogin } from './api';
const initialState = {
    info: {

    },
    activity: {
        loggedIn: false
    },
    bookings: [],
    hospitals: [],
    snack: {
        open: false,
        duration: 5000,
        severity: "success",
        message: "default message",
        vertical: "top",
        horizontal: "center"
    }
}
export const registerNewUserThunk = createAsyncThunk(
    'retail/signup',
    async (payload, { rejectWithValue }) => { //instead of using Promise wrapper outside of async, here using option 2, using Promise.resolve and. Promise.reject to do the same thing
        try {
            const response = await registerNewUserAPI(payload);
            if (response.success) { //this check can be omitted, await promse resolved, which guarantess response.success is true
                return Promise.resolve(response.data); //will go to thunk.fullfilled section
            }
            return rejectWithValue(response.message); //actually this line can be omitted, won't enter at all
        } catch (error) {  //ALL issues, either nextwork issur or DB related issues (be it DB query issue or DB query no isse but user already existed)
            return rejectWithValue(error.message)  //will go to thrunk.rejected section
        }
    }
);

export const userLoginThunk = createAsyncThunk(
    'retail/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await validateUserLogin(payload);
            if (response.success) { //这里倒是需要， 因为DB related issue 依然Project.resolve done by return value
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Invalid Creds!!") //这里倒是需要
        } catch (error) { //network issue
            return rejectWithValue(error.message)
        }
    }
);

export const fetchBookingsOfUserByIdThunk = createAsyncThunk(
    'retail/fetchBookingsByUserId',
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await fetchBookingsByUserId(user_id);
            if (response.success) {
                return Promise.resolve(response.data); //response.data can be null here
            }
            return rejectWithValue("Fetching bookings failed") //db issue
        } catch (error) { //network issue
            return rejectWithValue(error.message);
        }

    }
);

export const fetchAllHospitalsThunk = createAsyncThunk(
    'retail/fetchAllHospitals',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchAllHospitals();
            if (response.success) {
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Fetching Hospitals failed")
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createNewAppointmentThunk = createAsyncThunk(
    'retail/newAppointment',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await createNewAppointment(payload);
            if (response.success) {
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Failed in booking the appointment");
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const selectUserInfo = (state) => state.retail.info;
export const selectUserActivity = (state) => state.retail.activity;
export const selectUserBookings = (state) => state.retail.bookings;
export const selectRetailSnackOptions = (state) => state.retail.snack;
export const selectHospitalInfo = (state) => state.retail.hospitals;
const retailSlice = createSlice({
    name: 'retail',
    initialState,
    reducers: {
        logout(state) {
            state.info = {};
            state.activity = {
                loggedIn: false
            }
        },
        retailSnackClose(state) {
            state.snack.open = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerNewUserThunk.rejected, (state, action) => {
                console.log(action, "response");
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: action.payload ?? "New User Registration Failed!!!",
                    severity: "error"
                }
            })
            .addCase(registerNewUserThunk.fulfilled, (state, action) => {
                state.info = action.payload; //use this as a global state wide indicator for logged in - similar to token based jwt auth
                state.activity.loggedIn = true; //use this as a global state wide indicator for logged in - similar to token based jwt auth
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "New User Registration Succesfull!!!",
                    severity: "success"
                }
            })
            .addCase(userLoginThunk.fulfilled, (state, action) => {
                state.activity = { //use this as a global state wide indicator for logged in - similar to token based jwt auth
                    loggedIn: true
                }
                state.info = action.payload; //use this as a global state wide indicator for logged in - similar to token based jwt auth
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "User Login Succesfull!!!",
                    severity: "success"
                }
            })
            .addCase(userLoginThunk.rejected, (state, action) => {
                state.activity.loggedIn = false;
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Invalid Creds!!!",
                    severity: "error"
                }
            })
            .addCase(fetchBookingsOfUserByIdThunk.fulfilled, (state, action) => {
                state.bookings = action.payload.map(details => {
                    return {
                        appointmenttime: details.appointmentTime,
                        bookingtime: details.bookingTime,
                        vaccine: details.vaccine,
                        name: details.userId.username,
                        mobile: details.userId.mobile,
                        hospital: details.hospitalId.name,
                        status: details.status
                    }
                });
            })
            .addCase(fetchAllHospitalsThunk.fulfilled, (state, action) => {
                state.hospitals = action.payload
            })
            .addCase(createNewAppointmentThunk.fulfilled, (state) => {
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "Your Booking is SuccesFull!!",
                    severity: "success"
                }
            })
    }
});
export const { logout, retailSnackClose } = retailSlice.actions;
export default retailSlice.reducer;