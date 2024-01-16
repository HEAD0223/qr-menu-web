import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EditUserModal = ({
	isEditOpen,
	setIsEditOpen,
	selectedUser,
	setSelectedUser,
	handleEditConfirm,
}) => {
	const { t } = useTranslation();

	return (
		<Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
			<div className="modal-container">
				<Typography variant="h6" gutterBottom>
					{t('editUserTitle')}
				</Typography>
				<TextField
					label={t('firstName')}
					variant="outlined"
					fullWidth
					value={selectedUser ? selectedUser.firstName : ''}
					onChange={(e) =>
						setSelectedUser({
							...selectedUser,
							firstName: e.target.value,
						})
					}
				/>
				<TextField
					label={t('lastName')}
					variant="outlined"
					fullWidth
					value={selectedUser ? selectedUser.lastName : ''}
					onChange={(e) =>
						setSelectedUser({
							...selectedUser,
							lastName: e.target.value,
						})
					}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel>{t('accessLevel')}</InputLabel>
					<Select
						value={selectedUser ? selectedUser.accessLevel : ''}
						onChange={(e) =>
							setSelectedUser({
								...selectedUser,
								accessLevel: e.target.value,
							})
						}
						label={t('accessLevel')}
						inputProps={{
							autoComplete: 'off',
						}}>
						<MenuItem value="admin">{t('admin')}</MenuItem>
						<MenuItem value="user">{t('user')}</MenuItem>
					</Select>
				</FormControl>
				<FormControlLabel
					control={
						<Checkbox
							checked={selectedUser ? selectedUser.isActivated : false}
							onChange={(e) =>
								setSelectedUser({
									...selectedUser,
									isActivated: e.target.checked,
								})
							}
						/>
					}
					label={t('isActivated')}
				/>
				<div className="edit-buttons">
					<Button variant="contained" color="secondary" onClick={() => setIsEditOpen(false)}>
						{t('cancel')}
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleEditConfirm(selectedUser)}>
						{t('update')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};
