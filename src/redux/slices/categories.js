import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesService from '../../services/CategoriesService';

export const createCategory = createAsyncThunk('categories/createCategory', async (payload) => {
	try {
		const response = await CategoriesService.create(
			payload.categoryIndex,
			payload.categoryName,
			payload.categoryDescription,
			payload.categoryVisibility,
			payload.categoryStores,
			payload.categoryModifiers,
		);
		return response.data.category;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const editCategory = createAsyncThunk('categories/editCategory', async (payload) => {
	try {
		const response = await CategoriesService.edit(
			payload.categoryId,
			payload.categoryName,
			payload.categoryDescription,
			payload.categoryStores,
			payload.categoryModifiers,
		);
		return response.data.category;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
	try {
		await CategoriesService.remove(categoryId);
		return categoryId;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateIndexes = createAsyncThunk('categories/updateIndexes', async (payload) => {
	try {
		const response = await CategoriesService.updateIndexes(payload.categories);
		return response.data.categories;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const updateVisibility = createAsyncThunk('categories/updateVisibility', async (payload) => {
	try {
		const response = await CategoriesService.updateVisibility(
			payload.categoryId,
			payload.visibility,
		);
		return response.data.category;
	} catch (error) {
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_) => {
	try {
		const response = await CategoriesService.getCategories();
		return response.data;
	} catch (error) {
		console.error('Error fetchCategories:', error);
		const errorObject = {
			message: error.message,
			name: error.name,
			code: error.code,
		};
		return { error: errorObject };
	}
});

const initialState = {
	categories: [],
	isLoading: false,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.categories = action.payload;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCategory.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(deleteCategory.fulfilled, (state) => {
				state.categories = {};
			})
			.addCase(updateIndexes.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(updateVisibility.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addMatcher(
				(action) =>
					[
						createCategory.pending,
						editCategory.pending,
						updateIndexes.pending,
						updateVisibility.pending,
						fetchCategories.pending,
					].includes(action.type),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				(action) =>
					[
						createCategory.fulfilled,
						editCategory.fulfilled,
						updateIndexes.fulfilled,
						updateVisibility.fulfilled,
						fetchCategories.fulfilled,
						createCategory.rejected,
						editCategory.rejected,
						updateIndexes.rejected,
						updateVisibility.rejected,
						fetchCategories.rejected,
					].includes(action.type),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { setCategory, setLoading } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
