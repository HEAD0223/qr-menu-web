import { Language } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import classNames from 'classnames';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageFlags.css';

export const LanguageFlags = () => {
	const languages = [
		{
			code: 'en',
			country_code: 'gb',
			name: 'English',
		},
		{
			code: 'ru',
			country_code: 'ru',
			name: 'Русский',
		},
		{
			code: 'fr',
			country_code: 'fr',
			name: 'Français',
		},
		{
			code: 'de',
			country_code: 'de',
			name: 'Deutsch',
		},
		{
			code: 'ro',
			country_code: 'ro',
			name: 'Romanian',
		},
	];

	const { t } = useTranslation();

	const currentLanguageCode = Cookies.get('i18next') || 'en';

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title={t('language')} arrow>
				<IconButton onClick={handleClick} color="inherit">
					<Language />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				disableScrollLock={true}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						bgcolor: '#F8F8F8',
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: '#F8F8F8',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}>
				{languages.map(({ code, name, country_code }) => (
					<Tooltip title={name} arrow placement="left" key={code}>
						<MenuItem
							key={code}
							style={{
								backgroundColor: currentLanguageCode === code ? '#D8D8D8' : '#F8F8F8',
							}}>
							<IconButton
								className={classNames('dropdown-item')}
								onClick={() => {
									i18next.changeLanguage(code);
								}}>
								<div
									className={`flag-icon flag-icon-${country_code}`}
									style={{
										opacity: currentLanguageCode === code ? 1 : 0.3,
										width: '3rem',
										height: '2rem',
									}}></div>
							</IconButton>
						</MenuItem>
					</Tooltip>
				))}
			</Menu>
		</div>
	);
};
