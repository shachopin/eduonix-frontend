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
    async (payload, { rejectWithValue }) => {
        try {
            const response = await registerNewUserAPI(payload);
            if (response.success) {
                return Promise.resolve(response.data);
            }
            return rejectWithValue(response.message);
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const userLoginThunk = createAsyncThunk(
    'retail/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await validateUserLogin(payload);
            if (response.success) {
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Invalid Creds!!")
        } catch (error) {
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
                return Promise.resolve(response.data);
            }
            return rejectWithValue("Fetching bookings failed")
        } catch (error) {
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
                state.info = action.payload;
                state.activity.loggedIn = true;
                state.snack = {
                    ...state.snack,
                    open: true,
                    message: "New User Registration Succesfull!!!",
                    severity: "success"
                }
            })
            .addCase(userLoginThunk.fulfilled, (state, action) => {
                state.activity = {
                    loggedIn: true
                }
                state.info = action.payload;
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