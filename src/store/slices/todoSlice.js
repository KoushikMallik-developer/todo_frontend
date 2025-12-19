import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from '../../utils/axios.js'
import SummaryApi from '../../utils/summary_api.js'
import { AxiosToastError } from '../../utils/axios_toast_error_handler.js'
import { cleanErrorMessage } from '../../utils/helpers.js'
import toast from 'react-hot-toast'
export const fetchTodos = createAsyncThunk(
    'fetchTodos',
    async (userData, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.allTodos,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const createTodo = createAsyncThunk(
    'createTodo',
    async (todoData, thunkAPI) => {
        const payload = {
            title: todoData['title'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.createTodo,
                data: payload,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const deleteTodo = createAsyncThunk(
    'deleteTodo',
    async (todoData, thunkAPI) => {
        const payload = {
            todo_id: todoData['todo_id'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.deleteTodo,
                data: payload,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const updateTodo = createAsyncThunk(
    'updateTodo',
    async (todoData, thunkAPI) => {
        const payload = {
            todo_id: todoData['todo_id'],
            title: todoData['title'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.updateTodo,
                data: payload,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const toggleTodo = createAsyncThunk(
    'toggleTodo',
    async (todoData, thunkAPI) => {
        const payload = {
            todo_id: todoData['todo_id'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.toggleTodo,
                data: payload,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const getTodosForDate = createAsyncThunk(
    'getTodosForDate',
    async (todoData, thunkAPI) => {
        try {
            const payload = {
                todo_id: todoData['todo_id'],
            }
            const response = await Axios({
                ...SummaryApi.fetchForDate,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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
export const getLastDaysTodos = createAsyncThunk(
    'getLastDaysTodos',
    async (thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.fetchForLastDays,
            })
            return {
                message: response.data.message,
                data: response.data.data,
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

export const getStats = createAsyncThunk('getStats', async (thunkAPI) => {
    try {
        const response = await Axios({
            ...SummaryApi.stats,
        })
        return {
            message: response.data.message,
            data: response.data.data,
            status_code: response.status,
        }
    } catch (error) {
        const errorPayload = AxiosToastError(error)
        return thunkAPI.rejectWithValue({
            message: errorPayload.message,
            status_code: error.status,
        })
    }
})

export const getInsights = createAsyncThunk('getInsights', async (thunkAPI) => {
    try {
        const response = await Axios({
            ...SummaryApi.insights,
        })
        return {
            message: response.data.message,
            data: response.data.data,
            status_code: response.status,
        }
    } catch (error) {
        const errorPayload = AxiosToastError(error)
        return thunkAPI.rejectWithValue({
            message: errorPayload.message,
            status_code: error.status,
        })
    }
})

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        lastDaysTodos: [],
        stats: {},
        insights: {},
        historyTodos: [],
        isLoading: false,
        message: null,
        status_code: null,
    },
    reducers: {
        resetMessages: (state) => {
            state.message = null
            state.status_code = null
        },
        resetTodos: (state) => {
            state.todos = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = action.payload.data ? action.payload.data : []
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todos fetched successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Todos fetched successfully')
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(getTodosForDate.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(getTodosForDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = action.payload.data ? action.payload.data : []
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todos fetched successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Todos fetched successfully')
            })
            .addCase(getTodosForDate.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(getLastDaysTodos.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(getLastDaysTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.lastDaysTodos = action.payload.data
                    ? action.payload.data
                    : []
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todos fetched successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Todos fetched successfully')
            })
            .addCase(getLastDaysTodos.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(getStats.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(getStats.fulfilled, (state, action) => {
                state.isLoading = false
                state.stats = action.payload.data
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Stats fetched successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Stats fetched successfully')
            })
            .addCase(getStats.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(getInsights.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(getInsights.fulfilled, (state, action) => {
                state.isLoading = false
                state.insights = action.payload.data
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Stats fetched successfully'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Stats fetched successfully')
            })
            .addCase(getInsights.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todo created successfully.'
                }
                state.todos = [action.payload.data, ...state.todos]
                state.status_code = action.payload.status_code
                toast.success(state.message || 'Todo created successfully.')
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                debugger
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload.data?.id
                )
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todo deleted successfully.'
                }
                state.status_code = action.payload.status_code
                toast.success(state.message || 'Todo deleted successfully.')
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                debugger
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = state.todos.map((todo) => {
                    if (todo.id === action.payload.data.id) {
                        return action.payload.data.todo
                    }
                    return todo
                })
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todo updated successfully.'
                }
                state.status_code = action.payload.status_code
                toast.success(state.message || 'Todo updated successfully.')
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
            .addCase(toggleTodo.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.todos = state.todos.map((todo) => {
                    if (todo.id === action.payload.data.id) {
                        return action.payload.data
                    }
                    return todo
                })
                state.isLoggedIn = action.payload.status_code === 200
                state.status_code = action.payload.status_code
                if (action.payload.message != null) {
                    state.message = cleanErrorMessage(action.payload.message)
                } else {
                    state.message = 'Todo toggled successfully.'
                }
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Todo toggled successfully.')
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                state.isLoading = false
                state.message = cleanErrorMessage(action.payload.message)
                state.status_code = action.payload.status_code
            })
    },
})

export const { resetMessages, resetTodos } = todoSlice.actions

export default todoSlice.reducer
