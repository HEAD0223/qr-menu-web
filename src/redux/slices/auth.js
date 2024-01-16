import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../axios';
import AuthService from '../../services/AuthService';

export const createUser = createAsyncThunk('auth/createUser', async (payload) => {
	try {
		const response = await AuthService.registration(
			payload.firstName,
			payload.lastName,
			payload.email,
			payload.password,
			payload.accessLevel,
			payload.storeId,
		);
		localStorage.setItem('token', response.data.accessToken);
		return response.data.user;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const loginUser = createAsyncThunk('auth/loginUser', async (payload) => {
	try {
		const response = await AuthService.login(payload.email, payload.password);
		localStorage.setItem('token', response.data.accessToken);
		return response.data.user;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	await AuthService.logout();
	localStorage.removeItem('token');
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
	const response = await axios.get(`${API_URL}/refresh`, {
		withCredentials: true,
	});
	localStorage.setItem('token', response.data.accessToken);
	return response.data.user;
});

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (storeId) => {
	try {
		const response = await AuthService.getUsers(storeId);
		return response.data;
	} catch (error) {
		console.error('Error fetchUsers:', error);
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const editUser = createAsyncThunk('auth/editUser', async (user) => {
	try {
		const response = await AuthService.editUser(user);
		return response.data;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId) => {
	try {
		const response = await AuthService.deleteUser(userId);
		return response.data;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

const initialState = {
	user: [],
	isAuth: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuth = false;
				state.user = {};
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(editUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addMatcher(
				(action) =>
					[
						createUser.pending,
						loginUser.pending,
						checkAuth.pending,
						fetchUsers.pending,
						editUser.pending,
						deleteUser.pending,
					].includes(action.type),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					[
						createUser.fulfilled,
						loginUser.fulfilled,
						fetchUsers.fulfilled,
						editUser.fulfilled,
						deleteUser.fulfilled,
						createUser.rejected,
						loginUser.rejected,
						fetchUsers.rejected,
						editUser.rejected,
						deleteUser.rejected,
					].includes(action.type),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { setAuth, setUser, setLoading } = authSlice.actions;

export const authReducer = authSlice.reducer;
