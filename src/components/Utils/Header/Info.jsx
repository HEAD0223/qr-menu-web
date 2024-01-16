import {
	AlarmOutlined,
	Facebook,
	Flight,
	Instagram,
	Language,
	LocationOnOutlined,
	StarOutlineOutlined,
	Twitter,
} from '@mui/icons-material';
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../../../redux/slices/stores';

export const Info = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const stores = useSelector((state) => state.stores.stores);
	const [selectedSchedule, setSelectedSchedule] = useState([]);

	useEffect(() => {
		dispatch(fetchStores());
	}, [dispatch]);

	const handleToggleSchedules = (schedule) => {
		if (selectedSchedule === schedule) {
			setSelectedSchedule([]);
		} else {
			setSelectedSchedule(schedule);
		}
	};

	return (
		<Container>
			<Typography display={'flex'} justifyContent={'center'} marginBottom={2} variant="h4">
				{t('info')}
			</Typography>
			<div className={`stores-grid ${stores.length === 1 ? 'center' : 'multiple'}`}>
				{stores.map((store, index) => (
					<Box key={index} sx={{ marginBottom: 2 }}>
						<Grid container spacing={2} justifyContent={'center'}>
							<Grid item xs={12} md={4} key={store._id}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
											gap: 0.2,
											marginTop: 2,
										}}>
										{store.image && (
											<div className="uploaded-image">
												<img src={store.image} alt="Uploaded Logo" />
											</div>
										)}
										<Typography variant="h6">{store.name}</Typography>
										<Typography>{store.address}</Typography>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<IconButton
												color="primary"
												component="a"
												href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
													store.address,
												)}`}>
												<LocationOnOutlined />
											</IconButton>
											<IconButton
												color="primary"
												onClick={() => handleToggleSchedules(store.schedule)}>
												<AlarmOutlined />
											</IconButton>
										</Box>
										<a
											href={`tel:${store.phone}`}
											style={{
												textDecoration: 'none',
												color: '#1976D2',
												display: 'flex',
												alignItems: 'center',
											}}>
											{store.phone}
										</a>
										<a
											href={`mailto:${store.email}`}
											style={{
												textDecoration: 'none',
												color: '#1976D2',
												display: 'flex',
												alignItems: 'center',
											}}>
											{store.email}
										</a>
									</Box>
									<Box
										sx={{
											display: 'flex',
											gap: 1,
											marginTop: 2,
											marginBottom: 2,
											justifyContent: 'center',
										}}>
										{store.socials[0]?.website && (
											<IconButton color="primary" href={`${store.socials[0].website}`}>
												<Language />
											</IconButton>
										)}
										{store.socials[0]?.facebook && (
											<IconButton
												color="primary"
												href={`facebook.com/${store.socials[0].facebook}`}>
												<Facebook />
											</IconButton>
										)}
										{store.socials[0]?.instagram && (
											<IconButton
												color="primary"
												href={`instagram.com/${store.socials[0].instagram}`}>
												<Instagram />
											</IconButton>
										)}
										{store.socials[0]?.twitter && (
											<IconButton
												color="primary"
												href={`twitter.com/${store.socials[0].twitter}`}>
												<Twitter />
											</IconButton>
										)}
										{store.socials[0]?.tripAdvisor && (
											<IconButton
												color="primary"
												href={`tripadvisor.com/${store.socials[0].tripAdvisor}`}>
												<Flight />
											</IconButton>
										)}
										{store.socials[0]?.customerReviews && (
											<IconButton
												color="primary"
												href={`${store.socials[0].customerReviews}`}>
												<StarOutlineOutlined />
											</IconButton>
										)}
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				))}
			</div>
			{/* Display the selected schedule below the grid */}
			{selectedSchedule.length > 0 && (
				<div className="selected-schedule">
					{selectedSchedule.map((daySchedule) =>
						daySchedule.enabled ? (
							<div key={daySchedule._id} className="schedule-item">
								<div className="day">{daySchedule.day}:</div>
								<div className="time">
									{daySchedule.openingTime} - {daySchedule.closingTime}
								</div>
							</div>
						) : null,
					)}
				</div>
			)}
		</Container>
	);
};
