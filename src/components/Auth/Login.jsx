import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../../redux/slices/auth';

export const Login = () => {
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = async () => {
		if (!email || !password) {
			toast.error(t('fillWarning'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
			return;
		}

		const combinedData = {
			email,
			password,
		};

		try {
			const userLoginResponse = await dispatch(loginUser(combinedData));
			if (userLoginResponse.payload.error) {
				console.error('Error logging in:', userLoginResponse.payload.error);
				toast.error(t('loginError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('loginSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			}
		} catch (error) {
			console.error('Error dispatching loginUser:', error);
			toast.error(t('loginError'), {
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
					{t('login')}
				</Typography>
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
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					sx={{ marginTop: 2 }}
					fullWidth>
					{t('enter')}
				</Button>
			</Paper>
			<ToastContainer position="bottom-right" autoClose={5000} />
		</Container>
	);
};
