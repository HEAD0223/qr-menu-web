import { Dashboard, RestaurantMenu, ShoppingCart, Store } from '@mui/icons-material';
import { Avatar, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './LeftBar.css';

export const LeftBar = ({ isLeftBarOpen }) => {
	const { t } = useTranslation();

	return (
		<Drawer variant="permanent" anchor="left">
			<div className="toolbar" />
			<Avatar alt="Square Logo" src={'https://source.unsplash.com/random'} className="avatar" />
			<List className="section-list">
				<ListItemButton component={Link} to="/dashboard">
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText primary={t('dashboard')} />
				</ListItemButton>
				<ListItemButton component={Link} to="/stores">
					<ListItemIcon>
						<Store />
					</ListItemIcon>
					<ListItemText primary={t('stores')} />
				</ListItemButton>
				<ListItemButton component={Link} to="/menu">
					<ListItemIcon>
						<RestaurantMenu />
					</ListItemIcon>
					<ListItemText primary={t('menu')} />
				</ListItemButton>
				<ListItemButton component={Link} to="/orders">
					<ListItemIcon>
						<ShoppingCart />
					</ListItemIcon>
					<ListItemText primary={t('orders')} />
				</ListItemButton>
			</List>
		</Drawer>
	);
};
