import { Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionsTab } from '../Tabs/Options/OptionsTab';
import { ScheduleTab } from '../Tabs/Schedule/ScheduleTab';
import { SocialsTab } from '../Tabs/Socials/SocialsTab';
import { TablesTab } from '../Tabs/Tables/TablesTab';
import { UsersTab } from '../Tabs/Users/UsersTab';
import { WiFiTab } from '../Tabs/WiFi/WiFiTab';
import './StoresLayout.css';

export const StoresRightSide = ({ title, users, selectedStore, tables }) => {
	const { t } = useTranslation();
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<div style={{ flex: 1, padding: '20px' }}>
			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>
			{selectedStore ? (
				<div className="store-details">
					<Typography variant="h7">{selectedStore.name}</Typography>
				</div>
			) : (
				<div className="no-store-selected">
					<Typography variant="body1">{t('storeSelectedEmpty')}</Typography>
				</div>
			)}
			<div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					variant="scrollable">
					<Tab label={t('tables')} disabled={!selectedStore} />
					<Tab label={t('users')} disabled={!selectedStore} />
					<Tab label={t('schedule')} disabled={!selectedStore} />
					<Tab label={t('socials')} disabled={!selectedStore} />
					<Tab label={t('wifi')} disabled={!selectedStore} />
					<Tab label={t('options')} disabled={!selectedStore} />
				</Tabs>
			</div>
			<div>
				{selectedTab === 0 && <TablesTab selectedStore={selectedStore} tables={tables} />}
				{selectedTab === 1 && <UsersTab selectedStore={selectedStore} users={users} />}
				{selectedTab === 2 && <ScheduleTab selectedStore={selectedStore} />}
				{selectedTab === 3 && <SocialsTab selectedStore={selectedStore} />}
				{selectedTab === 4 && <WiFiTab selectedStore={selectedStore} />}
				{selectedTab === 5 && <OptionsTab selectedStore={selectedStore} />}
			</div>
		</div>
	);
};
