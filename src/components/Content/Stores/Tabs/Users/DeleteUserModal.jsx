import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteUserModal = ({
	isDeleteOpen,
	setIsDeleteOpen,
	selectedUser,
	handleDeleteConfirm,
}) => {
	const { t } = useTranslation();

	return (
		<Modal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
			<div className="modal-container">
				<Typography variant="h6" gutterBottom>
					{t('deleteUserTitle')}
				</Typography>
				{selectedUser && (
					<div>
						<Typography variant="body1" gutterBottom>
							{t('deleteUserMsg')} {selectedUser.firstName} {selectedUser.lastName}?
						</Typography>
					</div>
				)}
				<div className="delete-buttons">
					<Button variant="contained" color="secondary" onClick={() => setIsDeleteOpen(false)}>
						{t('cancel')}
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleDeleteConfirm(selectedUser._id)}>
						{t('delete')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};
