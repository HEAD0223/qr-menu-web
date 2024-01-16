import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TablesService from '../../services/TablesService';

export const addTables = createAsyncThunk('tables/addTables', async (payload) => {
	try {
		const response = await TablesService.create(payload.storeId, payload.tables);
		return response.data.tables;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const editTables = createAsyncThunk('tables/editTables', async (payload) => {
	try {
		const response = await TablesService.edit(payload.storeId, payload.table);
		return response.data.table;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const deleteTables = createAsyncThunk('tables/deleteTables', async (payload) => {
	try {
		const response = await TablesService.remove(payload.storeId, payload.tables);
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

export const fetchTables = createAsyncThunk('tables/fetchTables', async (storeId) => {
	try {
		const response = await TablesService.getTables(storeId);
		return response.data;
	} catch (error) {
		console.error('Error fetchTables:', error);
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

const initialState = {
	tables: [],
	isLoading: false,
};

const tablesSlice = createSlice({
	name: 'tables',
	initialState,
	reducers: {
		setTables: (state, action) => {
			state.tables = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTables.fulfilled, (state, action) => {
				state.tables = action.payload;
			})
			.addCase(editTables.fulfilled, (state, action) => {
				state.tables = action.payload;
			})
			.addCase(deleteTables.fulfilled, (state) => {
				state.tables = {};
			})
			.addCase(fetchTables.fulfilled, (state, action) => {
				state.tables = action.payload;
			})
			.addMatcher(
				(action) =>
					[addTables.pending, editTables.pending, fetchTables.pending].includes(action.type),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					[
						addTables.fulfilled,
						editTables.fulfilled,
						fetchTables.fulfilled,
						addTables.rejected,
						editTables.rejected,
						fetchTables.rejected,
					].includes(action.type),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { setTables, setLoading } = tablesSlice.actions;

export const tablesReducer = tablesSlice.reducer;
