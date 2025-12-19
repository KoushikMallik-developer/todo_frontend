export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/'

const SummaryApi = {
    register: {
        url: '/auth/v1/register',
        method: 'post',
    },
    login: {
        url: '/auth/v1/sign-in',
        method: 'post',
    },
    refreshToken: {
        url: '/auth/v1/refresh-token',
        method: 'post',
    },
    getMe: {
        url: '/auth/v1/user-details',
        method: 'get',
    },
    getUser: {
        url: '/auth/v1/user-details-by-id',
        method: 'get',
    },
    sendOtp: {
        url: '/auth/v1/send-otp',
        method: 'post',
    },
    verifyOtp: {
        url: '/auth/v1/verify-otp',
        method: 'post',
    },
    resetPassword: {
        url: '/auth/v1/reset-password',
        method: 'post',
    },
    updatePassword: {
        url: '/auth/v1/update-password',
        method: 'post',
    },
    removeUser: {
        url: '/auth/v1/remove-user',
        method: 'post',
    },
    allTodos: {
        url: '/api/all',
        method: 'get',
    },
    createTodo: {
        url: '/api/create',
        method: 'post',
    },
    updateTodo: {
        url: '/api/update',
        method: 'post',
    },
    deleteTodo: {
        url: '/api/delete',
        method: 'post',
    },
    toggleTodo: {
        url: '/api/toggle',
        method: 'post',
    },
    fetchForDate: {
        url: '/api/fetch-for-date',
        method: 'get',
    },
    fetchForLastDays: {
        url: '/api/fetch-for-last-days',
        method: 'get',
    },
    stats: {
        url: '/api/stats',
        method: 'get',
    },
    insights: {
        url: '/api/insights',
        method: 'get',
    },
}

export default SummaryApi
