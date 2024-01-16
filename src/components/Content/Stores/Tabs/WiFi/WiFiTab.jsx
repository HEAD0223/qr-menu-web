import { SaveAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchStores, updateWiFi } from '../../../../../redux/slices/stores';
import './WiFi.css';

export const WiFiTab = ({ selectedStore }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);

	const [encryptionType, setEncryptionType] = useState('');
	const [ssid, setSSID] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (selectedStore && selectedStore.wifi.length !== 0) {
			setEncryptionType(selectedStore.wifi[0].encryptionType);
			setSSID(selectedStore.wifi[0].ssid);
			setPassword(selectedStore.wifi[0].password);
		} else {
			setEncryptionType('');
			setSSID('');
			setPassword('');
		}
	}, [selectedStore]);

	const generateQRCodeData = () => {
		const wifiData = `WIFI:S:${ssid};T:${encryptionType};P:${password};;`;
		return wifiData;
	};

	const handleSave = async () => {
		const updatedWifi = {
			encryptionType,
			ssid,
			password,
		};
		const updateStore = {
			storeId: selectedStore._id,
			wifi: updatedWifi,
		};

		try {
			const wifiUpdateResponse = await dispatch(updateWiFi(updateStore));
			if (wifiUpdateResponse.payload.error) {
				console.error('Error updating wifi:', wifiUpdateResponse.payload.error);
				toast.error(t('wifiUpdateError'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
			} else {
				toast.success(t('wifiUpdateSuccess'), {
					position: 'bottom-right',
					autoClose: 5000,
				});
				dispatch(fetchStores());
			}
		} catch (error) {
			console.error('Error dispatching updateWiFi:', error);
			toast.error(t('wifiUpdateError'), {
				position: 'bottom-right',
				autoClose: 5000,
			});
		}
	};

	const handleDownload = (storeName) => {
		const canvas = document.querySelector('#wifi-qrcode');
		const link = document.createElement('a');
		link.download = `wifi_${storeName}.png`;
		canvas.toBlob(function (blob) {
			link.href = URL.createObjectURL(blob);
			link.click();
		});
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
				<Typography variant="h5">{t('wifi')}</Typography>
				<div>
					<Button variant="contained" color="primary" size="small" onClick={handleSave}>
						{t('save')}
					</Button>
					<Button
						startIcon={<SaveAlt />}
						variant="outlined"
						color="primary"
						size="small"
						onClick={() => handleDownload(selectedStore.name)}
						style={{ marginLeft: '15px' }}>
						{t('download')}
					</Button>
				</div>
			</div>
			<div className="wifi-container">
				<div className="wifi-data">
					<FormControl fullWidth>
						<InputLabel>{t('encryptionType')}</InputLabel>
						<Select
							value={encryptionType}
							onChange={(e) => setEncryptionType(e.target.value)}
							label={t('encryptionType')}
							inputProps={{
								autoComplete: 'off',
							}}>
							<MenuItem value="WPA">{t('wpa')}</MenuItem>
							<MenuItem value="WEP">{t('wep')}</MenuItem>
							<MenuItem value="nopass">{t('noEncryption')}</MenuItem>
						</Select>
					</FormControl>
					<TextField
						label={t('ssid')}
						variant="outlined"
						fullWidth
						value={ssid}
						onChange={(e) => setSSID(e.target.value)}
					/>
					<TextField
						label={t('password')}
						type={showPassword ? 'text' : 'password'}
						fullWidth
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
				</div>
				<div className="wifi-qrcode">
					<QRCode id="wifi-qrcode" ecLevel="H" size={225} value={generateQRCodeData()} />
				</div>
			</div>
		</div>
	);
};
