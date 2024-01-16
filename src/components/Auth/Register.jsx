import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { createUser } from '../../redux/slices/auth';

export const Register = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [accessLevel, setAccessLevel] = useState('');

	const handleSubmit = async () => {
		if (!email || !password || !firstName || !lastName || !confirmPassword || !accessLevel) {
			toast.error(t('fillWarning'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
			return;
		}

		if (password !== confirmPassword) {
			toast.error(t('passWarning'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
			return;
		}

		const combinedData = {
			email,
			password,
			firstName,
			lastName,
			accessLevel,
		};

		try {
			const userCreationResponse = await dispatch(createUser(combinedData));
			if (userCreationResponse.payload.error) {
				console.error('Error creating user:', userCreationResponse.payload.error);
				toast.error(t('createError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('createSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		} catch (error) {
			console.error('Error dispatching createUser:', error);
			toast.error(t('createError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				paddingBottom: 12,
			}}>
			<Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
				<Typography variant="h5" gutterBottom>
					{t('register')}
				</Typography>
				<TextField
					label={t('firstName')}
					fullWidth
					margin="normal"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					autoComplete="given-name"
				/>
				<TextField
					label={t('lastName')}
					fullWidth
					margin="normal"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					autoComplete="family-name"
				/>
				<TextField
					label={t('email')}
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
				/>
				<TextField
					label={t('password')}
					type={showPassword ? 'text' : 'password'}
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					InputProps={{
						endAdornment: (
							<Button
								onClick={() => setShowPassword(!showPassword)}
								style={{ minWidth: 'auto', padding: '8px', marginLeft: '8px' }}>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</Button>
						),
					}}
				/>
				<TextField
					label={t('confirmPassword')}
					type={showConfirmPassword ? 'text' : 'password'}
					fullWidth
					margin="normal"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					InputProps={{
						endAdornment: (
							<Button
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								style={{ minWidth: 'auto', padding: '8px', marginLeft: '8px' }}>
								{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
							</Button>
						),
					}}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel>{t('accessLevel')}</InputLabel>
					<Select
						value={accessLevel}
						onChange={(e) => setAccessLevel(e.target.value)}
						label={t('accessLevel')}
						inputProps={{
							autoComplete: 'off',
						}}>
						<MenuItem value="admin">{t('admin')}</MenuItem>
						<MenuItem value="user">{t('user')}</MenuItem>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					sx={{ marginTop: 2 }}
					fullWidth>
					{t('create')}
				</Button>
			</Paper>
			<ToastContainer position="bottom-right" autoClose={5000} />
		</Container>
	);
};
