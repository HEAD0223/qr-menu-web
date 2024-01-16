import {
	Facebook,
	Flight,
	Instagram,
	Language,
	StarBorderOutlined,
	Twitter,
} from '@mui/icons-material';
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStores, updateSocials } from '../../../../../redux/slices/stores';
import './Socials.css';

export const SocialsTab = ({ selectedStore }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [website, setWebsite] = useState('');
	const [facebook, setFacebook] = useState('');
	const [instagram, setInstagram] = useState('');
	const [twitter, setTwitter] = useState('');
	const [tripAdvisor, setTripAdvisor] = useState('');
	const [customerReviews, setCustomerReviews] = useState('');

	useEffect(() => {
		if (selectedStore && selectedStore.socials.length !== 0) {
			setWebsite(selectedStore.socials[0].website);
			setFacebook(selectedStore.socials[0].facebook);
			setInstagram(selectedStore.socials[0].instagram);
			setTwitter(selectedStore.socials[0].twitter);
			setTripAdvisor(selectedStore.socials[0].tripAdvisor);
			setCustomerReviews(selectedStore.socials[0].customerReviews);
		} else {
			setWebsite('');
			setFacebook('');
			setInstagram('');
			setTwitter('');
			setTripAdvisor('');
			setCustomerReviews('');
		}
	}, [selectedStore]);

	const handleSave = async () => {
		const updatedSocials = {
			website,
			facebook,
			instagram,
			twitter,
			tripAdvisor,
			customerReviews,
		};
		const updateStore = {
			storeId: selectedStore._id,
			socials: updatedSocials,
		};

		try {
			const socialsUpdateResponse = await dispatch(updateSocials(updateStore));
			if (socialsUpdateResponse.payload.error) {
				console.error('Error updating socials:', socialsUpdateResponse.payload.error);
				toast.error(t('socialsUpdateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('socialsUpdateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching updateSocials:', error);
			toast.error(t('socialsUpdateError'), {
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
				<Typography variant="h5">{t('socials')}</Typography>
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
			<div className="socials-container">
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Website"
							variant="outlined"
							fullWidth
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Language />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Facebook"
							variant="outlined"
							fullWidth
							value={facebook}
							onChange={(e) => setFacebook(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Facebook />
										&nbsp;facebook.com/
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Instagram"
							variant="outlined"
							fullWidth
							value={instagram}
							onChange={(e) => setInstagram(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Instagram />
										&nbsp;instagram.com/
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Twitter"
							variant="outlined"
							fullWidth
							value={twitter}
							onChange={(e) => setTwitter(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Twitter />
										&nbsp;twitter.com/
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Trip Advisor"
							variant="outlined"
							fullWidth
							value={tripAdvisor}
							onChange={(e) => setTripAdvisor(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Flight />
										&nbsp;tripadvisor.com/
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Customer Reviews"
							variant="outlined"
							fullWidth
							value={customerReviews}
							onChange={(e) => setCustomerReviews(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<StarBorderOutlined />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};
