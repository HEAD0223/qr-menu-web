import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import QRService from '../../services/QRService';

export const addQR = createAsyncThunk('qr/addQR', async (payload) => {
	try {
		const response = await QRService.create(payload.storeId, payload.qr_custom);
		return response.data.qr_custom;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const fetchQR = createAsyncThunk('qr/fetchQR', async (storeId) => {
	try {
		const response = await QRService.getQR(storeId);
		return response.data;
	} catch (error) {
		console.error('Error fetchQR:', error);
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

const initialState = {
	qr_custom: [],
	isLoading: false,
};

const qrSlice = createSlice({
	name: 'qr_custom',
	initialState,
	reducers: {
		setQR: (state, action) => {
			state.qr_custom = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addQR.fulfilled, (state, action) => {
				state.qr_custom = action.payload;
			})
			.addCase(fetchQR.fulfilled, (state, action) => {
				state.qr_custom = action.payload;
			})
			.addMatcher(
				(action) => [addQR.pending, fetchQR.pending].includes(action.type),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					[addQR.fulfilled, fetchQR.fulfilled, addQR.rejected, fetchQR.rejected].includes(
						action.type,
					),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { setQR, setLoading } = qrSlice.actions;

export const qrReducer = qrSlice.reducer;
