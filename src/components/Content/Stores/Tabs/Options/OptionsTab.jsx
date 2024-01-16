import { Button, Grid, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStores, updateOptions } from '../../../../../redux/slices/stores';
import './Options.css';

export const OptionsTab = ({ selectedStore }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [enableTakeaway, setEnableTakeaway] = useState(false);
	const [enableDineIn, setEnableDineIn] = useState(false);

	useEffect(() => {
		if (selectedStore && selectedStore.options.length !== 0) {
			setEnableTakeaway(selectedStore.options[0].enableTakeaway);
			setEnableDineIn(selectedStore.options[0].enableDineIn);
		} else {
			setEnableTakeaway(false);
			setEnableDineIn(false);
		}
	}, [selectedStore]);

	const handleSave = async () => {
		const updatedOptions = {
			enableTakeaway,
			enableDineIn,
		};
		const updateStore = {
			storeId: selectedStore._id,
			options: updatedOptions,
		};

		try {
			const optionsUpdateResponse = await dispatch(updateOptions(updateStore));
			if (optionsUpdateResponse.payload.error) {
				console.error('Error updating options:', optionsUpdateResponse.payload.error);
				toast.error(t('optionsUpdateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('optionsUpdateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching updateOptions:', error);
			toast.error(t('optionsUpdateError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '25px 0',
				}}>
				<Typography variant="h5">{t('options')}</Typography>
				<div>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={handleSave}
						style={{ marginLeft: '15px' }}>
						{t('save')}
					</Button>
				</div>
			</div>
			<div className="options-container">
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<div className="options-grid">
							<Typography variant="subtitle1">{t('enableTakeaway')}</Typography>
							<Switch
								checked={enableTakeaway}
								onChange={() => setEnableTakeaway(!enableTakeaway)}
								color="primary"
							/>
						</div>
					</Grid>
					<Grid item xs={6}>
						<div className="options-grid">
							<Typography variant="subtitle1">{t('enableDineIn')}</Typography>
							<Switch
								checked={enableDineIn}
								onChange={() => setEnableDineIn(!enableDineIn)}
								color="primary"
							/>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
