import toast from 'react-hot-toast'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import SummaryApi from '../../utils/summary_api.js'
import Axios from '../../utils/axios.js'
import { AxiosToastError } from '../../utils/axios_toast_error_handler.js'
import { cleanErrorMessage } from '../../utils/helpers.js'

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'registerUser',
    async (userData, thunkAPI) => {
        const payload = {
            name: userData['name'],
            username: userData['name'],
            email: userData['email'],
            password: userData['password'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: payload,
            })
            return {
                message: response.data.message,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

export const sendPasswordResetEmail = createAsyncThunk(
    'sendPasswordResetEmail',
    async (userData, thunkAPI) => {
        const payload = {
            email: userData['email'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: payload,
            })
            return {
                message: response.data.message,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

export const updatePassword = createAsyncThunk(
    'updatePassword',
    async (userData, thunkAPI) => {
        const payload = {
            password1: userData['password1'],
            password2: userData['password2'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.updatePassword,
                data: payload,
            })
            return {
                message: response.data.message,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for registration
export const verifyOTP = createAsyncThunk(
    'verifyOTP',
    async (userData, thunkAPI) => {
        const payload = {
            email: userData['email'],
            otp: userData['otp'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.verifyOtp,
                data: payload,
            })
            return {
                message: response.data.message,
                token: response.data?.token?.access,
                refresh: response.data?.token?.refresh,
                status_code: response.status, // Include token if login is successful
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (userData, thunkAPI) => {
        const payload = {
            email: userData['email'],
            password: userData['password'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: payload,
            })
            return {
                message: response.data.message,
                token: response.data?.token?.access,
                refresh: response.data?.token?.refresh,
                status_code: response.status, // Include token if login is successful
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for getting user details
export const getUserDetails = createAsyncThunk(
    'getUserDetails',
    async (thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getMe,
            })
            return {
                message: 'User details fetched successfully',
                user: response.data,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for search users
export const searchAllUsers = createAsyncThunk(
    'searcAllhUsers',
    async ({ query }, thunkAPI) => {
        try {
            const payload = {
                query: query,
            }
            const response = await Axios({
                ...SummaryApi.searchAllUsers,
                data: payload,
            })
            return {
                message: 'Search Results fetched successfully',
                users: response.data,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
) // Async thunk for search users in Workspace

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentAuthForm: 'login',
        user: null,
        searchedUsers: [],
        isLoggedIn: false,
        token: null,
        refresh_token: null,
        isLoading: false,
        message: null,
        status_code: null,
    },
    reducers: {
        setCurrentAuthForm: (state, action) => {
            state.currentAuthForm = action.payload
        },
        resetCurrentAuthForm: (state) => {
            state.currentAuthForm = 'login'
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.refresh_token = null
            state.isLoggedIn = false
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            clearSocketListeners()
        },
        resetAuthState: (state) => {
            state.message = null
            state.status_code = null
            state.isLoggedIn = false
        },
        resetMessages: (state) => {
            state.message = null
            state.status_code = null
        },
        setMessageAndStatusCode: (state, action) => {
            state.message = cleanErrorMessage(action.payload.message)
            state.status_code = action.payload.status_code
            toast.error(state.message)
        },
        resetSearchedUsers: (state) => {
            state.searchedUsers = []
        },
    },
    extraReducers: (builder) => {
        builder
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
                state.refresh_token = action.payload.refresh
                state.user = null
                state.isLoggedIn = action.payload.status_code === 200
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Logged in successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Logged in successfully')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message =
                        'User registration successful. Please login.'
                }
                state.status_code = action.payload.status_code
                toast.success(
                    state.message ||
                        'User registration successful. Please login.'
                )
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(sendPasswordResetEmail.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message =
                        'An email with password reset link sent successfully.'
                }
                state.status_code = action.payload.status_code
                toast.success(
                    state.message ||
                        'An email with password reset link sent successfully.'
                )
            })
            .addCase(sendPasswordResetEmail.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message =
                        'Password updated successfully. Please login.'
                }
                state.status_code = action.payload.status_code
                toast.success(
                    state.message ||
                        'Password updated successfully. Please login.'
                )
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(verifyOTP.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
                state.refresh_token = action.payload.refresh
                state.user = null
                state.isLoggedIn = action.payload.status_code === 200
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message =
                        'User registration successful. Please login.'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(
                    state.message ||
                        'User registration successful. Please login.'
                )
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'User details fetched successfully.'
                }
                state.user = action.payload.user
                state.status_code = action.payload.status_code
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(searchAllUsers.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(searchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Search Results fetched successfully.'
                }
                state.searchedUsers = action.payload.users
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(searchAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
    },
})

export const {
    logout,
    resetAuthState,
    setMessageAndStatusCode,
    resetMessages,
    setCurrentAuthForm,
    resetCurrentAuthForm,
    resetSearchedUsers,
} = authSlice.actions

export default authSlice.reducer
