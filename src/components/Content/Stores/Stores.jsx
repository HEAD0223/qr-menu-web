import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/slices/auth';
import { fetchStores } from '../../../redux/slices/stores';
import { fetchTables } from '../../../redux/slices/tables';
import { StoresLeftSide } from './Layout/StoresLeftSide';
import { StoresRightSide } from './Layout/StoresRightSide';

export const Stores = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const stores = useSelector((state) => state.stores.stores);
	const tables = useSelector((state) => state.tables);
	const users = useSelector((state) => state.auth);
	const [selectedStore, setSelectedStore] = useState(null);

	useEffect(() => {
		dispatch(fetchStores());
	}, [dispatch]);

	const handleStoreSelect = (store) => {
		setSelectedStore(store);
		dispatch(fetchTables(store._id));
		dispatch(fetchUsers(store._id));
	};

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<StoresLeftSide
				title={t('storesLeftSide')}
				stores={stores}
				selectedStore={selectedStore}
				setSelectedStore={setSelectedStore}
				onStoreSelect={handleStoreSelect}
			/>
			<StoresRightSide
				title={t('storesRightSide')}
				selectedStore={selectedStore}
				tables={tables}
				users={users}
			/>
		</div>
	);
};
