import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStores, updateSchedule } from '../../../../../redux/slices/stores';
import './Schedule.css';

export const ScheduleTab = ({ selectedStore }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [days, setDays] = useState([
		{ day: t('monday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('tuesday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('wednesday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('thursday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('friday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('saturday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
		{ day: t('sunday'), enabled: true, openingTime: '00:00', closingTime: '23:59' },
	]);

	useEffect(() => {
		if (selectedStore && selectedStore.schedule.length !== 0) {
			const updatedDays = selectedStore.schedule.map((day) => ({
				day: day.day,
				enabled: day.enabled,
				openingTime: day.openingTime,
				closingTime: day.closingTime,
			}));
			setDays(updatedDays);
		}
	}, [selectedStore]);

	const handleToggleDay = (index) => {
		const updatedDays = [...days];
		updatedDays[index].enabled = !updatedDays[index].enabled;
		setDays(updatedDays);
	};

	const handleTimeChange = (index, field, value) => {
		const updatedDays = [...days];
		updatedDays[index][field] = value;
		setDays(updatedDays);
	};

	const handleSaveChanges = async () => {
		const updatedSchedule = days.map((day) => ({
			day: day.day,
			enabled: day.enabled,
			openingTime: day.openingTime,
			closingTime: day.closingTime,
		}));

		const updateStore = {
			storeId: selectedStore._id,
			schedule: updatedSchedule,
		};
		try {
			const scheduleUpdateResponse = await dispatch(updateSchedule(updateStore));
			if (scheduleUpdateResponse.payload.error) {
				console.error('Error updating schedule:', scheduleUpdateResponse.payload.error);
				toast.error(t('scheduleUpdateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('scheduleUpdateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching updateSchedule:', error);
			toast.error(t('scheduleUpdateError'), {
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
				<Typography variant="h5">{t('schedule')}</Typography>
				<div>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={handleSaveChanges}
						style={{ marginLeft: '15px' }}>
						{t('save')}
					</Button>
				</div>
			</div>
			<div className="schedule-container">
				{days.map((day, index) => (
					<div key={day.day} className="day-container">
						<div className="day-name">
							<div className="switch-container">
								<IconButton
									onClick={() => handleToggleDay(index)}
									color={day.enabled ? 'primary' : 'default'}>
									{day.enabled ? <CheckCircleOutline /> : <CancelOutlined />}
								</IconButton>
							</div>
							<Typography variant="h6">{day.day}</Typography>
						</div>
						<div>
							<Grid container justifyContent="flex-end" alignItems="center" spacing={3}>
								<Grid item>
									<TextField
										type="time"
										value={day.openingTime}
										onChange={(e) =>
											handleTimeChange(index, 'openingTime', e.target.value)
										}
										inputProps={{ step: 900 }}
										fullWidth
									/>
								</Grid>
								<Grid item>
									<TextField
										type="time"
										value={day.closingTime}
										onChange={(e) =>
											handleTimeChange(index, 'closingTime', e.target.value)
										}
										inputProps={{ step: 900 }}
										fullWidth
									/>
								</Grid>
							</Grid>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
