import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StoresService from '../../services/StoresService';

export const createStore = createAsyncThunk('stores/createStore', async (payload) => {
	try {
		const response = await StoresService.create(
			payload.storeIndex,
			payload.storeImage,
			payload.storeName,
			payload.storeAddress,
			payload.storePhone,
			payload.storeEmail,
		);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const editStore = createAsyncThunk('stores/editStore', async (payload) => {
	try {
		const response = await StoresService.edit(
			payload.storeId,
			payload.storeImage,
			payload.storeName,
			payload.storeAddress,
			payload.storePhone,
			payload.storeEmail,
		);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const deleteStore = createAsyncThunk('stores/deleteStore', async (storeId) => {
	try {
		await StoresService.remove(storeId);
		return storeId;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateSchedule = createAsyncThunk('stores/updateSchedule', async (payload) => {
	try {
		const response = await StoresService.updateSchedule(payload.storeId, payload.schedule);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateWiFi = createAsyncThunk('stores/updateWiFi', async (payload) => {
	try {
		const response = await StoresService.updateWiFi(payload.storeId, payload.wifi);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateSocials = createAsyncThunk('stores/updateSocials', async (payload) => {
	try {
		const response = await StoresService.updateSocials(payload.storeId, payload.socials);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateOptions = createAsyncThunk('stores/updateOptions', async (payload) => {
	try {
		const response = await StoresService.updateOptions(payload.storeId, payload.options);
		return response.data.store;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateIndexes = createAsyncThunk('stores/updateIndexes', async (payload) => {
	try {
		const response = await StoresService.updateIndexes(payload.stores);
		return response.data.stores;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const fetchStores = createAsyncThunk('stores/fetchStores', async (_) => {
	try {
		const response = await StoresService.getStores();
		return response.data;
	} catch (error) {
		console.error('Error fetchStores:', error);
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

const initialState = {
	stores: [],
	isLoading: false,
};

const storesSlice = createSlice({
	name: 'stores',
	initialState,
	reducers: {
		setStore: (state, action) => {
			state.stores = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createStore.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(editStore.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(deleteStore.fulfilled, (state) => {
				state.stores = {};
			})
			.addCase(updateSchedule.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(updateWiFi.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(updateSocials.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(updateOptions.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(updateIndexes.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addCase(fetchStores.fulfilled, (state, action) => {
				state.stores = action.payload;
			})
			.addMatcher(
				(action) =>
					[
						createStore.pending,
						editStore.pending,
						updateSchedule.pending,
						updateWiFi.pending,
						updateSocials.pending,
						updateOptions.pending,
						updateIndexes.pending,
						fetchStores.pending,
					].includes(action.type),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					[
						createStore.fulfilled,
						editStore.fulfilled,
						updateSchedule.fulfilled,
						updateWiFi.fulfilled,
						updateSocials.fulfilled,
						updateOptions.fulfilled,
						updateIndexes.fulfilled,
						fetchStores.fulfilled,
						createStore.rejected,
						editStore.rejected,
						updateSchedule.rejected,
						updateWiFi.rejected,
						updateSocials.rejected,
						updateOptions.rejected,
						updateIndexes.rejected,
						fetchStores.rejected,
					].includes(action.type),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { setStore, setLoading } = storesSlice.actions;

export const storesReducer = storesSlice.reducer;
