import { ChevronLeft, InfoOutlined, Menu } from '@mui/icons-material';
import { AppBar, Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../redux/slices/auth';
import './Header.css';
import { LanguageFlags } from './LanguageFlags';

export const Header = ({ sidebarWidth, isLeftBarOpen, toggleLeftBar }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const headerStyle = {
		width: isLeftBarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
		transition: 'width 0.3s ease-in-out',
	};

	const { isAuth } = useSelector((state) => state.auth);

	return (
		<AppBar position="fixed" className="app-bar" style={headerStyle}>
			<div className="header-content">
				<div className="header-logo">
					<IconButton color="inherit" onClick={toggleLeftBar} style={{ marginRight: '20px' }}>
						{isLeftBarOpen ? <ChevronLeft /> : <Menu />}
					</IconButton>
					<Link to="/dashboard" className="header-link">
						<img
							src={'https://source.unsplash.com/random'}
							alt="Your Logo"
							className="logo"
						/>
					</Link>
				</div>
				<div className="header-buttons">
					<Link to="/info" className="header-link">
						<Tooltip title={t('info')} arrow>
							<IconButton color="inherit">
								<InfoOutlined />
							</IconButton>
						</Tooltip>
					</Link>
					<LanguageFlags />
					{isAuth && (
						<Button
							variant="outlined"
							className="staff-button"
							onClick={() => dispatch(logoutUser())}>
							{t('logout')}
						</Button>
					)}
				</div>
			</div>
		</AppBar>
	);
};
