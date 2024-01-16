import { Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EditModal = ({
	isEditOpen,
	setIsEditOpen,
	tableObj,
	setTableObj,
	handleEditConfirm,
}) => {
	const { t } = useTranslation();

	return (
		<Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
			<div className="modal-container">
				<Typography variant="h6" gutterBottom>
					{t('editTableTitle')}
				</Typography>
				<TextField
					label={t('tableName')}
					variant="outlined"
					fullWidth
					value={tableObj ? tableObj.name : ''}
					onChange={(e) =>
						setTableObj({
							...tableObj,
							name: e.target.value,
						})
					}
				/>
				<div className="edit-buttons">
					<Button variant="contained" color="secondary" onClick={() => setIsEditOpen(false)}>
						{t('cancel')}
					</Button>
					<Button variant="contained" color="primary" onClick={handleEditConfirm}>
						{t('update')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};
