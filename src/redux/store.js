import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { categoriesReducer } from './slices/categories';
import { qrReducer } from './slices/qr';
import { storesReducer } from './slices/stores';
import { tablesReducer } from './slices/tables';

const store = configureStore({
	reducer: {
		auth: authReducer,
		stores: storesReducer,
		tables: tablesReducer,
		qr_custom: qrReducer,
		categories: categoriesReducer,
	},
});

export default store;
